export type project = {
    desc: string | null, // Null will pull from github
    img: string[] | null,
    subline: string,
    title: string,
    repo: string,
    tags: string[],
    categories: string[],
}

export type quickStats = {
    public_repos: number,
    years_of_experience: string,
    total_languages: number;
}

export type gitUserData = {
    public_repos: number,
    created_at: string;
}

export type MacSettings = {
    timezone: string,
    darkMode: boolean,
    openInWebApp: boolean
}

export type windowData = {
    filePath?: string,
    settings?: MacSettings
    changeSetting?: <K extends keyof MacSettings>(setting: K, value: MacSettings[K]) => void
}