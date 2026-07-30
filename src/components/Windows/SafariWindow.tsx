import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { FaArrowLeft, FaArrowRight, FaLock, FaPlus } from "react-icons/fa";
import { FaRotateRight } from "react-icons/fa6";
import "../../css/Safari.css";
import { HelpPage } from "./websites/HelpSite";
import Window, { type WindowInstance, type WindowManager } from "./Window";
import { AboutPage } from "./websites/AboutSite";
import type { registryKey } from "./WindowManager";
import type { Project, WindowData } from "../../util/types";
import { SkillsPage } from "./websites/SkillsSite";
import { ProjectPage } from "./websites/ProjectSite";
import { ProjectViewPage } from "./websites/ProjectView";

const definedPages: string[] = ["/", "/about", "/skills", "/projects", "/projectView"]

export type pageData = {
    id: number,
    url: string,
    urlExtra: string,
    pageContent: webPage
}

export type webPage = {
    icon: ReactNode,
    pageTitle: string,
    content: ({ page, modifyPage }: PageProps) => React.JSX.Element

    // Page Specific
    search?: string,
    project?: Project
    returnTab?: number
}

export type PageProps = {
    page: pageData,
    modifyPage: (id: number, changes: Partial<webPage>) => void,
    openTab: (url: string, changes?: Partial<webPage>) => void,
    closeTab: (id: number) => void,
    openExternalWindow: (id: registryKey, data?: WindowData) => void
}

function SafariWindow(instance: WindowInstance & WindowManager) {
    const nextId = useRef(0)
    const initialPages = preloadWebsites(instance.data?.urls, nextId);

    const [pageData, setPageData] = useState(initialPages);
    const [tab, setTab] = useState(initialPages.at(-1)?.id ?? -1);

    const selectedData = pageData.find(v => v.id === tab)
    const PageContent = selectedData?.pageContent.content;
    const safeUrl = selectedData ? selectedData.url + selectedData.urlExtra : ""

    useEffect(() => {
        if (instance.data?.urls) instance.data.urls.forEach(val => openTab(val))
    }, [instance.data?.urls])

    useEffect(() => {
        if (pageData.length === 0) instance.closeWindow(instance.id);
    }, [pageData.length]);

    const closeTab = (i: number) => {
        const optionalTab = pageData.find(v => v.id === i)?.pageContent.returnTab
        setPageData(prev => {
            const newPages = prev.filter(page => page.id !== i)

            setTab(prev => {
                if (optionalTab !== undefined && newPages.some(page => page.id === optionalTab)) return optionalTab;
                if (prev !== i) return prev;
                return newPages.at(-1)?.id ?? -1
            });

            return newPages
        })
    }

    const openTab = (url: string = "", changes?: Partial<webPage>) => {
        const [link, extra] = splitUrl(url)

        console.log("Clicked ", url)

        if ((link === "" && extra === "") || definedPages.includes(extra)) {
            const id = nextId.current++;
            const page = loadWebpage(url, id);
            if (changes) page.pageContent = { ...page.pageContent, ...changes }

            setTab(id);
            setPageData(prev => [...prev, page]);
        } else {
            if (url.startsWith("http://") || url.startsWith("https://")) window.open(url, "_blank");
            else window.open(`https://www.google.com/search?q=${encodeURIComponent(url)}`, "_blank");
        }
    }

    useEffect(() => {
        console.log({
            tab,
            pageIds: pageData.map(p => p.id),
            selectedData: pageData.find(v => v.id === tab)
        });
    }, [tab, pageData]);

    const refresh = (url: string | undefined = safeUrl) => {
        const [link, extra] = splitUrl(url)

        if ((link === "" && extra === "") || definedPages.includes(extra)) setPageData(prev => prev.map(page => page.id === tab ? loadWebpage(url, page.id) : page));
        else {
            if (url.startsWith("http://") || url.startsWith("https://")) window.open(url, "_blank");
            else window.open(`https://www.google.com/search?q=${encodeURIComponent(url)}`, "_blank");
        }
    }
    const modifyUrl = (url: string) => setPageData(prev => prev.map(page => page.id === tab ? { ...page, ...urlObject(url) } : page));
    const modifyPage = (id: number, changes: Partial<webPage>) => setPageData(prev => prev.map(page => page.id === id ? { ...page, pageContent: { ...page.pageContent, ...changes } } : page));

    return (
        <Window {...instance} header={<div className="safari-window-title">Safari</div>}>
            <div className="safari">

                <div className="safari-tabs">
                    {pageData.map(page => (
                        <div key={page.id} className={`safari-tab ${page.id === tab ? "active" : ""}`} onClick={() => setTab(page.id)}>
                            <div className="tab-tooltip">{page.pageContent.pageTitle}</div>
                            {page.pageContent.icon}
                            <span>{page.pageContent.pageTitle}</span>
                            <button onClick={(e) => { e.stopPropagation(); closeTab(page.id) }}>×</button>
                        </div>
                    ))}

                    <button className="new-tab" onClick={(e) => { e.stopPropagation(); openTab() }}>
                        <FaPlus />
                    </button>
                </div>


                <div className="safari-toolbar">
                    <div className="navigation-buttons">
                        <button disabled><FaArrowLeft /></button>
                        <button disabled><FaArrowRight /></button>
                        <button onClick={() => refresh()}><FaRotateRight /></button>
                    </div>

                    <div className="address-bar">
                        <FaLock />
                        <input type="text" placeholder="Search or enter website name" value={safeUrl ?? ""} onChange={(e) => modifyUrl(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") refresh(safeUrl); }} />
                    </div>

                    <button className="toolbar-button">☰</button>
                </div>

                <div className="safari-page">
                    {PageContent && <PageContent page={selectedData} modifyPage={modifyPage} openTab={openTab} closeTab={closeTab} openExternalWindow={instance.openExternalWindow} />}
                </div>
            </div>
        </Window>
    );
}

function preloadWebsites(urls: string[] | undefined, ref: RefObject<number>): pageData[] {
    if (!urls) return [loadWebpage("", ref.current++)];
    return urls.map(v => loadWebpage(v, ref.current++));
}

function splitUrl(url: string): [string, string] {
    if (url.includes(" ")) return [url, ""]
    const withoutProtocol = url.replace(/^https?:\/\//, "")
    const index = withoutProtocol.search(/[\/#]/)
    return index === -1 ? [withoutProtocol, ""] : [withoutProtocol.slice(0, index), withoutProtocol.slice(index)]
}

function urlObject(inputUrl: string): { url: string, urlExtra: string } {
    const [url, urlExtra] = splitUrl(inputUrl)
    return { url, urlExtra }
}

function page(id: number, url: string, page: webPage): pageData {
    const [link, extra] = splitUrl(url)
    return {
        id: id,
        url: link,
        urlExtra: extra,
        pageContent: page
    }
}

function loadWebpage(url: string, id: number): pageData {
    switch (splitUrl(url)[1]) {
        case "/about": return page(id, url, AboutPage)
        case "/skills": return page(id, url, SkillsPage)
        case "/projects": return page(id, url, ProjectPage)
        case "/projectView": return page(id, url, ProjectViewPage)
        default: return page(id, url, HelpPage)
    }
}

export default SafariWindow