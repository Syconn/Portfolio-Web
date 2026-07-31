import { AiFillProject } from "react-icons/ai";
import { buildUrlWithData, type PageProps, type webPage } from "../SafariWindow";
import projectJson from "../../../assets/projects.json"
import type { Project } from "../../../util/types";
import { useState } from "react";
import { FaExternalLinkAlt, FaGithub, FaCalendar, FaCode, FaExpandAlt } from "react-icons/fa";
import "../../../css/sites/Projects.css"
import { iconColors } from "./SkillsSite";

export const ProjectPage: webPage = {
    icon: <AiFillProject />,
    pageTitle: "My Projects",
    content: Projects
}

// TODO: IDEA MY GITHUB STUFF WILL LOAD IN IFRAMES SO OPEN THOSE IN BROWSER | ALSO EXPANDED VIEW AS A BROWSER + MINIMALIZE CURRENT VIEW A BIT - SQUARE IT, TO MANY IMAGES, CATEGORIZE SKILLS, FIX DATES FROM COMMIT HISTORY
function Projects({ page, openTab }: PageProps) {
    const [projects] = useState<Project[]>(projectJson)
    
    return (
        <div className="projects-page">
            <div className="projects-header">
                <h1> Projects </h1>
            </div>

            <div className="projects-list"> 
                {projects.map((project, ind) => (
                    <article className="project-card"  key={project.title}>
                        <div className="project-top">
                            <div>
                                <h2>{project.title}</h2>

                                <p className="project-subline">{project.subline}</p>
                            </div>

                            <div className="project-buttons">
                                {project.demoLink && (
                                    <a href={project.demoLink} target="_blank">
                                        <FaExternalLinkAlt />
                                        Demo
                                    </a>
                                )}

                                <a href={project.repo} target="_blank">
                                    <FaGithub />
                                    Source
                                </a>

                                <a onClick={() => openTab(buildUrlWithData("projectView", { projectId: ind, returnId: page.id }))}>
                                    <FaExpandAlt />
                                    Expanded
                                </a>
                            </div>
                        </div>

                        {project.imgs.length > 0 && (
                            <div className="project-images">
                                {project.imgs.map(img => (
                                    <img key={img} src={img} />
                                ))}
                            </div>
                        )}

                        <div className="project-info">
                            <div className="date-box">
                                <FaCalendar />

                                <div>
                                    <span>Started</span>
                                    <strong>{new Date(project.startDate).toLocaleDateString()}</strong>
                                </div>
                            </div>

                            <div className="date-box">
                                <FaCalendar />

                                <div>
                                    <span>Updated</span>
                                    <strong>{new Date(project.lastUpdated).toLocaleDateString()}</strong>
                                </div>
                            </div>
                        </div>

                        <div className="project-skills">
                            <h3>Built With</h3>

                            <div>
                                {project.skills.map(skill => (
                                    <span key={skill} style={{ color: iconColors[skill], "--skill-color": iconColors[skill] } as React.CSSProperties}>
                                        <FaCode />
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </article>
                ))}
            </div>
        </div>
    )
}