import { useEffect, useState } from "react";
import wallpaper0 from "./assets/background/wallpaper0.jpg";
import wallpaper1 from "./assets/background/wallpaper1.png";
import wallpaper2 from "./assets/background/wallpaper2.png";
import wallpaper3 from "./assets/background/wallpaper3.png";
import wallpaper4 from "./assets/background/wallpaper4.jpg";
import WindowManager, { type registryKey } from "./components/Windows/WindowManager";
import "./css/Desktop.css";
import { defaultSettings } from "./util/data";
import type { MacSettings, WindowData } from "./util/types";

export const wallpapers = [wallpaper0, wallpaper1, wallpaper2, wallpaper3, wallpaper4];

function Desktop() {
    const [requestedWindow, setRequestedWindow] = useState<{window: registryKey, data?: WindowData}[]>([])
    const [shutdown, setShutdown] = useState(false);
    const [restart, setRestart] = useState(false);
    const [desktopHidden, setDesktopHidden] = useState(false);
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");
    const [battery] = useState(Math.floor(Math.random() * (100 - 20 + 1)) + 20);
    const [settings, setSettings] = useState<MacSettings>(() => {
        const saved = localStorage.getItem("settings");
        return saved ? JSON.parse(saved) : defaultSettings
    })

    const updateClock = (timezone: string) => {
        const now = new Date();

        const time = new Intl.DateTimeFormat("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
            timeZone: timezone,
        }).format(now);

        const date = new Intl.DateTimeFormat("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            year: "numeric",
            timeZone: timezone,
        }).format(now);

        setTime(time);
        setDate(date);
    }

    useEffect(() => {
        document.documentElement.classList.toggle("dark-mode", settings.darkMode);
    }, [settings.darkMode]);

    useEffect(() => {
        wallpapers.forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, []);

    useEffect(() => {
        updateClock(settings.timezone);
        const interval = setInterval(() => updateClock(settings.timezone), 1000);
        return () => clearInterval(interval);
    }, [settings.timezone]);

    const handleRestart = () => {
        setDesktopHidden(true);

        setTimeout(() => {
            setRestart(true);
            setTimeout(() => {
                setRestart(false);
                setDesktopHidden(false);
            }, 500);
        }, 500);
    };

    const handleShutdown = () => {
        setDesktopHidden(true);
        setTimeout(() => setShutdown(true), 500);
    };

    const changeSetting = <K extends keyof MacSettings>(setting: K, value: MacSettings[K]) => setSettings(prev => {
        const next = { ...prev, [setting]: value };
        localStorage.setItem("settings", JSON.stringify(next));
        return next;
    });

    return (
        <div className="screen" style={{ backgroundImage: `url(${wallpapers[settings.wallpaper]})` }}>
            {shutdown && (
                <div id="shutdownScreen">
                    <img id="lockGif" src="./src/assets/background/lock.gif" alt="Shutting down" />
                </div>
            )}

            {restart && <div id="restartScreen" />}

            <div className={`desktop ${desktopHidden ? "desktop-hidden" : ""}`}>
                <div className="navbar">
                    <ul>
                        <li className="leftLi logo">
                            <img src="./src/assets/icon/apple-white.png" alt="Apple logo" />
                            <ul>
                                <li>
                                    <button><a href="https://github.com/Syconn/Portfolio-Web" target="_blank">About This Portfolio</a></button>
                                </li>
                                <li>
                                    <button onClick={() => setRequestedWindow(prev => [...prev, { window: "settings" }])}>Change Background</button>
                                </li>
                                <li>
                                    <button onClick={handleRestart}>Restart</button>
                                    <button onClick={handleShutdown}>Shut Down</button>
                                </li>
                            </ul>
                        </li>
                        <li className="leftLi hidden">File</li>
                        <li className="leftLi hidden">Edit</li>
                        <li className="leftLi hidden">View</li>
                        <li className="leftLi hidden">Go</li>
                        <li className="leftLi hidden">Window</li>
                        <li className="leftLi">Help</li> {/* Have this load safari to the instuction page */}
                    </ul>

                    <ul className="navbar__right">
                        <li className="battery hidden"> {/* TODO ADDIN HTML FUNCTIONALITY */}
                            <span className="battery__text hidden">{battery}%</span>
                            <div className="battery__container hidden">
                                <div className="battery__progress hidden">
                                    <img className="is-charging" src="./src/assets/icon/charging.png" alt="Battery is charging" />
                                </div>
                            </div>

                            <div className="battery__popup">
                                <header>
                                    <h3>Battery</h3>
                                    <span />
                                </header>
                                <p>Power Source: <span className="power-source">Battery</span></p>
                            </div>
                        </li>
                        <li className="wifi">
                            <svg width="24" height="24">
                                <path d="M12 6c3.537 0 6.837 1.353 9.293 3.809l1.414-1.414C19.874 5.561 16.071 4 12 4 7.929 4.001 4.126 5.561 1.293 8.395l1.414 1.414C5.163 7.353 8.463 6 12 6zM17.671 14.307c-3.074-3.074-8.268-3.074-11.342 0l1.414 1.414c2.307-2.307 6.207-2.307 8.514 0L17.671 14.307z" />
                                <path d="M20.437,11.293c-4.572-4.574-12.301-4.574-16.873,0l1.414,1.414c3.807-3.807,10.238-3.807,14.045,0L20.437,11.293z" />
                                <circle cx="12" cy="18" r="2" />
                            </svg>
                        </li>
                        <li className="open_Search">
                            <svg width="20" height="20">
                                <path d="M10,18c1.846,0,3.543-0.635,4.897-1.688l4.396,4.396l1.414-1.414l-4.396-4.396C17.365,13.543,18,11.846,18,10 c0-4.411-3.589-8-8-8s-8,3.589-8,8S5.589,18,10,18z M10,4c3.309,0,6,2.691,6,6s-2.691,6-6,6s-6-2.691-6-6S6.691,4,10,4z" />
                            </svg>
                        </li>
                        <li className="open_control hidden">
                            <img src="./src/assets/icon/control_center.gif" className="control-center" alt="controlCenter" />
                        </li>
                        <li className="clock">
                            <span id="date" className="hidden">{date}</span>
                            <span id="clock">{time}</span>
                        </li>
                    </ul>
                </div>

                <WindowManager requestedWindows={requestedWindow} clearCache={setRequestedWindow} settings={settings} changeSettings={changeSetting} />
            </div>
        </div>
    )
}

export default Desktop