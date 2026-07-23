import { useEffect, useState } from 'react';
import { FaDiscord, FaFileDownload, FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiCodeberg } from 'react-icons/si';
import styles from './App.module.css';
import { links } from './util/data';
import type { quickStats } from './util/types';
import { generateStats } from './util/githubAPI';
import me from "./assets/me.png";
import resume from "./assets/resume.pdf";

function App() {
	const [discordCopied, setDiscordCopied] = useState(false)
	const [gitStats, setGitStats] = useState<quickStats>()

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

	useEffect(() => {
		if (gitStats !== undefined) return
		const loadStats = async () => setGitStats(await generateStats());
		loadStats()
	}, [])

	return (
		// TODO TAKE UP LEFT THIRD
		<div className={styles.pageShell}>
			<div className={styles.windowFrame}>
				<header className={styles.windowChrome}>
					<div className={styles.trafficLights} aria-label="Window controls">
						<span className={`${styles.light} ${styles.lightClose}`} />
						<span className={`${styles.light} ${styles.lightMinimize}`} />
						<span className={`${styles.light} ${styles.lightFullscreen}`} />
					</div>
					<div className={styles.windowTitleGroup}>
						<p className={styles.windowKicker}>Portfolio</p>
					</div>
					<div className={styles.windowPill}>Online</div>
				</header>

				<main className={styles.windowBody}>
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

						{/* TODO: Stats */}
						{gitStats !== undefined && (
								<div className={styles.statsRow}>
									<div className={styles.statsItem}>
										<h3 className={styles.offset}>{gitStats.years_of_experience}</h3>
										<p>Years of Experience</p>
									</div>
									<div className={styles.statsItem}>
										<h3 className={styles.nonOffset}>{gitStats.completed_projects}</h3>
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
				</main>
			</div>
		</div>
	)
}

export default App
