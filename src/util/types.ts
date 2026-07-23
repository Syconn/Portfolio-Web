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
    public_repos: number, // Total Projects
    completed_projects: string,
    years_of_experience: string,
    total_languages: number;
}

export type gitUserData = {
    public_repos: number,
    created_at: string;
}