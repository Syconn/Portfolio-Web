export type project = {
    desc: string | null, // Null will pull from github
    img: string[] | null,
    subline: string,
    title: string,
    repo: string,
    tags: string[],
    categories: string[],
}