import { useState } from "react";
import "../css/Window.css";
import { motion } from "framer-motion";

interface WindowProps {
    title?: string;
    minimized: boolean;
    maximized: boolean;
    children?: React.ReactNode;
    onMinimize: () => void;
    onMaximize: () => void;
    onClose?: () => void;
}

function Window({ title, children, minimized, maximized, onMinimize, onMaximize, onClose }: WindowProps) {
    return (
        <motion.div
            className="window"
            animate={{
                scale: minimized ? 0.1 : 1,
                opacity: minimized ? 0 : 1,
                y: minimized ? 400 : 0,
                borderRadius: maximized ? 0 : 12
            }}
            transition={{
                type: "spring",
                stiffness: 300,
                damping: 25
            }}>
            <div className="window-header">
                <div className="traffic-lights">
                    <button className="close" onClick={onClose} />
                    <button className="minimize" onClick={onMinimize}/>
                    <button className="maximize" onClick={onMaximize} />
                </div>

                <span>{title}</span>
            </div>

            <div className="window-content">
                {children}
            </div>
        </motion.div>
    );
}

export default Window