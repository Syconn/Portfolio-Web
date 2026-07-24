import { useState } from "react";
import "../css/Window.css";

interface WindowProps {
    title?: string;
    children?: React.ReactNode;
    onMaximize?: (maximized: boolean) => void;
    onClose?: () => void;
}

function Window({ title, children, onMaximize, onClose }: WindowProps) {
    const [minimized, setMinimized] = useState(false);
    const [maximized, setMaximized] = useState(false);

    const handleMinimize = () => { // TODO: This should hide the window actually
        // setMaximized(false)
        setMinimized(!minimized);
    };

    const handleMaximize = () => {
        const newState = !maximized;
        // setMinimized(false)
        setMaximized(newState);
        onMaximize?.(newState);
    };

    return (
        <div className="window">
            <div className="window-header">
                <div className="traffic-lights">
                    <button className="close" onClick={onClose} />
                    <button className="minimize" onClick={handleMinimize} />
                    <button className="maximize" onClick={handleMaximize} />
                </div>

                <span>{title}</span>
            </div>

            <div className="window-content">
                {children}
            </div>
        </div>
    );
}

export default Window