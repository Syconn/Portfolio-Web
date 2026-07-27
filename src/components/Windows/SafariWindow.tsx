import Window, { type WindowInstance, type WindowManager } from "./Window";
import "../../css/Safari.css"
import { FaArrowLeft, FaArrowRight, FaGlobe, FaLock, FaPlus } from "react-icons/fa";
import { FaRotateRight } from "react-icons/fa6";
import { useState, type ReactNode } from "react";
import HelpSite from "../../websites/HelpSite";

type webPage = {
    url: string
    urlExtra: string,
    pageContent: ReactNode
}

function SafariWindow(instance: WindowInstance & WindowManager) {
    const [webpages, setWebPages] = useState<webPage[]>(preloadWebsites(instance.data?.urls))
    const [tab, setTab] = useState<number>(0)

    const page: webPage = webpages[tab]

    if (!page) instance.closeWindow(instance.id)

    return (
        <Window {...instance} header={<div className="safari-window-title">Safari</div>}>
            <div className="safari">

                <div className="safari-tabs">
                    {Array.from({ length: 8 }, (_, i) => (
                        <div key={i} className="safari-tab">
                            <FaGlobe />
                            <span>New Tab</span>
                            <button>×</button>
                            <div className="tab-tooltip">
                                New Tab
                            </div>
                        </div>
                    ))}

                    <div className="safari-tab active">
                        <FaGlobe />
                        <span>New Tab</span>
                        <button>×</button>
                        <div className="tab-tooltip">
                            New Tab
                        </div>
                    </div>

                    <button className="new-tab">
                        <FaPlus />
                    </button>
                </div>


                <div className="safari-toolbar">
                    <div className="navigation-buttons">
                        <button><FaArrowLeft /></button>
                        <button><FaArrowRight /></button>
                        <button><FaRotateRight /></button>
                    </div>

                    <div className="address-bar">
                        <FaLock />
                        <input type="text" placeholder="Search or enter website name" />
                    </div>

                    <button className="toolbar-button">☰</button>
                </div>

                <div className="safari-page">
                    {/* Website content goes here */}
                </div>
            </div>
        </Window>
    );
}

function preloadWebsites(urls: string[] | undefined): webPage[] {
    return urls ? urls.map(v => loadWebpage(v)) : [loadWebpage("")]
}

function splitUrl(url: string): [string, string] {
    const withoutProtocol = url.replace(/^https?:\/\//, "");
    const index = withoutProtocol.search(/[\/#]/);
    return index === -1 ? [withoutProtocol, ""] : [withoutProtocol.slice(0, index), withoutProtocol.slice(index)];
}

function loadWebpage(url: string): webPage {
    const [link, extra] = splitUrl(url)
    switch (link) {
        default:
            return {
                url: link,
                urlExtra: extra,
                pageContent: <HelpSite />
            }
    }
}

export default SafariWindow