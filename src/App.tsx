import styles from './App.module.css'

function App() {
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
						{/* <h1>Aidan Haack</h1> */}
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

						{/* TODO: Contants */}

						{/* TODO: Resume */}

						{/* TODO: Stats */}
					</section>
				</main>
			</div>
		</div>
	)
}

export default App
