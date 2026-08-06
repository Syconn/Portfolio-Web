import { useEffect, useState } from 'react';
import { FaCss3Alt, FaDiscord, FaFileDownload, FaGithub, FaJava, FaLinkedin, FaRegUserCircle, FaTrophy } from 'react-icons/fa';
import { MdAutoGraph, MdOutlineMailOutline, MdSchool } from 'react-icons/md';
import { SiC, SiCodeberg, SiCplusplus, SiHtml5, SiJavascript, SiKotlin, SiPython, SiTypescript } from 'react-icons/si';
import quickstats from "../../../assets/github-stats.json";
import me from "../../../assets/me.png";
import resume from "../../../assets/resume.pdf";
import "../../../css/sites/AboutSite.css";
import { links } from '../../../util/data';
import type { QuickStats } from '../../../util/types';
import type { PageProps, webPage } from '../SafariWindow';

export const AboutPage: webPage = {
    icon: <FaRegUserCircle />,
    pageTitle: "About Me",
    content: Overview
}

function Overview({ openTab, openExternalWindow }: PageProps) {
    const [discordCopied, setDiscordCopied] = useState(false)
    const [gitStats] = useState<QuickStats>(quickstats)

    const latestCommitData = [...gitStats.contributions].findLast(day => day.count > 0)?.date;

    const copyDiscord = async () => {
        await navigator.clipboard.writeText(links.discord)
        setDiscordCopied(true)
    }

    const downloadResume = async () => {
        const link = document.createElement("a");
        link.href = resume;
        link.download = "Aidans_Resume.pdf";
        link.click();
    }

    useEffect(() => {
        if (!discordCopied) return
        const timer = window.setTimeout(() => { setDiscordCopied(false) }, 1800)
        return () => window.clearTimeout(timer)
    }, [discordCopied])

    const formatLines = (value: string) => {
        const number = parseInt(value.replace(/\D/g, ""));
        if (number >= 1_000_000) return `${(number / 1_000_000).toFixed(1).replace(".0", "")}M+`;
        return value;
    };

    return (
        <div className="overview-page">
            <section className="hero">
                <img className="hero-avatar" src={me} alt="Aidan Haack" />

                <div className="hero-info">
                    <h1>Aidan Haack</h1>

                    <span className="hero-subtitle">
                        Computer Science & Cybersecurity Student
                    </span>

                    <p>
                        I'm a Computer Science and Cybersecurity student at the
                        University of Delaware who enjoys building software,
                        learning new technologies, participating in Hackathons,
                        and exploring cybersecurity.
                    </p>

                    <div className="hero-buttons">

                        <button className="primary-button" onClick={downloadResume}>
                            <FaFileDownload />
                            Resume
                        </button>

                        <button className="social-button" onClick={() => openTab(links.github)}>
                            <FaGithub />
                        </button>

                        <button className="social-button" onClick={() => openTab(links.linkedin)}>
                            <FaLinkedin />
                        </button>

                        <button className="social-button" onClick={() => openTab(links.codeberg)}>
                            <SiCodeberg />
                        </button>

                        <button className="social-button" onClick={copyDiscord}>
                            <FaDiscord />
                        </button>

                        <button className="social-button" onClick={() => openExternalWindow("contact")}>
                            <MdOutlineMailOutline />
                        </button>
                    </div>

                    {discordCopied && <span className="copied">Discord copied to clipboard.</span>}
                </div>

            </section>

            <section className="stats-grid">

                <div className="stat-card">
                    <h2>{gitStats.years_of_experience}</h2>
                    <span>Years Programming</span>
                </div>

                <div className="stat-card lines-card">
                    <h2>{formatLines(gitStats.lines_of_code)}</h2>
                    <span>Lines of Code</span>

                    <div className="language-popup">
                        <div className="language-popup-header">Top Languages</div>

                        {gitStats.top_languages.slice(0, 6).map(lang => (
                            <div key={lang.name} className="language-row">
                                <span className="language-name">{lang.name}</span>

                                <div className="language-bar">
                                    <div className="language-fill" style={{ width: `${lang.percent}%` }} />
                                </div>

                                <span className="language-percent">{lang.percent.toFixed(1)}%</span>
                            </div>
                        ))}

                        <div className="language-total">
                            1,495,421 Total Lines
                        </div>
                    </div>
                </div>

                <div className="stat-card repo-card">
                    <h2>{gitStats.public_repos}</h2>
                    <span>Public Git Repositories</span>

                    <div className="repo-popup">
                        <h3>{gitStats.total_contributions} Contributions</h3>
                        <div className="contribution-grid">{gitStats.contributions.map((level, i) => <div key={i} className={`contribution-cell level-${level.level}`} />)}</div>

                        <div className="repo-divider" />

                        <h4>Recent Activity</h4>
                        {gitStats.recent_repositories.map(repo => (
                            <div className="repo-row" key={repo.name}>
                                <span>{repo.name}</span>
                                <span>{repo.commits} commits</span>
                            </div>

                        ))}

                        <div className="repo-footer">
                            Latest Commit • {latestCommitData ? new Date(`${latestCommitData}T12:00:00`).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric"
                            }) : "No commits"}
                        </div>
                    </div>
                </div>

                <div className="stat-card language-card">
                    <h2>{gitStats.total_languages}</h2>
                    <span>Used Programming Languages</span>

                    <div className="language-popup">
                        <h3>Languages</h3>

                        <div className="language-grid">
                            {gitStats.languages.filter(v => languageIcons[v]?.color).map(language => {
                                const lang = languageIcons[language];
                                
                                return (
                                    <div className="language-icon" key={language}>
                                        <div className="language-logo" style={{ color: lang?.color }}>{lang?.icon ?? language[0]}</div>
                                        <span>{language}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

            </section>

            <section className="about-card">
                <h2>About Me</h2>
                <p>
                    I enjoy building polished desktop applications, websites, Minecraft mods, and experimenting with cybersecurity and
                    software engineering. In my free time I play game, and love to learn new techniques and frameworks.
                    I enjoy designing software that feels reliable, intuitive, performant, and visually polished.
                </p>
            </section>

            <section className="awards-card">
                <div className="awards-header">
                    <h2>Awards &amp; Accomplishments</h2>
                    <p>Selected highlights from my work in software development, cybersecurity, and technical experimentation.</p>
                </div>

                <div className="awards-list">
                    <article className="award-item">
                        <div className="award-badge"><FaTrophy /></div>
                        <div>
                            <h3>UD Presidential Scholarship</h3>
                            <p>Awarded for academic excellence and distinction as part of the University of Delaware community.</p>
                        </div>
                    </article>

                    <article className="award-item">
                        <div className="award-badge"><MdSchool /></div>
                        <div>
                            <h3>Dean’s List (2024–2026)</h3>
                            <p>Recognized for sustained academic achievement across multiple semesters.</p>
                        </div>
                    </article>

                    <article className="award-item">
                        <div className="award-badge"><MdAutoGraph /></div>
                        <div>
                            <h3>UD DataQuest Winner in Best Insight and Model</h3>
                            <p>Received recognition for delivering a standout insight and model in the UD DataQuest competition.</p>
                        </div>
                    </article>
                </div>
            </section>

        </div>
    )
}

const languageIcons: Record<string, { icon: React.ReactNode; color: string }> = {
    Java: {
        icon: <FaJava />,
        color: "#f89820"
    },
    TypeScript: {
        icon: <SiTypescript />,
        color: "#3178c6"
    },
    JavaScript: {
        icon: <SiJavascript />,
        color: "#f7df1e"
    },
    CSS: {
        icon: <FaCss3Alt />,
        color: "#1572b6"
    },
    HTML: {
        icon: <SiHtml5 />,
        color: "#e34f26"
    },
    "C++": {
        icon: <SiCplusplus />,
        color: "#00599c"
    },
    C: {
        icon: <SiC />,
        color: "#004594"
    },
    Python: {
        icon: <SiPython />,
        color: "#3776ab"
    },
    Kotlin: {
        icon: <SiKotlin />,
        color: "#7f52ff"
    }
};