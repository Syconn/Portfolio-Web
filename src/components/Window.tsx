import { motion } from "framer-motion";
import { useEffect, type RefObject } from "react";
import { Rnd } from "react-rnd";
import "../css/Window.css";
import type { registryKey } from "./WindowManager";

export type WindowBounds = {
    x: number
    y: number
    width: number
    height: number
};

export type WindowInstance = {
    id: registryKey
    bounds: WindowBounds
    previousBounds: WindowBounds
    minimized: boolean
    maximized: boolean
    zIndex: number
};

export type WindowManager = {
    desktopRef: RefObject<HTMLDivElement | null>
    updateWindow: ( id: registryKey, updates: Partial<WindowInstance>) => void
}

function Window({ id, bounds, previousBounds, minimized, maximized, desktopRef, updateWindow }: WindowInstance & WindowManager) {
    useEffect(() => {
        const centerWindow = () => {
            if (!desktopRef.current) return;

            const rect = desktopRef.current.getBoundingClientRect();
            const width = rect.width * 0.9;
            const height = rect.height * 0.85;
            updateWindow(id, { bounds: {x: (rect.width - width) / 2, y: (rect.height - height) / 2, width, height }})
        };

        centerWindow();
        window.addEventListener("resize", centerWindow);
        return () => window.removeEventListener("resize", centerWindow);
    }, []);

    const handleMaximize = () => {
        if (!desktopRef.current) return;

        if (!maximized) updateWindow(id, { previousBounds: bounds, bounds: { x: 0, y: 0, width: desktopRef.current.clientWidth, height: desktopRef.current.clientHeight }})
        else updateWindow(id, { bounds: previousBounds });

        updateWindow(id, { maximized: !maximized });
    };

    const handleMinimize = () => updateWindow(id, { minimized: true });

    return (
        <>
            {!minimized && (
                <Rnd
                    size={{ width: bounds.width, height: bounds.height }}
                    position={{ x: bounds.x, y: bounds.y }}
                    disableDragging={maximized}
                    minWidth={600}
                    minHeight={400}
                    onDragStop={(_e, data) => updateWindow(id, { bounds: { ...bounds, x: data.x, y: data.y }})}
                    onResizeStop={(_e, _dir, ref, _d, position) => updateWindow(id, { bounds: { x: position.x, y: position.y, width: ref.offsetWidth, height: ref.offsetHeight }})}
                    bounds=".desktop-area"
                    resizeHandleClasses={{
                        top: "resize-handle top",
                        right: "resize-handle right",
                        bottom: "resize-handle bottom",
                        left: "resize-handle left",
                        topRight: "resize-handle corner",
                        topLeft: "resize-handle corner",
                        bottomRight: "resize-handle corner",
                        bottomLeft: "resize-handle corner",
                    }}>
                    <motion.div
                        className="window"
                        animate={{ scale: minimized ? 0.1 : 1, opacity: minimized ? 0 : 1, y: minimized ? 400 : 0, borderRadius: maximized ? 0 : 12 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}>
                        <div className="window-header">
                            <div className="traffic-lights">
                                <button className="close" />
                                <button className="minimize" onClick={handleMinimize} />
                                <button className="maximize" onClick={handleMaximize} />
                            </div>

                            {/* {header} */}
                        </div>

                        <div className="window-content">
                            {/* {children} */}
                        </div>
                    </motion.div>
                </Rnd>
            )}
        </>
    );
}

export default Window