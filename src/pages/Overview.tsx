import { FaDiscord, FaFileDownload, FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiCodeberg } from 'react-icons/si';
import quickstats from "../assets/github-stats.json";
import me from "../assets/me.png";
import resume from "../assets/resume.pdf"
import styles from '../App.module.css';
import { useEffect, useState } from 'react';
import type { quickStats } from '../util/types';
import { links } from '../util/data';

export function Overview({ length }: { length:number }) {
    const [discordCopied, setDiscordCopied] = useState(false)
    const [gitStats] = useState<quickStats>(quickstats as quickStats)

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
    
    return (
        <section className={styles.legacyContent}>
            {/* Title */}
            <h2>Aidan Haack</h2>

            {/* Image */}
            <img src={me} alt="Me" />

            {/* TODO: Cycling Skills */}

            {/* Description */}
            <p>
                Computer Science and Cybersecurity student at the University of Delaware passionate about software development, cybersecurity, and building innovative projects. I enjoy
                learning new technologies and competing in Hackathons and Dataquests.
            </p>

            {/* Contacts */}
            <div className={styles.contactLinks}>
                <a className={styles.contactLink} href={links.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer">
                    <FaLinkedin size={28} />
                </a>

                <a className={styles.contactLink} href={links.github} aria-label="GitHub" target="_blank" rel="noreferrer">
                    <FaGithub size={28} />
                </a>

                <a className={styles.contactLink} href={links.codeberg} aria-label="Codeberg" target="_blank" rel="noreferrer">
                    <SiCodeberg size={28} />
                </a>

                <button className={styles.contactLink} type="button" onClick={copyDiscord} aria-label="Copy Discord handle">
                    <FaDiscord size={28} />
                </button>
            </div>
            {discordCopied ? <div className={styles.copyToast}>Discord copied to clipboard</div> : null}

            {/* Resume */}
            <div className={styles.contactLinks}>
                <button className={`${styles.contactLink} ${styles.resumeButton}`} type="button" onClick={downloadResume} >
                    <FaFileDownload size={24} />
                    Download Resume
                </button>
            </div>

            <div className={styles.sectionDivider} role="separator" aria-hidden="true" />

            {/* Stats */}
            {gitStats !== undefined && (
                <div className={styles.statsRow}>
                    <div className={styles.statsItem}>
                        <h3 className={styles.offset}>{gitStats.years_of_experience}</h3>
                        <p>Years of Experience</p>
                    </div>
                    <div className={styles.statsItem}>
                        <h3 className={styles.nonOffset}>{length}+</h3>
                        <p>Completed Projects</p>
                    </div>
                    <div className={styles.statsItem}>
                        <h3 className={styles.offset}>{gitStats.public_repos}</h3>
                        <p>Git Repos</p>
                    </div>
                    <div className={styles.statsItem}>
                        <h3 className={styles.nonOffset}>{gitStats.total_languages}</h3>
                        <p>Languages Used</p>
                    </div>
                </div>
            )}
        </section>
    )
} 