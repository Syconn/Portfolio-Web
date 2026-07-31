import fs from "node:fs/promises";

type project = {
    title: string,
    readme?: string,
    demoLink?: string,
    imgs: string[],
    subline: string,
    repo: string,
    commitHistory: {
        name: string,
        date: string,
        color?: string
    }[]
    skills: string[]
}

function writeJson(): project[] {
    return [
        {
            title: "Drafter Website Builder",
            readme: "https://raw.githubusercontent.com/Syconn/Drafter-Website-Builder/refs/heads/main/README.md",
            demoLink: "https://syconn.github.io/Drafter-Website-Builder/",
            subline: "A website building tool that allows students to build python based drafter websites",
            imgs: [
                "screenshots/drafter/drafter_home.png", 
                "screenshots/drafter/docx_export.png", 
                "screenshots/drafter/hover_view.png",
                "screenshots/drafter/json_export.png",
                "screenshots/drafter/page_exporter.png",
                "screenshots/drafter/project_view.png",
                "screenshots/drafter/python_export.png",
                "screenshots/drafter/webstate_designer.png"
            ],
            repo: "https://github.com/Syconn/Drafter-Website-Builder",
            commitHistory: [{
                name: "Created Project",
                date: "April 7 2026"
            }, {
                name: "Project Completed",
                date: "May 29 2026",
                color: "#34c759"
            }, {
                name: "Forked Repo to Upgrade Deploy Script",
                date: "July 21 2026",
                color: "#c7c234"
            }],
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
                "GitHub Actions"
            ]
        }
    ]
}

await fs.writeFile(
    "src/assets/projects.json",
    JSON.stringify(writeJson(), null, 4)
);

console.log("Updated projects.json");