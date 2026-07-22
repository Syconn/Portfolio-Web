import { useEffect, useState } from 'react';
import { FaDiscord, FaFileDownload, FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiCodeberg } from 'react-icons/si';
import styles from './App.module.css';
import { links } from './util/data';

function App() {
	const [discordCopied, setDiscordCopied] = useState(false)

	const copyDiscord = async () => {
		await navigator.clipboard.writeText(links.discord)
		setDiscordCopied(true)
	}

	useEffect(() => {
		if (!discordCopied) return
		const timer = window.setTimeout(() => { setDiscordCopied(false) }, 1800)
		return () => window.clearTimeout(timer)
	}, [discordCopied])

	return (
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
						<img src="/me.png" alt="Me" />

						{/* TODO: Cycling Skills */}

						{/* Description */}
						<p>
							Computer Science and Cybersecurity student at the University of Delaware passionate about software development, cybersecurity, and building innovative projects. I enjoy
							learning new technologies and competing in hackathons and Dataquests.
						</p>

						{/* TODO: Contacts */}
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

						{/* TODO: Resume */}
						<div className={styles.contactLinks}>
							<button className={`${styles.contactLink} ${styles.resumeButton}`} type="button">
								<FaFileDownload size={24} />
								Download Resume
							</button>
						</div>

						{/* TODO: Stats */}
					</section>
				</main>
			</div>
		</div>
	)
}

export default App
