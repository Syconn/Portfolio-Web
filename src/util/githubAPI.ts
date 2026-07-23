import type { gitUserData, quickStats } from "./types";

const fakeUser: gitUserData = { public_repos: 53, created_at: '2019-04-09T23:40:16Z' }
const fakeLang = {
  Java: 4306959,
  Python: 41212,
  C: 95680,
  GLSL: 1594,
  'C++': 313336,
  CMake: 1564,
  mcfunction: 147445,
  Mathematica: 1137882,
  'C#': 21983480,
  Lua: 11255,
  Kotlin: 4578,
  Shell: 8185,
  Makefile: 571,
  TypeScript: 581059,
  CSS: 115729,
  JavaScript: 25549,
  HTML: 7740,
  Batchfile: 374,
  MoonScript: 91,
  'Objective-C++': 13913,
  GAP: 9254,
  ShaderLab: 7667,
  HLSL: 7157
}

// TODO THIS SHOULD PREVENT OVER USAGE DURING DEV
// async function getUserData(): Promise<gitUserData> { 
//     const raw = await fetch(`https://api.github.com/users/${username}`).then(r => r.json());
//     return {
//         public_repos: raw.public_repos,
//         created_at: raw.created_at,
//     };
// }

// async function getLanguageStats() {
//     const raw = await fetch(`https://api.github.com/users/${username}/repos?per_page=100`).then(r => r.json());
//     const totals: Record<string, number> = {};

//     await Promise.all(
//         raw.map(async (repo: any) => {
//             const langs = await fetch(repo.languages_url).then(r => r.json());
//             for (const [language, bytes] of Object.entries(langs)) totals[language] = (totals[language] ?? 0) + (bytes as number);
//         })
//     );

//     return totals;
// }

export async function generateStats(): Promise<quickStats> {
    const user: gitUserData = fakeUser;
    const langs = fakeLang;

    return {
        public_repos: user.public_repos,
        completed_projects: `${user.public_repos}+`, // TODO Project Count
        years_of_experience: `${Math.floor((Date.now() - new Date(user.created_at).getTime()) / (1000 * 60 * 60 * 24 * 365.25))}+`,
        total_languages:  Object.keys(langs).length
    }
}

console.log(generateStats())