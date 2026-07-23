import fs from "node:fs/promises";
import "dotenv/config";

const username: string = "syconn"

const headers = {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`
};

type quickStats = {
    public_repos: number,
    years_of_experience: string,
    total_languages: number;
}

type gitUserData = {
    public_repos: number,
    created_at: string;
}

async function getUserData(): Promise<gitUserData> { 
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

async function generateStats(): Promise<quickStats> {
    const user: gitUserData = await getUserData();
    const langs = await getLanguageStats();

    return {
        public_repos: user.public_repos,
        years_of_experience: `${Math.floor((Date.now() - new Date(user.created_at).getTime()) / (1000 * 60 * 60 * 24 * 365.25))}+`,
        total_languages:  Object.keys(langs).length
    }
}

const stats = await generateStats();
await fs.writeFile(
    "src/assets/github-stats.json",
    JSON.stringify(stats, null, 2)
);

console.log("Updated github-stats.json");