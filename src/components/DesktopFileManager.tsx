import "../css/DesktopFile.css";
import type { windowData } from "../util/types";
import DesktopFile, { type iconKey } from "./DesktopFile";
import type { registryKey } from "./Windows/WindowManager";
import resumePDF from "../assets/resume.pdf";

function DesktopFileManager({ openOrShowWindow }: { openOrShowWindow: (id: "pdf" | "safari", data?: windowData) => void }) {
    const files: { name: string, type: iconKey, window: registryKey }[] = [
        { name: "Resume.pdf", type: "pdf", window: "pdf" }
    ];

    return (
        <div className="desktop-files">
            {files.map(file => (
                <div key={file.name} onClick={() => openOrShowWindow(file.window, { filePath: resumePDF })}>
                    <DesktopFile
                        name={file.name}
                        type={file.type}
                    />
                </div>
            ))}
        </div>
    );
}

export default DesktopFileManager