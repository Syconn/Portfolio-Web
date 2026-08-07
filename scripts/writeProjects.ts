import fs from "node:fs/promises";

type project = {
    title: string,
    readme?: string,
    demoLink?: string,
    imgs: string[],
    subline: string,
    keyFacts: string,
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
            subline: "A website building tool that allows students to build python based drafter websites. Shows off my ability to make user-friendly, interactive functional UI's while working a group project.",
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
            keyFacts: `
- Built a browser-based IDE that allows users to visually design, generate, and export Python applications for the Drafter educational framework through an interactive graph-based interface.
- Engineered features including visual page routing, state management, live code generation, project import/export through Dexie.js, and data persistence using React, TypeScript, and React Flow.
- Collaborated in a 3-member Scrum team over 3 Agile sprints, using GitHub for version control, participating in sprint planning and code reviews, and integrating feedback to deliver project milestones on schedule.
- Presented project demonstrations to an audience of 30+ classmates and instructors every two weeks, effectively communicating technical progress, design decisions, sprint outcomes, and incorporating stakeholder feedback.
            `,
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
        }, {
            title: "Portfolio Website",
            repo: "https://github.com/Syconn/Portfolio-Web",
            readme: "https://raw.githubusercontent.com/Syconn/Portfolio-Web/refs/heads/main/README.md",
            demoLink: "https://aidanhaack.me/",
            imgs: [
                "screenshots/portfolio/Aboutme.png",
                "screenshots/portfolio/background1.png",
                "screenshots/portfolio/contactme.png",
                "screenshots/portfolio/project_selection.png",
                "screenshots/portfolio/projectview_1.png",
                "screenshots/portfolio/projectview_2.png",
                "screenshots/portfolio/settings.png",
                "screenshots/portfolio/skills.png"
            ],
            keyFacts: `
- Developed a desktop-inspired portfolio website using React, TypeScript, and Vite that replaces traditional scrolling pages with an interactive macOS-style interface for showcasing projects, experience, and technical skills.
- Independently designed and developed the application, implementing the custom window manager, desktop environment, browser interface, and reusable React components while maintaining a scalable, type-safe codebase.
- Created a highly interactive, data-driven portfolio featuring draggable and resizable windows, configurable desktop settings, and automated content generation to simplify future updates and improve maintainability.
- Designed the portfolio to effectively communicate technical projects and experience to recruiters, professors, and collaborators by presenting complex work through an intuitive, application-like user interface.
            `,
            subline: "Portfolio Website is a polished, desktop-inspired portfolio website built with React, TypeScript, and Vite. It presents my work, experience, and technical interests through an interactive macOS-style interface with draggable windows, a dock, browser-style content pages, and configurable desktop settings.",
            commitHistory: [{
                name: "Initial Commit",
                date: "July 21 2026"
            },{
                name: "MacOs Feel",
                date: "July 23 2026",
            },{
                name: "Website User Ready",
                date: "July 31 2026",
                color: "#34c759"
            },{
                name: "Added two Projects",
                date: "Aug 5 2026",
                color: "#c7c234"
            }],
            skills: [
                "Typescript",
                "Javascript",
                "HTML",
                "CSS",
                "React",
                "Node.js",
                "React Icons",
                "IndexedDB",
                "Git",
                "GitHub",
                "VS Code",
                "ESLint",
                "npm",
                "vite",
                "JSON",
                "GitHub API",
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