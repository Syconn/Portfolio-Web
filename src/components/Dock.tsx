import { useState } from "react";
import type { registryKey } from "./Windows/WindowManager";
import type { WindowInstance } from "./Windows/Window";

function Dock({ openOrShowWindow, openWindows }: { openOrShowWindow: (id: registryKey) => void, openWindows: Partial<Record<"safari", WindowInstance>> }) {

    const [bouncingIcon, setBouncingIcon] = useState<number | null>(null);

    const bounceIcon = (index: number, window?: registryKey) => {
        setBouncingIcon(index);
        setTimeout(() => {
            setBouncingIcon(null)
            if (window) openOrShowWindow(window)
        }, 800);
    };

    return (
        <div className="dock">
            <button className={`icon hidden ${bouncingIcon === 0 ? "bounce" : ""}`} onClick={() => bounceIcon(0)}>
                <img src="./src/assets/icon/dock/finder.png" alt="Finder Logo" className="hidden" />
            </button>
            <button className={`icon ${bouncingIcon === 1 ? "bounce" : ""}`} onClick={() => bounceIcon(1, "safari")}>
                <img src="./src/assets/icon/dock/safari.png" alt="Safari Logo" />
                {"safari" in openWindows && <hr className="point" /> }
            </button>
            <button className={`icon hidden ${bouncingIcon === 2 ? "bounce" : ""}`} onClick={() => bounceIcon(2)}>
                <img src="./src/assets/icon/dock/appstore.png" alt="App Store Logo" />
            </button>
            <button className={`icon hidden ${bouncingIcon === 3 ? "bounce" : ""}`} onClick={() => bounceIcon(3)}>
                <img src="./src/assets/icon/dock/music.png" alt="Music Logo" />
            </button>
            <button className={`icon hidden open-vscode ${bouncingIcon === 4 ? "bounce" : ""}`} onClick={() => bounceIcon(4)}>
                <img src="./src/assets/icon/dock/vscode.svg" alt="Vscode apps" className="hidden" />
            </button>
            <button className={`icon ${bouncingIcon === 5 ? "bounce" : ""}`} onClick={() => bounceIcon(5)}>
                <img src="./src/assets/icon/dock/photos.png" alt="Photos Logo" className="hidden" />
            </button>
            <button className={`icon hidden ${bouncingIcon === 6 ? "bounce" : ""}`} onClick={() => bounceIcon(6)}>
                <img src="./src/assets/icon/dock/terminal.png" alt="Terminal Logo" className="hidden" />
            </button>
            <button className={`icon ${bouncingIcon === 7 ? "bounce" : ""}`} onClick={() => bounceIcon(7)}>
                <img src="./src/assets/icon/dock/preferences.png" alt="Preferences Logo" className="hidden" />
            </button>
            <hr className="column hidden" />
            <button className={`icon ${bouncingIcon === 8 ? "bounce" : ""}`} onClick={() => bounceIcon(8)}>
                <img src="./src/assets/icon/dock/bin.png" alt="Trash Bin Logo" className="hidden Trash" />
            </button>
        </div>
    )
}

export default Dock