import fs from "node:fs/promises";

type project = {
    title: string,
    readme?: string,
    demoLink?: string,
    imgs: string[],
    subline: string,
    repo: string,
    startDate: Date,
    lastUpdated: Date,
    skills: string[]
}

function writeJson(): project[] {
    return [
        {
            title: "Drafter Website Builder",
            readme: "https://raw.githubusercontent.com/Syconn/Drafter-Website-Builder/refs/heads/main/README.md",
            demoLink: "https://syconn.github.io/Drafter-Website-Builder/",
            subline: "A website building tool that allows students to build python based drafter websites",
            imgs: ["src/assets/screenshots/drafter/drafter_home.png"],
            repo: "https://github.com/Syconn/Drafter-Website-Builder",
            startDate: new Date("April 7 2026"),
            lastUpdated: new Date("May 29 2026"),
            skills: [
                "TypeScript",
                "JavaScript",
                "CSS",
                "HTML",
                "React",
                "React Router",
                "Zod",
                "Dexie.js",
                "ESLint",
                "Vite",
                "npm",
                "JSON",
                "Jest",
                "Cypress",
                "Github Actions"
            ]
        }
    ]
}

await fs.writeFile(
    "src/assets/projects.json",
    JSON.stringify(writeJson(), null, 4)
);

console.log("Updated projects.json");