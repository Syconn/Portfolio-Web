import { useState } from "react";
import { AiFillProject } from "react-icons/ai";
import { FaArrowRight, FaCalendar, FaCode } from "react-icons/fa";
import projectJson from "../../../assets/projects.json";
import "../../../css/sites/Projects.css";
import type { Project } from "../../../util/types";
import { buildUrlWithData, type PageProps, type webPage } from "../SafariWindow";
import { iconColors } from "./SkillsSite";

export const ProjectPage: webPage = {
    icon: <AiFillProject />,
    pageTitle: "My Projects",
    content: Projects
}

function Projects({ page, openTab }: PageProps) {
    const [projects] = useState<Project[]>(projectJson)

    return (
        <div className="projects-page">
            <div className="projects-header">
                <h1> Projects </h1>
            </div>

            <span className="project-count">
                {projects.length} Projects
            </span>

            <div className="projects-list">
                {projects.map((project, ind) => (
                    <article
                        className="project-card"
                        key={project.title}
                        onClick={() =>
                            openTab(
                                buildUrlWithData("projectView", {
                                    projectId: ind,
                                    returnId: page.id
                                })
                            )
                        }
                    >

                        <div className="project-image">

                            <img
                                src={project.imgs[0]}
                                alt={project.title}
                            />

                            <div className="project-image-overlay">

                                <h2>{project.title}</h2>

                            </div>

                        </div>


                        <div className="project-content">

                            <p className="project-subline">
                                {project.subline}
                            </p>


                            <div className="project-skills">

                                {project.skills.slice(0, 4).map(skill => (

                                    <span
                                        key={skill}
                                        style={{
                                            color: iconColors[skill],
                                            "--skill-color": iconColors[skill]
                                        } as React.CSSProperties}
                                    >
                                        <FaCode />
                                        {skill}
                                    </span>

                                ))}

                                {project.skills.length > 4 && (

                                    <span className="more-skills">

                                        +{project.skills.length - 4}

                                    </span>

                                )}

                            </div>


                            <div className="project-footer">

                                <div className="footer-date">

                                    <FaCalendar />

                                    <div>

                                        <span>Updated</span>

                                        <strong>
                                            {new Date(project.commitHistory[project.commitHistory.length - 1].date).toLocaleDateString()}
                                        </strong>

                                    </div>

                                </div>


                                <FaArrowRight className="project-arrow" />

                            </div>

                        </div>

                    </article>
                ))}
            </div>
        </div>
    )
}