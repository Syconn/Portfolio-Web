import { useRef, useState } from "react";
import DesktopFileManager from "../DesktopFileManager";
import Dock from "../Dock";
import SafariWindow from "./SafariWindow";
import type { WindowBounds, WindowInstance } from "./Window";
import PDFWindow from "./PDFWindow";
import type { windowData } from "../../util/types";
import ContactWindow from "./ContactWindow";

const windowRegistry = {
    safari: SafariWindow,
    pdf: PDFWindow,
    contact: ContactWindow
}

export type registryKey = keyof typeof windowRegistry

function WindowManager() {
    const [windowInstances, setWindowInstances] = useState<Partial<Record<registryKey, WindowInstance>>>({})

    const desktopRef = useRef<HTMLDivElement>(null)

    const updateWindow = (id: registryKey, updates: Partial<WindowInstance>) => setWindowInstances(prev => ({ ...prev, [id]: { ...prev[id]!, ...updates, } }))

    const closeWindow = (id: registryKey) => setWindowInstances(prev => {
        const next = { ...prev };
        delete next[id];
        return next;
    });

    const focusWindow = (id: registryKey) => setWindowInstances(prev => {
        const highestZ = Math.max(...Object.values(prev).map(window => window.zIndex), 0);
        if (prev[id]?.zIndex === highestZ) return prev;
        return { ...prev, [id]: { ...prev[id]!, zIndex: highestZ + 1, } };
    });

    const openOrShowWindow = (id: registryKey, data?: windowData) => setWindowInstances(prev => {
        const next = { ...prev }
        const highestZ = Math.max(...Object.values(prev).map(window => window.zIndex), 0) + 1;

        if (!next[id]) {
            const bounds: WindowBounds = { x: 100, y: 100, width: 1000, height: 700 }
            next[id] = { id: id, bounds: bounds, previousBounds: bounds, minimized: false, maximized: false, zIndex: highestZ, data }
        } else {
            next[id] = {
                ...next[id]!,
                minimized: false,
                zIndex: highestZ,
                data: data ?? next[id]!.data,
            };
        }

        return next
    })

    return (
        <div>
            <div className="desktop-area" ref={desktopRef}>
                <DesktopFileManager openOrShowWindow={openOrShowWindow} />

                {Object.entries(windowInstances).map(([id, instance]) => {
                    const Component = windowRegistry[id as registryKey];

                    if (!Component) return null;
                    return (
                        <div key={id} style={{ position: "absolute", zIndex: instance.zIndex, pointerEvents: "auto" }} onMouseDown={() => focusWindow(id as registryKey)}>
                            <Component {...instance} desktopRef={desktopRef} updateWindow={updateWindow} closeWindow={closeWindow} />
                        </div>
                    )
                })}
            </div>

            <Dock openOrShowWindow={openOrShowWindow} openWindows={windowInstances} />
        </div>
    )
}

export default WindowManager