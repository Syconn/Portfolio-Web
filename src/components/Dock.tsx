import { useState } from "react";
import type { WindowData } from "../util/types";
import type { WindowInstance } from "./Windows/Window";
import type { registryKey } from "./Windows/WindowManager";

function Dock({ openOrShowWindow, openWindows }: { openOrShowWindow: (id: registryKey, data?: WindowData) => void, openWindows: Partial<Record<"safari", WindowInstance>> }) {
    const [bouncingIcon, setBouncingIcon] = useState<number | null>(null);

    const bounceIcon = (index: number, window?: registryKey, data?: WindowData) => {
        setBouncingIcon(index);
        setTimeout(() => {
            setBouncingIcon(null)
            if (window) openOrShowWindow(window, data)
        }, 800);
    };

    return (
        <div className="dock">
            <button className={`icon hidden ${bouncingIcon === 0 ? "bounce" : ""}`} onClick={() => bounceIcon(0)}>
                <img src="./src/assets/icon/dock/finder.png" alt="Finder Logo" className="hidden" />
            </button>
            <button className={`icon ${bouncingIcon === 1 ? "bounce" : ""}`} onClick={() => bounceIcon(1, "safari")}>
                <img src="./src/assets/icon/dock/safari.png" alt="Safari Logo" />
                {"safari" in openWindows && <hr className="point" />}
            </button>
            <button className={`icon ${bouncingIcon === 4 ? "bounce" : ""}`} onClick={() => bounceIcon(4, "contact")}>
                <img src="./src/assets/icon/dock/mail.png" alt="Mail Logo" />
                {"contact" in openWindows && <hr className="point" />}
            </button>
            <button className={`icon hidden ${bouncingIcon === 2 ? "bounce" : ""}`} onClick={() => bounceIcon(2)}>
                <img src="./src/assets/icon/dock/appstore.png" alt="App Store Logo" />
            </button>
            <button className={`icon hidden ${bouncingIcon === 3 ? "bounce" : ""}`} onClick={() => bounceIcon(3)}>
                <img src="./src/assets/icon/dock/music.png" alt="Music Logo" />
            </button>
            <button className={`icon ${bouncingIcon === 5 ? "bounce" : ""}`} onClick={() => bounceIcon(5)}>
                <img src="./src/assets/icon/dock/photos.png" alt="Photos Logo" className="hidden" />
            </button>
            <button className={`icon hidden ${bouncingIcon === 6 ? "bounce" : ""}`} onClick={() => bounceIcon(6)}>
                <img src="./src/assets/icon/dock/terminal.png" alt="Terminal Logo" className="hidden" />
            </button>
            <button className={`icon ${bouncingIcon === 7 ? "bounce" : ""}`} onClick={() => bounceIcon(7, "settings")}>
                <img src="./src/assets/icon/dock/preferences.png" alt="Preferences Logo" className="hidden" />
                {"settings" in openWindows && <hr className="point" />}
            </button>
            <hr className="column hidden" />
            <button className={`icon ${bouncingIcon === 8 ? "bounce" : ""}`} onClick={() => bounceIcon(8)}>
                <img src="./src/assets/icon/dock/bin.png" alt="Trash Bin Logo" className="hidden Trash" />
            </button>
        </div>
    )
}

export default Dock