import fs from "node:fs/promises";

type project = {
    title: string,
    readme: string,
    demoLink: string,
    img: string[],
    subline: string,
    repo: string,
    tags: string[],
    startDate: Date,
    lastUpdated: Date,
    categories: string[],
}

function writeJson(): project[] {
    return [
        {
            title: "Drafter Website Builder",
            readme: "https://raw.githubusercontent.com/Syconn/Drafter-Website-Builder/refs/heads/main/README.md",
            demoLink: "https://syconn.github.io/Drafter-Website-Builder/",
            subline: "A website building tool that allows students to build python based drafter websites",
            img: [],
            repo: "https://github.com/Syconn/Drafter-Website-Builder",
            tags: [],
            startDate: new Date("April 7 2026"),
            lastUpdated: new Date("May 29 2026"),
            categories: []
        }
    ]
}

await fs.writeFile(
    "src/assets/projects.json",
    JSON.stringify(stats, null, 2)
);

console.log("Updated github-stats.json");