import { FaExternalLinkAlt, FaGithub, FaGlobe } from "react-icons/fa"
import type { PageProps, webPage } from "../SafariWindow"
import type { Project } from "../../../util/types";
import "../../../css/sites/ProjectView.css"
import { useEffect, useState } from "react";
import { BsArrowsAngleContract } from "react-icons/bs";

export const ProjectViewPage: webPage = {
    icon: <FaGlobe />,
    pageTitle: "Project View",
    content: ProjectView
}

// TOGGLE BUTTONS, EXPAND IMAGE ON CLICK, SKILLS BREAK DOWN BY CATEGORY, BETTER TIMELINE, ACTUALLY SHOW README, DEMO ON SITE
function ProjectView({ page, modifyPage, closeTab }: PageProps) {
    const [expandedImage, setExpandedImage] = useState<string | null>(null);

    const project: Project | undefined = page.pageContent.project;

    useEffect(() => {
        if (project) modifyPage(page.id, { pageTitle: project.title })
    }, [page.pageContent.project])

    if (!project) return (<span> No Project Loaded </span>)
    return (
        <div className="expanded-project">

            <section className="project-header">
                <div>
                    <h1>{project.title}</h1>
                    <p>{project.subline}</p>
                </div>

                <div className="project-actions">
                    {project.demoLink && (
                        <a href={project.demoLink} target="_blank">
                            <FaExternalLinkAlt />
                            Demo
                        </a>
                    )}

                    <a href={project.repo} target="_blank">
                        <FaGithub />
                        GitHub
                    </a>

                    <a onClick={() => closeTab(page.id)}>
                        <BsArrowsAngleContract />
                        Contract
                    </a>
                </div>
            </section>


            {project.imgs.length > 0 && (
                <section className="project-images">
                    {project.imgs.map((img, i) => (
                        <img
                            key={i}
                            src={img}
                            alt={`${project.title} screenshot ${i + 1}`}
                            onClick={() => setExpandedImage(img)}
                        />
                    ))}
                </section>
            )}


            {expandedImage && (
                <div
                    className="image-overlay"
                    onClick={() => setExpandedImage(null)}
                >
                    <img
                        src={expandedImage}
                        alt="Expanded screenshot"
                        onClick={(e) => e.stopPropagation()}
                    />

                    <button
                        className="close-image"
                        onClick={() => setExpandedImage(null)}
                    >
                        ×
                    </button>
                </div>
            )}

            <section className="project-info">
                <div className="project-panel">
                    <h2>Skills</h2>

                    <div className="skills">
                        {project.skills.map(skill => (
                            <span key={skill}>
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

                <div className="project-panel dates">
                    <h2>Timeline</h2>
                    <p>
                        Started:
                        <strong> {new Date(project.startDate).toLocaleDateString()} </strong>
                    </p>

                    <p>
                        Last Updated:
                        <strong> {new Date(project.lastUpdated).toLocaleDateString()} </strong>
                    </p>
                </div>

            </section>


            <section className="readme">
                <div className="readme-header">
                    <span>README.md</span>
                </div>

                <div className="markdown">
                    {project.readme ? (
                        <pre>
                            {project.readme}
                        </pre>
                    ) : (
                        <p>
                            No README available.
                        </p>
                    )}
                </div>

            </section>
        </div>
    );
}