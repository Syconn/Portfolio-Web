import "../css/DesktopFile.css";
import DesktopFile, { type iconKey } from "./DesktopFile";

function DesktopFileManager() {
    const files: { name: string, type: iconKey}[] = [
        { name: "Resume.pdf", type: "pdf" }
    ];

    return (
        <div className="desktop-files">
            {files.map(file => (
                <DesktopFile
                    name={file.name}
                    type={file.type}
                />
            ))}
        </div>
    );
}

export default DesktopFileManager