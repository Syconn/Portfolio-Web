import "../css/DesktopFile.css";
import type { WindowData } from "../util/types";
import DesktopFile, { type iconKey } from "./DesktopFile";
import type { registryKey } from "./Windows/WindowManager";
import resumePDF from "../assets/resume.pdf";
import { useRef, useState } from "react";

type DesktopIcon = {
    id: number
    name: string,
    type: iconKey,
    window: registryKey,
    x: number,
    y: number,
    data?: WindowData
}

const fileDefaults: DesktopIcon[] = [
    { id: 0, name: "Resume.pdf", type: "pdf", window: "pdf", x: 20, y: 20, data: { filePath: resumePDF } },
    { id: 1, name: "Contact Me", type: "mail", x: 20, y: 130, window: "contact" },
    { id: 2, name: "Portfolio", type: "safari", x: 130, y: 20, window: "safari", data: { urls: ["skills", "projects"] } }
]

function DesktopFileManager({ openOrShowWindow }: { openOrShowWindow: (id: registryKey, data?: WindowData) => void }) {
    const [files, setFiles] = useState<DesktopIcon[]>(fileDefaults)
    const [dragging, setDragging] = useState<number | null>(null);

    const dragInfo = useRef<{ id: number, offsetX: number, offsetY: number, } | null>(null);

    const startDrag = (e: React.MouseEvent, file: DesktopIcon) => {
        setDragging(file.id);
        dragInfo.current = { id: file.id, offsetX: e.clientX - file.x, offsetY: e.clientY - file.y };
        window.addEventListener("mousemove", onDrag);
        window.addEventListener("mouseup", stopDrag);
    };

    const onDrag = (e: MouseEvent) => {
        if (!dragInfo.current) return;

        const { id, offsetX, offsetY } = dragInfo.current;
        setFiles(prev => prev.map(file => file.id === id ? { ...file, x: e.clientX - offsetX, y: e.clientY - offsetY } : file));
    };

    const stopDrag = () => {
        setDragging(null);
        dragInfo.current = null;
        window.removeEventListener("mousemove", onDrag);
        window.removeEventListener("mouseup", stopDrag);
    };

    return (
        <div className="desktop-files">
            {files.map(file => (
                <div
                    key={file.id}
                    onDoubleClick={() => openOrShowWindow(file.window, file?.data)}
                    className={`desktop-file-wrapper ${dragging === file.id ? "dragging" : ""}`}
                    style={{ left: file.x, top: file.y }}
                    onMouseDown={(e) => startDrag(e, file)}>
                    <DesktopFile name={file.name} type={file.type} />
                </div>
            ))}
        </div>
    );
}

export default DesktopFileManager