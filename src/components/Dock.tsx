import { useState } from "react";
import type { WindowData } from "../util/types";
import type { WindowInstance } from "./Windows/Window";
import type { registryKey } from "./Windows/WindowManager";
import finder from "../assets/icon/dock/finder.png"
import safari from "../assets/icon/dock/safari.png"
import mail from "../assets/icon/dock/mail.png"
import appStore from "../assets/icon/dock/appstore.png"
import music from "../assets/icon/dock/music.png"
import photos from "../assets/icon/dock/photos.png"
import terminal from "../assets/icon/dock/terminal.png"
import settings from "../assets/icon/dock/preferences.png"
import bin from "../assets/icon/dock/bin.png"

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
                <img src={finder} alt="Finder Logo" className="hidden" />
            </button>
            <button className={`icon ${bouncingIcon === 1 ? "bounce" : ""}`} onClick={() => bounceIcon(1, "safari")}>
                <img src={safari} alt="Safari Logo" />
                {"safari" in openWindows && <hr className="point" />}
            </button>
            <button className={`icon ${bouncingIcon === 4 ? "bounce" : ""}`} onClick={() => bounceIcon(4, "contact")}>
                <img src={mail} alt="Mail Logo" />
                {"contact" in openWindows && <hr className="point" />}
            </button>
            <button className={`icon hidden ${bouncingIcon === 2 ? "bounce" : ""}`} onClick={() => bounceIcon(2)}>
                <img src={appStore} alt="App Store Logo" className="hidden" />
            </button>
            <button className={`icon hidden ${bouncingIcon === 3 ? "bounce" : ""}`} onClick={() => bounceIcon(3)}>
                <img src={music} alt="Music Logo" className="hidden" />
            </button>
            <button className={`icon ${bouncingIcon === 5 ? "bounce" : ""}`} onClick={() => bounceIcon(5)}>
                <img src={photos} alt="Photos Logo" className="hidden" />
            </button>
            <button className={`icon hidden ${bouncingIcon === 6 ? "bounce" : ""}`} onClick={() => bounceIcon(6)}>
                <img src={terminal} alt="Terminal Logo" className="hidden" />
            </button>
            <button className={`icon ${bouncingIcon === 7 ? "bounce" : ""}`} onClick={() => bounceIcon(7, "settings")}>
                <img src={settings} alt="Preferences Logo" />
                {"settings" in openWindows && <hr className="point" />}
            </button>
            <hr className="column hidden" />
            <button className={`icon ${bouncingIcon === 8 ? "bounce" : ""}`} onClick={() => bounceIcon(8)}>
                <img src={bin} alt="Trash Bin Logo" className="hidden Trash" />
            </button>
        </div>
    )
}

export default Dock