import { FaChevronLeft, FaChevronRight, FaExternalLinkAlt, FaGithub, FaGlobe } from "react-icons/fa"
import { getUrlData, type PageProps, type webPage } from "../SafariWindow"
import type { Project } from "../../../util/types";
import "../../../css/sites/ProjectView.css"
import projectJson from "../../../assets/projects.json"
import { useEffect, useState } from "react";
import { BsArrowsAngleContract } from "react-icons/bs";
import { iconColors } from "./SkillsSite";

export const ProjectViewPage: webPage = {
    icon: <FaGlobe />,
    pageTitle: "Project View",
    content: ProjectView
}

// TOGGLE BUTTONS, SKILLS BREAK DOWN BY CATEGORY, ACTUALLY SHOW README, DEMO ON SITE
function ProjectView({ page, modifyPage, closeTab }: PageProps) {
    const [projects] = useState<Project[]>(projectJson)
    const [expandedImage, setExpandedImage] = useState<string | null>(null);
    const [imageIndex, setImageIndex] = useState(0);

    const projectId: number | undefined = getUrlData(page.urlExtra).projectId;
    const project: Project | undefined = projectId !== undefined && projectId < projects.length && projectId >= 0 ? projects[projectId] : undefined

    console.log(getUrlData(page.urlExtra))

    useEffect(() => {
        if (project) modifyPage(page.id, { pageTitle: project.title })
    }, [projectId])

    const getImageName = (path: string) => path.split("/").pop() ?? "Image";

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
                <section className="project-carousel">
                    {project.imgs.length > 1 && (
                        <img className="preview-image left" src={project.imgs[(imageIndex - 1 + project.imgs.length) % project.imgs.length]} onClick={() => setImageIndex((imageIndex - 1 + project.imgs.length) % project.imgs.length)} />
                    )}

                    <button className="carousel-button" onClick={() => setImageIndex((imageIndex - 1 + project.imgs.length) % project.imgs.length)}>
                        <FaChevronLeft />
                    </button>

                    <div className="main-image-container">
                        <img className="main-project-image" src={project.imgs[imageIndex]} alt={`${project.title} screenshot`} onClick={() => setExpandedImage(project.imgs[imageIndex])} />
                        <span className="image-name">{getImageName(project.imgs[imageIndex])}</span>
                    </div>

                    <button className="carousel-button" onClick={() => setImageIndex((imageIndex + 1) % project.imgs.length)}>
                        <FaChevronRight />
                    </button>

                    {project.imgs.length > 1 && <img className="preview-image right" src={project.imgs[(imageIndex + 1) % project.imgs.length]} onClick={() => setImageIndex((imageIndex + 1) % project.imgs.length)} />}

                </section>
            )}

            {expandedImage && (
                <div className="image-overlay" onClick={() => setExpandedImage(null)}>
                    <img src={expandedImage} alt="Expanded screenshot" onClick={(e) => e.stopPropagation()} />
                    <button className="close-image" onClick={() => setExpandedImage(null)}>×</button>
                </div>
            )}

            <section className="project-info">
                <div className="project-panel">
                    <h2>Skills</h2>

                    <div className="skills">
                        {project.skills.map(skill => <span key={skill} style={{ color: iconColors[skill], "--skill-color": iconColors[skill] } as React.CSSProperties}>{skill}</span>)}
                    </div>
                </div>

                <div className="project-panel timeline-panel">
                    <h2>Timeline</h2>

                    <div className="timeline">
                        {project.commitHistory.map((event, i) => (
                            <div className="timeline-event" key={i}>
                                <div className="timeline-dot" style={{ "--dot-color": event.color ?? "#007aff" } as React.CSSProperties} />

                                <div className="timeline-content">
                                    <span>{event.name}</span>
                                    <strong>{new Date(event.date).toLocaleDateString(undefined, { month: "short", year: "numeric" } )}</strong>
                                </div>
                            </div>
                        ))}
                    </div>
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
                        <p> No README available. </p>
                    )}
                </div>
            </section>
        </div>
    );
}