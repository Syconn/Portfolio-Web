import { useEffect, useState, type ReactNode } from "react";
import { FaArrowLeft, FaArrowRight, FaLock, FaPlus } from "react-icons/fa";
import { FaRotateRight } from "react-icons/fa6";
import "../../css/Safari.css";
import { HelpPage } from "./websites/HelpSite";
import Window, { type WindowInstance, type WindowManager } from "./Window";
import { AboutPage } from "./websites/AboutSite";

const definedPages: string[] = ["/", "/about"]

export type pageData = {
    id: number,
    url: string,
    urlExtra: string,
    pageContent: webPage
}

export type webPage = {
    icon: ReactNode, //<FaGlobe />
    pageTitle: string,
    content: ({ page, modifyPage }: PageProps) => React.JSX.Element

    // Page Specific
    search?: string
}

export type PageProps = {
    page: pageData,
    modifyPage: (id: number, key: keyof webPage, val: webPage[keyof webPage]) => void,
    openTab: (url: string) => void
}

function SafariWindow(instance: WindowInstance & WindowManager) {
    const [pageData, setPageData] = useState<pageData[]>(preloadWebsites(instance.data?.urls))
    const [tab, setTab] = useState<number>(0)

    const PageContent = pageData[tab]?.pageContent.content;
    const url = pageData[tab]?.url + pageData[tab]?.urlExtra

    useEffect(() => {
        if (pageData.length === 0) instance.closeWindow(instance.id);
    }, [pageData.length]);

    const closePage = (i: number) => {
        setPageData(prev => prev.filter((_, ind) => ind !== i))
        setTab(prev => {
            if (i < prev) return prev - 1;
            if (i === prev) return Math.max(0, prev - 1);
            return prev;
        });
    }

    const openTab = (url: string = "") => {
        const [link, extra] = splitUrl(url)

        if ((link === "" && extra === "") || definedPages.includes(extra)) setPageData(prev => {
            setTab(prev.length)
            return [...prev, loadWebpage(url, prev.length)]
        })
        else {
            if (url.startsWith("http://") || url.startsWith("https://")) window.open(url, "_blank");
            else window.open(`https://www.google.com/search?q=${encodeURIComponent(url)}`, "_blank");
        }
    }

    const refresh = (url: string | undefined = pageData[tab].url + pageData[tab].urlExtra) => {
        const [link, extra] = splitUrl(url)

        if ((link === "" && extra === "") || definedPages.includes(extra)) setPageData(prev => prev.map((page, i) => i === tab ? loadWebpage(url, i) : page));
        else {
            if (url.startsWith("http://") || url.startsWith("https://")) window.open(url, "_blank");
            else window.open(`https://www.google.com/search?q=${encodeURIComponent(url)}`, "_blank");
        }
    }
    const modifyUrl = (url: string) => setPageData(prev => prev.map((page, i) => i === tab ? { ...page, ...urlObject(url) } : page));
    const modifyPage = (id: number, key: keyof webPage, val: webPage[keyof webPage]) => setPageData(prev => prev.map(page => page.id === id ? { ...page, pageContent: { ...page.pageContent, [key]: val } } : page))

    return (
        <Window {...instance} header={<div className="safari-window-title">Safari</div>}>
            <div className="safari">

                <div className="safari-tabs">
                    {pageData.map((page, i) => (
                        <div key={i} className={`safari-tab ${i === tab ? "active" : ""}`} onClick={() => setTab(i)}>
                            <div className="tab-tooltip">{page.pageContent.pageTitle}</div>
                            {page.pageContent.icon}
                            <span>{page.pageContent.pageTitle}</span>
                            <button onClick={(e) => { e.stopPropagation(); closePage(i) }}>×</button>
                        </div>
                    ))}

                    <button className="new-tab" onClick={() => openTab()}>
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
                        <input type="text" placeholder="Search or enter website name" value={url} onChange={(e) => modifyUrl(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") refresh(url); }} />
                    </div>

                    <button className="toolbar-button">☰</button>
                </div>

                <div className="safari-page">
                    {PageContent && <PageContent page={pageData[tab]} modifyPage={modifyPage} openTab={openTab} />}
                </div>
            </div>
        </Window>
    );
}

function preloadWebsites(urls: string[] | undefined): pageData[] {
    return urls ? urls.map((v, i) => loadWebpage(v, i)) : [loadWebpage("", 0)]
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

function loadWebpage(url: string, id: number): pageData {
    const [link, extra] = splitUrl(url)
    switch (extra) {
        case "/about": return {
            id: id,
            url: link,
            urlExtra: extra,
            pageContent: AboutPage
        }
        default: return {
            id: id,
            url: link,
            urlExtra: extra,
            pageContent: HelpPage
        }
    }
}

export default SafariWindow