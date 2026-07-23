import { useState } from 'react';
import styles from './App.module.css';
import projectData from "./assets/projects.json";
import { pages } from './util/data';
import type { project } from './util/types';
import { Overview } from './pages/Overview';

function App() {
	const [activePage, setActivePage] = useState(pages[0])
	const [projects] = useState<project[]>(projectData)

	return (
		<div className={styles.pageShell}>
			<div className={styles.windowFrame}>
				<header className={styles.windowChrome}>
					<div className={styles.trafficLights} aria-label="Window controls">
						<span className={`${styles.light} ${styles.lightClose}`} />
						<span className={`${styles.light} ${styles.lightMinimize}`} />
						<span className={`${styles.light} ${styles.lightFullscreen}`} />
					</div>
					<nav className={styles.pageTabs} aria-label="Page sections">
						{pages.map((page) => (
							<button
								key={page}
								type="button"
								className={`${styles.pageTab} ${activePage === page ? styles.pageTabActive : ''}`}
								onClick={() => setActivePage(page)}
								aria-pressed={activePage === page}
							>
								{page}
							</button>
						))}
					</nav>
					<div className={styles.windowTitleGroup}>
						<p className={styles.windowKicker}>Portfolio</p>
					</div>
				</header>

				<main className={styles.windowBody}>
					{activePage == pages[0] && <Overview length={projects.length} />}
				</main>
			</div>
		</div>
	)
}

export default App
