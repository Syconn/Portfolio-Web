import { BsBrowserChrome } from "react-icons/bs";
import { FaEnvelope, FaFileAlt, FaFileArchive, FaFileImage, FaFilePdf } from "react-icons/fa";
import { IoMdBrowsers } from "react-icons/io";

function DesktopFile({ name, type }: { name: string, type: iconKey }) {
    return (
        <div className="desktop-icon">
            <FileIcon type={type} />
            <span className="file-name">{name}</span>
        </div>
    )
}

export type iconKey = "pdf" | "txt" | "zip" | "png" | "mail" | "safari"
function FileIcon({ type }: { type: iconKey }) {
    switch (type) {
        case "pdf":
            return <FaFilePdf className="file-icon pdf" />;

        case "zip":
            return <FaFileArchive className="file-icon zip" />;

        case "png":
            return <FaFileImage className="file-icon image" />;

        case "mail":
            return <FaEnvelope className="file-icon mail" />
            
        case "safari":
            return <BsBrowserChrome className="file-icon portfolio" /> //portfolio

        default:
            return <FaFileAlt className="file-icon txt" />;
    }
}

export default DesktopFile