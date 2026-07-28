import { FaDiscord, FaFileDownload, FaGithub, FaLinkedin, FaRegUserCircle } from 'react-icons/fa';
import { SiCodeberg } from 'react-icons/si';
import quickstats from "../../../assets/github-stats.json";
import me from "../../../assets/me.png";
import resume from "../../../assets/resume.pdf"
import { useEffect, useState } from 'react';
import type { QuickStats } from '../../../util/types';
import { links } from '../../../util/data';
import "../../../css/sites/AboutSite.css"
import type { PageProps, webPage } from '../SafariWindow';

export const AboutPage: webPage = {
    icon: <FaRegUserCircle />,
    pageTitle: "About Me",
    content: Overview
}

export function Overview({ page, modifyPage, openTab }: PageProps) {
    const [discordCopied, setDiscordCopied] = useState(false)
    const [gitStats] = useState<QuickStats>(quickstats)

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

    // TODO: ADD A RANDOM PROJECT TO SHOW OFF, Lines of Code instead of completed projects
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
                
                {/* Recent Commits and Projects */}
                <div className="stat-card">
                    <h2>{gitStats.public_repos}</h2>
                    <span>Public Git Repositories</span>
                </div>

                {/* Language Icon Popup */}
                <div className="stat-card">
                    <h2>{gitStats.total_languages}</h2>
                    <span>Used Programming Languages</span>
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

        </div>
    )
} 