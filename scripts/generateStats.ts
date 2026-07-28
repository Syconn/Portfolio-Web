import fs from "node:fs/promises";
import os from "node:os";
import process from "node:process";
import path from "node:path";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import "dotenv/config";

const exec = promisify(execFile);

const username = "syconn";

const headers = {
    Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
};

type QuickStats = {
    public_repos: number;
    years_of_experience: string;
    total_languages: number;
    lines_of_code: number;
};

type GitUser = {
    public_repos: number;
    created_at: string;
};

type Repo = {
    name: string;
    clone_url: string;
    languages_url: string;
    fork: boolean;
};

async function getUser(): Promise<GitUser> {
    const raw = await fetch(
        `https://api.github.com/users/${username}`,
        { headers }
    ).then(r => r.json());

    return {
        public_repos: raw.public_repos,
        created_at: raw.created_at
    };
}

async function getRepos(): Promise<Repo[]> {
    const repos = await fetch(
        `https://api.github.com/users/${username}/repos?per_page=100`,
        { headers }
    ).then(r => r.json());

    const filtered = repos.filter((r: Repo) => !r.fork);

    await fs.mkdir("output", { recursive: true });

    await fs.writeFile(
        "output/repos.json",
        JSON.stringify(filtered, null, 2)
    );

    return filtered;
}

async function getLanguageStats(repos: Repo[]) {
    const totals: Record<string, number> = {};

    await Promise.all(
        repos.map(async repo => {
            const langs = await fetch(repo.languages_url, {
                headers
            }).then(r => r.json());

            for (const [lang, bytes] of Object.entries(langs)) {
                totals[lang] = (totals[lang] ?? 0) + (bytes as number);
            }
        })
    );

    return totals;
}

async function cloneRepos(repos: Repo[]) {
    const repoDir = path.join(os.tmpdir(), "github-stats");

    await fs.rm(repoDir, {
        recursive: true,
        force: true
    });

    await fs.mkdir(repoDir, {
        recursive: true
    });

    for (const repo of repos) {
        console.log(`Cloning ${repo.name}`);

        await exec("git", [
            "clone",
            "--depth",
            "1",
            repo.clone_url,
            path.join(repoDir, repo.name)
        ]);
    }
}

async function runCloc() {
    await exec("cloc", [
        "output/repos",
        "--json",
        "--report-file=output/cloc-output.json",
        "--exclude-dir=node_modules,.git,dist,build,target,out"
    ]);
}

async function getTotalLines() {
    const raw = await fs.readFile(
        "output/cloc-output.json",
        "utf8"
    );

    const json = JSON.parse(raw);

    return json.SUM?.code ?? 0;
}

async function generateStats(): Promise<QuickStats> {
    const user = await getUser();

    const repos = await getRepos();

    const langs = await getLanguageStats(repos);

    await cloneRepos(repos);

    await runCloc();

    const lines = await getTotalLines();

    return {
        public_repos: user.public_repos,

        years_of_experience:
            `${Math.floor(
                (Date.now() -
                    new Date(user.created_at).getTime()) /
                    (1000 * 60 * 60 * 24 * 365.25)
            )}+`,

        total_languages: Object.keys(langs).length,

        lines_of_code: lines
    };
}

const stats = await generateStats();

await fs.writeFile(
    "src/assets/github-stats.json",
    JSON.stringify(stats, null, 2)
);

console.log("Updated github-stats.json");
