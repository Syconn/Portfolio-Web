import fs from "node:fs/promises";
import "dotenv/config";
import process from "node:process";

const username: string = "syconn"

const headers = {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
};

const excluded = new Set([
    "Unity-Prefab",
    "C# Generated",
    "INI",
    "MSBuild script",
    "XML",
    "JSON",
    "YAML",
    "Markdown"
]);

type ContributionDay = {
    date: string;
    count: number;
    level: 0 | 1 | 2 | 3 | 4;
};

type RecentRepository = {
    name: string;
    commits: number;
};

type QuickStats = {
    public_repos: number;
    years_of_experience: string;
    languages: string[];
    total_languages: number;
    lines_of_code: string;

    top_languages: {
        name: string;
        lines: number;
        percent: number;
    }[];

    contributions: ContributionDay[];
    total_contributions: number;
    recent_repositories: RecentRepository[];
};

type GitUserData = {
    public_repos: number;
    created_at: string;
};

type ClocLanguage = {
    code: number;
};

type ClocOutput = {
    SUM: {
        code: number;
    };
} & Record<string, ClocLanguage>;

type GitRepo = {
    name: string;
    updated_at: string;
    url: string;
};

type ContributionLevel = "NONE" | "FIRST_QUARTILE" | "SECOND_QUARTILE" | "THIRD_QUARTILE" | "FOURTH_QUARTILE";

async function getUserData(): Promise<GitUserData> {
    const raw = await fetch(`https://api.github.com/users/${username}`, { headers }).then(r => r.json());
    return {
        public_repos: raw.public_repos,
        created_at: raw.created_at,
    };
}

async function getLanguageStats() {
    const raw = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, { headers }).then(r => r.json());
    const totals: Record<string, number> = {};

    await Promise.all(
        raw.map(async (repo: any) => {
            const langs = await fetch(repo.languages_url, { headers }).then(r => r.json());
            for (const [language, bytes] of Object.entries(langs)) totals[language] = (totals[language] ?? 0) + (bytes as number);
        })
    );

    return totals;
}

async function pullStatsRepo() {
    const cloc: ClocOutput = await fetch("https://raw.githubusercontent.com/Syconn/StatsRepo/refs/heads/main/output/cloc-output.json").then(r => r.json());
    const count = 10;

    const totalLines = cloc.SUM.code;
    const topLanguages = Object.entries(cloc)
        .filter(([name]) => name !== "header" && name !== "SUM" && !excluded.has(name))
        .map(([name, value]) => ({ name, lines: value.code, percent: Number(((value.code / totalLines) * 100).toFixed(2)) }))
        .sort((a, b) => b.lines - a.lines)
        .slice(0, count);
    return {
        totalLines,
        topLanguages
    };
}

async function getContributionStats() {
    const query = `
    query {
      user(login: "${username}") {
        contributionsCollection {
          contributionCalendar {
            totalContributions

            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
            }
          }
        }
      }
    }`;

    const response = await fetch("https://api.github.com/graphql", { method: "POST", headers: { ...headers, "Content-Type": "application/json" }, body: JSON.stringify({ query }) }).then(r => r.json());
    const calendar = response.data.user.contributionsCollection.contributionCalendar;

    const contributions = calendar.weeks
        .flatMap((week: any) => week.contributionDays)
        .map((day: {
            date: string;
            contributionCount: number;
            contributionLevel: ContributionLevel;
        }) => ({
            date: day.date,
            count: day.contributionCount,
            level: ({
                NONE: 0,
                FIRST_QUARTILE: 1,
                SECOND_QUARTILE: 2,
                THIRD_QUARTILE: 3,
                FOURTH_QUARTILE: 4
            } as const)[day.contributionLevel]
        }));

    return {
        total: calendar.totalContributions,
        contributions
    };
}

async function getRecentRepositories() {
    const repos: GitRepo[] = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`, { headers }).then(r => r.json());
    const recents = 5;
    const recentRepos = repos.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()).slice(0, recents);

    return await Promise.all(
        recentRepos.map(async repo => {
            const commits = await fetch(`${repo.url}/commits?per_page=100`, { headers }).then(r => r.json());
            return {
                name: repo.name,
                commits: commits.length
            };
        })
    );
}

async function generateStats(): Promise<QuickStats> {
    const [user, langs, repoStats, contributionStats, recentRepos] = await Promise.all([
        getUserData(),
        getLanguageStats(),
        pullStatsRepo(),
        getContributionStats(),
        getRecentRepositories()
    ]);

    return {
        public_repos: user.public_repos,
        years_of_experience: `${Math.floor((Date.now() - new Date(user.created_at).getTime()) / (1000 * 60 * 60 * 24 * 365.25))}+`,
        languages: Object.keys(langs),
        total_languages: Object.keys(langs).length,
        lines_of_code: `${Math.floor(repoStats.totalLines)}+`,
        top_languages: repoStats.topLanguages,
        total_contributions: contributionStats.total,
        contributions: contributionStats.contributions,
        recent_repositories: recentRepos
    };
}

const stats = await generateStats();
await fs.writeFile(
    "src/assets/github-stats.json",
    JSON.stringify(stats, null, 4)
);

console.log("Updated github-stats.json");
