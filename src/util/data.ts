import type { MacSettings } from "./types"

export const pages: string[] = ["Overview", "Project Showcase", "Skills and Talents", "Work Experience", "Homelab Stats", "Contact Me"]

export const defaultSettings: MacSettings = { timezone: Intl.DateTimeFormat().resolvedOptions().timeZone, darkMode: false, openInWebApp: true, wallpaper: 0 }

export const links = {
    github: "https://github.com/Syconn",
    codeberg: "https://codeberg.org/Syconn",
    linkedin: "https://www.linkedin.com/in/aidan-haack/",
    email: "Aidanh@udel.edu",
    discord: "syconn"
}

export const projectCategory = {
    mod: "Minecraft Modding",
    webdev: "Web Development",
    game: "Game Development",
    tool: "Tools",
    product: "Applications"
}

export const projectData = {
    java: "Java",
    python: "Python",
    typescript: "TypeScript",
    C: "C",
    Cpp: "C++",
    css: "CSS",
    html: "HTML"
}