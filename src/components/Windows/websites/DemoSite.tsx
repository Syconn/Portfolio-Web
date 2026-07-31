import { FaGlobe } from "react-icons/fa";
import type { PageProps, webPage } from "../SafariWindow";

export const DemoWebPage: webPage = {
    icon: <FaGlobe />,
    pageTitle: "Project Demo",
    content: DemoSite
}

function DemoSite({ page }: PageProps) {
    return (
        <iframe src={"https://" + page.url + page.urlExtra} className="embedded-page" />
    )
}