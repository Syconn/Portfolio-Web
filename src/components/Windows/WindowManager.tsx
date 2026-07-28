import { useEffect, useRef, useState } from "react";
import DesktopFileManager from "../DesktopFileManager";
import Dock from "../Dock";
import SafariWindow from "./SafariWindow";
import type { WindowBounds, WindowInstance } from "./Window";
import PDFWindow from "./PDFWindow";
import type { MacSettings, WindowData } from "../../util/types";
import ContactWindow from "./ContactWindow";
import SettingsWindow from "./SettingsWindow";

const windowRegistry = {
    safari: SafariWindow,
    pdf: PDFWindow,
    contact: ContactWindow,
    settings: SettingsWindow,
}

export type registryKey = keyof typeof windowRegistry

function WindowManager({ requestedWindows, clearCache, settings, changeSettings }: 
    { requestedWindows: {window: registryKey, data?: WindowData }[], clearCache: (data: {window: registryKey, data?: WindowData }[]) => void, settings: MacSettings, changeSettings: <K extends keyof MacSettings>(setting: K, value: MacSettings[K]) => void }) {
    const [windowInstances, setWindowInstances] = useState<Partial<Record<registryKey, WindowInstance>>>({})

    useEffect(() => {
        if (!requestedWindows.length) return
        requestedWindows.forEach(v => openOrShowWindow(v.window, v.data))
        clearCache([])
    }, [requestedWindows])

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

    const openOrShowWindow = (id: registryKey, data?: WindowData) => setWindowInstances(prev => {
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
                    const zIndex = instance.minimized ? -1000 : instance.zIndex

                    if (!Component) return null;
                    return (
                        <div key={id} style={{ position: "absolute", zIndex: zIndex, pointerEvents: "auto" }} onMouseDown={() => focusWindow(id as registryKey)}>
                            <Component {...instance} desktopRef={desktopRef} updateWindow={updateWindow} closeWindow={closeWindow} data={{ ...instance.data, settings: settings, changeSetting: changeSettings}}/>
                        </div>
                    )
                })}

                <Dock openOrShowWindow={openOrShowWindow} openWindows={windowInstances} />
            </div>
        </div>
    )
}

export default WindowManager