import { IoIosHelpCircle } from "react-icons/io"
import { IoGlobeOutline } from "react-icons/io5"
import type { PageProps, webPage } from "../SafariWindow"
import "../../../css/sites/Help.css"

export const HelpPage: webPage = {
    icon: <IoIosHelpCircle />,
    pageTitle: "Welcome Page",
    content: HelpSite
}

function HelpSite({ page, modifyPage, openTab }: PageProps) {
    return (
        <div className="welcome-screen">
            <div className="welcome-content">
                <div className="browser-logo"><IoGlobeOutline /></div>

                <h1>Welcome to my Interactive Portfolio</h1>
                <p>You can use the helper links at the bottom to see parts of my resume or just search like a normal browser. New tabs always load this page.</p>

                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search the web..."
                        value={page.pageContent?.search ?? ""}
                        onChange={(e) => modifyPage(page.id, { search: e.target.value })}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") openTab(page.pageContent?.search ?? "");
                        }}
                    />
                    <button onClick={() => openTab(page.pageContent?.search ?? "")}>→</button>
                </div>

                <div className="quick-links">
                    <button onClick={() => openTab("about")}>About</button>
                    <button onClick={() => openTab("projects")}>Projects</button>
                    <button onClick={() => openTab("skills")}>Skills</button>
                </div>
            </div>
        </div>
    )
}

export default HelpSite