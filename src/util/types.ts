export type Project = {
    title: string,
    readme?: string,
    demoLink?: string,
    imgs: string[],
    subline: string,
    repo: string,
    startDate: string,
    lastUpdated: string,
    skills: string[]
}

export type QuickStats = {
    public_repos: number;
    years_of_experience: string;
    languages: string[];
    total_languages: number;
    lines_of_code: string;
    top_languages: {
        name: string;
        lines: number;
        percent: number;
    }[];
    contributions: {
        date: string;
        count: number;
        level: number;
    }[];
    total_contributions: number;
    recent_repositories: {
        name: string;
        commits: number;
    }[];
};

export type GitUserData = {
    public_repos: number,
    created_at: string;
}

export type MacSettings = {
    timezone: string,
    darkMode: boolean,
    openInWebApp: boolean,
    wallpaper: number
}

export type WindowData = {
    filePath?: string,
    settings?: MacSettings
    changeSetting?: <K extends keyof MacSettings>(setting: K, value: MacSettings[K]) => void,
    urls?: string[]
}