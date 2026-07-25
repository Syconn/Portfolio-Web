import { useRef, useState } from "react";
import Dock from "./Dock";
import SafariWindow from "./SafariWindow";
import type { WindowBounds, WindowInstance } from "./Window";

const windowRegistry = {
    safari: SafariWindow,
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

    const openOrShowWindow = (id: registryKey) => setWindowInstances(prev => {
        const next = { ...prev }
        let highestZ = Math.max(...Object.values(prev).map(window => window.zIndex), 0);

        if (!next[id]) {
            highestZ++;
            const bounds: WindowBounds = { x: 100, y: 100, width: 1000, height: 700 }
            next[id] = { id: id, bounds: bounds, previousBounds: bounds, minimized: false, maximized: false, zIndex: highestZ }
        } else {
            highestZ++;
            next[id].minimized = false;
            next[id].zIndex = highestZ;
        }

        return next
    })

    return (
        <>
            <div className="desktop-area" ref={desktopRef}>
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
        </>
    )
}

export default WindowManager