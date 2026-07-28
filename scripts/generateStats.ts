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

type QuickStats = {
    public_repos: number;
    years_of_experience: string;
    total_languages: number;
    lines_of_code: string;
    top_languages: {
        name: string;
        lines: number;
        percent: number;
    }[];
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
    const TOP_LANGUAGE_COUNT = 10;

    const totalLines = cloc.SUM.code;
    const topLanguages = Object.entries(cloc)
        .filter(([name]) => name !== "header" && name !== "SUM" && !excluded.has(name))
        .map(([name, value]) => ({ name, lines: value.code, percent: Number(((value.code / totalLines) * 100).toFixed(2))}))
        .sort((a, b) => b.lines - a.lines)
        .slice(0, TOP_LANGUAGE_COUNT);
    return {
        totalLines,
        topLanguages
    };
}

async function generateStats(): Promise<QuickStats> {
    const user = await getUserData();
    const langs = await getLanguageStats();

    const { totalLines, topLanguages } = await pullStatsRepo();

    return {
        public_repos: user.public_repos,
        years_of_experience: `${Math.floor((Date.now() - new Date(user.created_at).getTime()) / (1000 * 60 * 60 * 24 * 365.25))}+`,
        total_languages: Object.keys(langs).length,
        lines_of_code: `${Math.floor(totalLines)}+`,
        top_languages: topLanguages
    };
}

const stats = await generateStats();
await fs.writeFile(
    "src/assets/github-stats.json",
    JSON.stringify(stats, null, 2)
);

console.log("Updated github-stats.json");
