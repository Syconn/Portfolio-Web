import { FaAngleDoubleLeft, FaAngleDoubleRight, FaChevronDown, FaChevronLeft, FaChevronRight, FaExternalLinkAlt, FaGithub, FaGlobe } from "react-icons/fa"
import { buildUrlWithData, getUrlData, type PageProps, type webPage } from "../SafariWindow"
import type { Project } from "../../../util/types";
import "../../../css/sites/ProjectView.css"
import projectJson from "../../../assets/projects.json"
import { useEffect, useRef, useState } from "react";
import { BsArrowsAngleContract } from "react-icons/bs";
import { categories, iconColors } from "./SkillsSite";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const ProjectViewPage: webPage = {
    icon: <FaGlobe />,
    pageTitle: "Project View",
    content: ProjectView
}

function ProjectView({ page, modifyPage, modifyUrl, closeTab, openTab }: PageProps) {
    const [projects] = useState<Project[]>(projectJson)
    const [expandedImage, setExpandedImage] = useState<string | null>(null);
    const [imageIndex, setImageIndex] = useState(0);
    const [skillCategory, setSkillCategory] = useState("All");
    const [readmeContent, setReadmeContent] = useState("");

    const projectId: number | undefined = getUrlData(page.urlExtra).projectId;
    const project: Project | undefined = projectId !== undefined && projectId < projects.length && projectId >= 0 ? projects[projectId] : undefined

    useEffect(() => {
        if (project !== undefined) modifyPage(page.id, { pageTitle: project.title })
    }, [projectId])

    useEffect(() => {
        if (project === undefined || project.readme === undefined) return;
        fetch(project.readme).then(res => res.text()).then(text => setReadmeContent(text)).catch(() => setReadmeContent("Failed to load README."));
    }, [project?.readme]);

    const getImageName = (path: string) => path.split("/").pop() ?? "Image";

    const projectSkillData = project?.skills.map(skill => {
        const category = categories.find(cat => cat.skills.some(s => s.name === skill));
        return {
            name: skill,
            category: category?.title ?? "Other",
            icon: category?.skills.find(s => s.name === skill)?.icon
        };
    });

    const filteredSkills = projectSkillData?.filter(skill => skillCategory === "All" || skill.category === skillCategory);

    if (!project) return (<span> No Project Loaded </span>)
    return (
        <div className="expanded-project">

            <section className="project-header">
                <div>
                    <h1>{project.title}</h1>
                    <p>{project.subline}</p>
                </div>

                <div className="project-actions">
                    {projectId !== undefined && (
                        <a onClick={() => modifyUrl(buildUrlWithData("projectView", { projectId: (projectId + 1 + projects.length) % projects.length, returnId: getUrlData(page.urlExtra).returnId }))}>
                            <FaAngleDoubleLeft />
                            Previous
                        </a>
                    )}

                    {project.demoLink && (
                        <a onClick={() => { if (project.demoLink) openTab(buildUrlWithData(project.demoLink, { returnId: page.id })) }}>
                            <FaExternalLinkAlt />
                            Demo
                        </a>
                    )}

                    <a onClick={() => openTab(project.repo)}>
                        <FaGithub />
                        GitHub
                    </a>

                    <a onClick={() => closeTab(page.id)}>
                        <BsArrowsAngleContract />
                        Shrink
                    </a>

                    {projectId !== undefined && (
                        <a onClick={() => modifyUrl(buildUrlWithData("projectView", { projectId: (projectId - 1 + projects.length) % projects.length, returnId: getUrlData(page.urlExtra).returnId }))}>
                            <FaAngleDoubleRight />
                            Next
                        </a>
                    )}
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
                <div className="project-panel key-facts-panel">
                    <h2>Key Facts</h2>

                    <div className="key-facts">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{project.keyFacts}</ReactMarkdown>
                    </div>
                </div>

                <div className="project-panel">
                    <h2>Skills</h2>

                    <div className="skill-filter">
                        <GlassDropdown value={skillCategory} options={["All", ...categories.map(c => c.title)]} onChange={setSkillCategory} />
                    </div>

                    <div className="skills">
                        {filteredSkills?.map(skill => {
                            const skillStyle = {
                                color: iconColors[skill.name],
                                "--skill-color": iconColors[skill.name]
                            } as React.CSSProperties;

                            return <span key={skill.name} style={skillStyle}>{skill.icon} {skill.name}</span>;
                        })}
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
                                    <strong>{new Date(event.date).toLocaleDateString(undefined, { month: "short", day: "2-digit", year: "numeric" })}</strong>
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
                    {readmeContent ? <ReactMarkdown remarkPlugins={[remarkGfm]}>{readmeContent}</ReactMarkdown> : <p> No README available. </p>}
                </div>
            </section>
        </div>
    );
}

export function GlassDropdown({ value, options, onChange }: { value: string, options: string[], onChange: (value: string) => void }) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const close = (e: MouseEvent) => {
            if (!ref.current?.contains(e.target as Node)) setOpen(false);
        };

        document.addEventListener("mousedown", close);
        return () => document.removeEventListener("mousedown", close);
    }, []);


    return (
        <div className="glass-dropdown" ref={ref}>
            <button className="glass-dropdown-button" onClick={() => setOpen(!open)}>
                {value}

                <FaChevronDown className={open ? "rotate" : ""} />
            </button>

            {open && (
                <div className="glass-dropdown-menu">
                    {options.map(option => (
                        <button
                            key={option}
                            className={option === value ? "selected" : ""}
                            onClick={() => {
                                onChange(option);
                                setOpen(false);
                            }}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}