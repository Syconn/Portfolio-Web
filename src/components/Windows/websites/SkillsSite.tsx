import { useState, type ReactNode } from "react";
import { BiLogoFlask } from "react-icons/bi";
import { DiDjango } from "react-icons/di";
import { FaExchangeAlt, FaGlobe } from "react-icons/fa";
import { FaApple, FaAws, FaCodeFork, FaCss3Alt, FaDatabase, FaDocker, FaGitAlt, FaGithub, FaGitlab, FaHtml5, FaJava, FaLinux, FaMicrosoft, FaNodeJs, FaPython, FaReact, FaUbuntu, FaWindows } from "react-icons/fa6";
import { GrOracle, GrReactjs } from "react-icons/gr";
import { PiWebhooksLogo } from "react-icons/pi";
import { SiApachemaven, SiAxios, SiC, SiCplusplus, SiCypress, SiDiscord, SiEslint, SiExpress, SiGithub, SiGithubactions, SiGoogle, SiGradle, SiJavascript, SiJest, SiJetbrains, SiJsonwebtokens, SiJunit5, SiLucide, SiMongodb, SiMysql, SiNumpy, SiOpenapiinitiative, SiPandas, SiPnpm, SiPostman, SiReactrouter, SiSharp, SiSqlite, SiSwagger, SiTestinglibrary, SiTypescript, SiVite, SiVitest, SiWebrtc, SiZod } from "react-icons/si";
import { TbBrandFramerMotion, TbBrandKotlin, TbBrandPowershell, TbBrandSocketIo } from "react-icons/tb";
import { VscIndexZero, VscTerminalBash, VscVscode } from "react-icons/vsc";
import "../../../css/sites/Skills.css";
import { buildUrlWithData, type PageProps, type webPage } from "../SafariWindow";
import type { Project } from "../../../util/types";
import projectJson from "../../../assets/projects.json"

export const SkillsPage: webPage = {
    icon: <FaCodeFork />,
    pageTitle: "My Skills",
    content: SkillsSite
}

// TODO ON CARD HOVER SHOW PROJECTS THAT USE THEM
type SkillLevel = "Expert" | "Advanced" | "Intermediate" | "Familiar";

export const categories: {
    title: string,
    skills: {
        icon: ReactNode,
        name: string
        confidence: SkillLevel
    }[]
}[] = [{
    title: "Languages",
    skills: [
        { icon: <SiTypescript />, name: "TypeScript", confidence: "Expert" },
        { icon: <SiJavascript />, name: "JavaScript", confidence: "Advanced" },
        { icon: <FaJava />, name: "Java", confidence: "Expert" },
        { icon: <SiSharp />, name: "C#", confidence: "Expert" },
        { icon: <SiC />, name: "C", confidence: "Advanced" },
        { icon: <SiCplusplus />, name: "C++", confidence: "Advanced" },
        { icon: <FaPython />, name: "Python", confidence: "Expert" },
        { icon: <FaHtml5 />, name: "HTML", confidence: "Advanced" },
        { icon: <FaCss3Alt />, name: "CSS", confidence: "Advanced" },
        { icon: <VscTerminalBash />, name: "Bash", confidence: "Intermediate" },
        { icon: <TbBrandPowershell />, name: "PowerShell", confidence: "Intermediate" },
        { icon: <TbBrandKotlin />, name: "Kotlin", confidence: "Advanced" }
    ]
}, {
    title: "Frameworks & Libraries",
    skills: [
        { icon: <FaReact />, name: "React", confidence: "Expert" },
        { icon: <FaNodeJs />, name: "Node.js", confidence: "Expert" },
        { icon: <SiExpress />, name: "Express.js", confidence: "Advanced" },
        { icon: <DiDjango />, name: "Django", confidence: "Intermediate" },
        { icon: <BiLogoFlask />, name: "Flask", confidence: "Intermediate" },
        { icon: <SiReactrouter />, name: "React Router", confidence: "Expert" },
        { icon: <TbBrandFramerMotion />, name: "Motion", confidence: "Expert" },
        { icon: <SiZod />, name: "Zod", confidence: "Expert" },
        { icon: <SiLucide />, name: "Lucide React", confidence: "Expert" },
        { icon: <GrReactjs />, name: "React Icons", confidence: "Expert" },
        { icon: <SiPandas />, name: "Pandas", confidence: "Advanced" },
        { icon: <SiNumpy />, name: "NumPy", confidence: "Advanced" },
    ]
}, {
    title: "Databases",
    skills: [
        { icon: <SiSqlite />, name: "SQLite", confidence: "Expert" },
        { icon: <SiMysql />, name: "MySQL", confidence: "Familiar" },
        { icon: <SiMongodb />, name: "MongoDB", confidence: "Familiar" },
        { icon: <FaDatabase />, name: "Dexie.js", confidence: "Expert" },
        { icon: <VscIndexZero />, name: "IndexedDB", confidence: "Expert" }
    ]
}, {
    title: "Tools",
    skills: [
        { icon: <FaGitAlt />, name: "Git", confidence: "Expert" },
        { icon: <FaGithub />, name: "GitHub", confidence: "Expert" },
        { icon: <SiJetbrains />, name: "JetBrains IDEs", confidence: "Expert" },
        { icon: <VscVscode />, name: "VS Code", confidence: "Expert" },
        { icon: <FaMicrosoft />, name: "Microsoft Office", confidence: "Expert" },
        { icon: <PiWebhooksLogo />, name: "Discord Webhooks", confidence: "Advanced" },
        { icon: <SiEslint />, name: "ESLint", confidence: "Advanced" }
    ]
}, {
    title: "Build Tools",
    skills: [
        { icon: <FaNodeJs />, name: "npm", confidence: "Expert" },
        { icon: <SiPnpm />, name: "pnpm", confidence: "Advanced" },
        { icon: <SiGradle />, name: "Gradle", confidence: "Advanced" },
        { icon: <SiApachemaven />, name: "Maven", confidence: "Intermediate" },
        { icon: <SiVite />, name: "Vite", confidence: "Advanced" }
    ]

}, {
    title: "APIs & Web",
    skills: [
        { icon: <FaGlobe />, name: "REST APIs", confidence: "Expert" },
        { icon: <SiJsonwebtokens />, name: "JSON", confidence: "Expert" },
        { icon: <SiOpenapiinitiative />, name: "OpenAPI", confidence: "Advanced" },
        { icon: <SiSwagger />, name: "Swagger", confidence: "Intermediate" },
        { icon: <SiPostman />, name: "Postman", confidence: "Intermediate" },
        { icon: <SiAxios />, name: "Axios", confidence: "Advanced" },
        { icon: <FaExchangeAlt />, name: "Fetch API", confidence: "Expert" },
        { icon: <TbBrandSocketIo />, name: "Socket.IO", confidence: "Advanced" },
        { icon: <SiWebrtc />, name: "WebSockets", confidence: "Intermediate" },
        { icon: <SiDiscord />, name: "Discord API", confidence: "Advanced" },
        { icon: <SiGithub />, name: "GitHub API", confidence: "Expert" },
        { icon: <SiGoogle />, name: "Google APIs", confidence: "Intermediate" }
    ]
}, {
    title: "Testing",
    skills: [
        { icon: <SiJunit5 />, name: "JUnit", confidence: "Advanced" },
        { icon: <SiVitest />, name: "Vitest", confidence: "Intermediate" },
        { icon: <SiJest />, name: "Jest", confidence: "Intermediate" },
        { icon: <SiTestinglibrary />, name: "React Testing Library", confidence: "Intermediate" },
        { icon: <SiCypress />, name: "Cypress", confidence: "Familiar" }
    ]
}, {
    title: "DevOps & Cloud",
    skills: [
        { icon: <FaDocker />, name: "Docker", confidence: "Advanced" },
        { icon: <FaGitlab />, name: "GitLab", confidence: "Expert" },
        { icon: <SiGithubactions />, name: "GitHub Actions", confidence: "Expert" },
        { icon: <FaAws />, name: "AWS", confidence: "Advanced" },
        { icon: <GrOracle />, name: "Oracle Cloud", confidence: "Advanced" },
    ]
}, {
    title: "OS",
    skills: [
        { icon: <FaWindows />, name: "Windows", confidence: "Expert" },
        { icon: <FaApple />, name: "MacOs", confidence: "Advanced" },
        { icon: <FaLinux />, name: "Linux", confidence: "Advanced" },
        { icon: <FaUbuntu />, name: "Ubuntu", confidence: "Expert" }
    ]
}];

export const iconColors: Record<string, string> = {
    // Languages
    TypeScript: "#3178C6",
    JavaScript: "#F7DF1E",
    Java: "#ED8B00",
    "C#": "#9B4F96",
    C: "#A8B9CC",
    "C++": "#00599C",
    Python: "#3776AB",
    HTML: "#E34F26",
    CSS: "#1572B6",
    Bash: "#4EAA25",
    PowerShell: "#5391FE",
    Kotlin: "#7F52FF",

    // Frameworks
    React: "#61DAFB",
    "Node.js": "#5FA04E",
    "Express.js": "#444444",
    Django: "#092E20",
    Flask: "#000000",
    "React Router": "#CA4245",
    Motion: "#FF4D9D",
    Zod: "#3068B7",
    "Lucide React": "#F59E0B",
    "React Icons": "#E91E63",

    // Databases
    SQLite: "#003B57",
    MySQL: "#4479A1",
    MongoDB: "#47A248",
    "Dexie.js": "#FF9800",
    IndexedDB: "#0078D4",

    // Tools
    Git: "#F05032",
    GitHub: "#8B949E",
    "JetBrains IDEs": "#FC801D",
    "VS Code": "#007ACC",
    "Microsoft Office": "#D83B01",
    "Discord Webhooks": "#5865F2",
    Pandas: "#150458",
    NumPy: "#013243",
    ESLint: "#5a3ee6",

    // Build Tools
    npm: "#CB3837",
    pnpm: "#F69220",
    Gradle: "#02303A",
    Maven: "#C71A36",
    Vite: "#646CFF",

    // APIs & Web
    "REST APIs": "#0EA5E9",
    JSON: "#F7DF1E",
    OpenAPI: "#6BA539",
    Swagger: "#85EA2D",
    Postman: "#FF6C37",
    Axios: "#5A29E4",
    "Fetch API": "#0EA5E9",
    "Socket.IO": "#010101",
    WebSockets: "#4CAF50",
    "Discord API": "#5865F2",
    "GitHub API": "#8B949E",
    "Google APIs": "#4285F4",

    // Testing
    JUnit: "#25A162",
    Vitest: "#6E9F18",
    Jest: "#C21325",
    "React Testing Library": "#E33332",
    Cypress: "#637995",

    // DevOps
    Docker: "#2496ED",
    GitLab: "#FC6D26",
    "GitHub Actions": "#2088FF",
    AWS: "#FF9900",
    "Oracle Cloud": "#F80000",

    // Operating Systems
    Windows: "#0078D4",
    MacOs: "#A2AAAD",
    Linux: "#FCC624",
    Ubuntu: "#E95420"
};

function SkillsSite({ page, openTab }: PageProps) {
    const [projects] = useState<Project[]>(projectJson)
    const [flipped, setFlipped] = useState<string | null>(null);

    const relatedProjects = (skill: { name: string }) => projects.filter(project => project.skills.includes(skill.name));

    return (
        <div className="skills-page">
            <div className="skills-header">
                <h1>Skills</h1>

                <p>Languages, frameworks, tools and Api's I use to build software for my personal, academic and professional projects.</p>
            </div>

            {categories.map(category => (
                <section key={category.title} className="skill-section">
                    <h2>{category.title}</h2>

                    <div className="skill-grid">
                        {category.skills.map(skill => (
                            <div className={`skill-card ${flipped === skill.name ? "flipped" : ""}`} onClick={() => setFlipped(flipped === skill.name ? null : skill.name)}>
                                <div className="skill-card-inner">
                                    <div className="skill-front">
                                        <div className="skill-icon" style={{ color: iconColors[skill.name] ?? "var(--accent)" }}>{skill.icon}</div>

                                        <div className="skill-info">
                                            <span className="skill-name">{skill.name}</span>

                                            <div className={`skill-level ${skill.confidence.toLowerCase()}`}>{skill.confidence}</div>
                                        </div>
                                    </div>


                                    <div className="skill-back">
                                        <h3>Used In</h3>

                                        {relatedProjects(skill).length > 0 ? (
                                            relatedProjects(skill).map(project => (
                                                <button key={project.title}
                                                    onClick={(e) => { e.stopPropagation(); openTab(buildUrlWithData("projectView", { projectId: projects.indexOf(project), returnId: page.id })); }}>
                                                    {project.title}
                                                </button>
                                            ))
                                        ) : <p>No featured projects yet.</p>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section >
            ))}
        </div >
    )
}

export default SkillsSite