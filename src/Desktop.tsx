import { useEffect, useRef, useState } from "react";
import "./css/Desktop.css"
import wallpaper0 from "./assets/background/wallpaper0.jpg";
import wallpaper1 from "./assets/background/wallpaper1.png";
import wallpaper2 from "./assets/background/wallpaper2.png";
import wallpaper3 from "./assets/background/wallpaper3.png";
import wallpaper4 from "./assets/background/wallpaper4.jpg";
import Window from "./components/Window";
import { Rnd } from "react-rnd";

function Desktop() {
    const [wallpaperId, setWallpaperId] = useState(() => {
        const saved = localStorage.getItem("wallpaper");
        return saved ? Number(saved) : 0;
    });
    const [shutdown, setShutdown] = useState(false);
    const [restart, setRestart] = useState(false);
    const [desktopHidden, setDesktopHidden] = useState(false);
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");
    const [battery] = useState(Math.floor(Math.random() * (100 - 20 + 1)) + 20);
    const [bouncingIcon, setBouncingIcon] = useState<number | null>(null);
    const [windowPosition, setWindowPosition] = useState({ x: 0, y: 0 });
    const [windowSize, setWindowSize] = useState({ width: 1000, height: 700 });

    const desktopRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        wallpapers.forEach((src) => {
            const img = new Image();
            img.src = src;
        });

        const centerWindow = () => {
            if (!desktopRef.current) return;

            const rect = desktopRef.current.getBoundingClientRect();
            const width = rect.width * 0.9;
            const height = rect.height * 0.85;
            setWindowSize({ width, height })
            setWindowPosition({ x: (rect.width - width) / 2, y: (rect.height - height) / 2 });
        };

        centerWindow();
        window.addEventListener("resize", centerWindow);
        return () => window.removeEventListener("resize", centerWindow);
    }, []);

    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            let hour = now.getHours();
            const minute = String(now.getMinutes()).padStart(2, "0");
            const ampm = hour >= 12 ? "PM" : "AM";
            hour = hour % 12 || 12;

            setTime(`${hour}:${minute} ${ampm}`);
            setDate(now.toDateString());
        };

        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, []);

    const nextWallpaper = () => {
        setWallpaperId((prev) => {
            const next = (prev + 1) % wallpapers.length;
            localStorage.setItem("wallpaper", String(next));
            return next;
        });
    };

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

    const bounceIcon = (index: number) => {
        setBouncingIcon(index);
        setTimeout(() => setBouncingIcon(null), 800);
    };

    const wallpapers = [wallpaper0, wallpaper1, wallpaper2, wallpaper3, wallpaper4];

    const animateValue = (from: number, to: number, duration: number, setter: (value: number) => void) => {
        const start = performance.now();
        const animate = (time: number) => {
            const elapsed = time - start;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            setter(from + (to - from) * eased);
            if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    };

    const [maximized, setMaximized] = useState(false);

    const savedWindow = useRef({
        width: 800,
        height: 600,
        x: 0,
        y: 0,
    });

    const handleMaximize = () => {
        if (!desktopRef.current) return;

        const desktop = desktopRef.current.getBoundingClientRect();
        if (!maximized) {
            savedWindow.current = {
                width: windowSize.width,
                height: windowSize.height,
                x: windowPosition.x,
                y: windowPosition.y,
            };

            // Animate to fullscreen
            animateValue(windowPosition.x, 0, 350, (v) => setWindowPosition(prev => ({ ...prev, x: v })));

            animateValue(
                windowPosition.y,
                0,
                350,
                (v) => setWindowPosition(prev => ({ ...prev, y: v }))
            );

            animateValue(
                windowSize.width,
                desktop.width,
                350,
                (v) => setWindowSize(prev => ({ ...prev, width: v }))
            );

            animateValue(
                windowSize.height,
                desktop.height,
                350,
                (v) => setWindowSize(prev => ({ ...prev, height: v }))
            );
        }
        else {
            // Restore previous size
            animateValue(
                windowPosition.x,
                savedWindow.current.x,
                350,
                (v) => setWindowPosition(prev => ({ ...prev, x: v }))
            );

            animateValue(
                windowPosition.y,
                savedWindow.current.y,
                350,
                (v) => setWindowPosition(prev => ({ ...prev, y: v }))
            );

            animateValue(
                windowSize.width,
                savedWindow.current.width,
                350,
                (v) => setWindowSize(prev => ({ ...prev, width: v }))
            );

            animateValue(
                windowSize.height,
                savedWindow.current.height,
                350,
                (v) => setWindowSize(prev => ({ ...prev, height: v }))
            );
        }

        setMaximized(!maximized);
    };

    return (
        <div className="screen" style={{ backgroundImage: `url(${wallpapers[wallpaperId]})` }}>
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
                                    <button onClick={nextWallpaper}>Change Background</button>
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

                <div className="desktop-area" ref={desktopRef}>
                    <Rnd
                        // size={maximized ? {
                        //     width: "100%",
                        //     height: "100%"
                        // } : windowSize}
                        // position={maximized ? {
                        //     x: 0,
                        //     y: 0
                        // } : windowPosition}
                        size={windowSize}
                        position={windowPosition}
                        minWidth={600}
                        minHeight={400}
                        onDragStop={(_e, data) => setWindowPosition({ x: data.x, y: data.y, })}
                        onResizeStop={(_e, _dir, ref, _d, position) => {
                            setWindowSize({ width: ref.offsetWidth, height: ref.offsetHeight })
                            setWindowPosition({ x: position.x, y: position.y, })
                        }}
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
                        <Window
                            title="Safari"
                            onClose={() => { }}
                            onMaximize={handleMaximize}>

                        </Window>
                    </Rnd>
                </div>

                {/* Docker */}
                <div className="dock">
                    <button className={`icon hidden ${bouncingIcon === 0 ? "bounce" : ""}`} onClick={() => bounceIcon(0)}>
                        <img src="./src/assets/icon/dock/finder.png" alt="Finder Logo" className="hidden" />
                    </button>
                    <button className={`icon ${bouncingIcon === 1 ? "bounce" : ""}`} onClick={() => bounceIcon(1)}>
                        <img src="./src/assets/icon/dock/safari.png" alt="Safari Logo" />
                        <hr className="point" /> {/* TODO show dot */}
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
            </div>
        </div>
    )
}

export default Desktop