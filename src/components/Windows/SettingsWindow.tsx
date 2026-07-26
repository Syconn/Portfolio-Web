import { FaCog, FaGlobeAmericas, FaImage, FaMoon, FaSafari } from "react-icons/fa";
import Window, { type WindowInstance, type WindowManager } from "./Window";
import { wallpapers } from "../../Desktop";
import { useEffect } from "react";

type SettingRowProps = {
    icon: React.ReactNode;
    title: string;
    subtitle: string;
    children: React.ReactNode;
};


function SettingsWindow(instance: WindowInstance & WindowManager) {
    const settings = instance.data?.settings
    const changeSetting = instance.data?.changeSetting

    useEffect(() => {
        wallpapers.forEach((src) => {
            const img = new Image();
            img.src = src;
        });
    }, []);

    return (
        <Window {...instance} header={<span className="settings-header-title">System Settings</span>}>
            <div className="settings-content">

                <div className="settings-title">
                    <div className="settings-title-icon">
                        <FaCog size={34} strokeWidth={2.2} />
                    </div>

                    <div>
                        <h2>System Settings</h2>
                        <span>Customize your portfolio desktop.</span>
                    </div>
                </div>

                <div className="settings-card">
                    {(settings && changeSetting) && (
                        <div>
                            <SettingRow icon={<FaGlobeAmericas />} title="Region" subtitle="Timezone" >
                                <select value={settings.timezone} onChange={(e) => changeSetting("timezone", e.target.value)}>
                                    <option value="America/New_York">
                                        Eastern Time (US)
                                    </option>

                                    <option value="America/Chicago">
                                        Central Time (US)
                                    </option>

                                    <option value="America/Denver">
                                        Mountain Time (US)
                                    </option>

                                    <option value="America/Los_Angeles">
                                        Pacific Time (US)
                                    </option>

                                    <option value="America/Anchorage">
                                        Alaska Time (US)
                                    </option>

                                    <option value="Pacific/Honolulu">
                                        Hawaii Time (US)
                                    </option>

                                    <option value="Europe/London">
                                        London
                                    </option>

                                    <option value="Europe/Paris">
                                        Central Europe
                                    </option>

                                    <option value="Asia/Tokyo">
                                        Tokyo
                                    </option>

                                    <option value="Asia/Shanghai">
                                        Shanghai
                                    </option>

                                    <option value="Asia/Kolkata">
                                        India
                                    </option>

                                    <option value="Australia/Sydney">
                                        Sydney
                                    </option>

                                    <option value="UTC">
                                        UTC
                                    </option>
                                </select>
                            </SettingRow>

                            <SettingRow icon={<FaMoon />} title="Appearance" subtitle="Dark Mode">
                                <Toggle checked={settings.darkMode} setChecked={(checked) => changeSetting("darkMode", checked)} />
                            </SettingRow>

                            <SettingRow icon={<FaSafari />} title="Browser" subtitle="Open links in Web App">
                                <Toggle checked={settings.openInWebApp} setChecked={(checked) => changeSetting("openInWebApp", checked)} />
                            </SettingRow>

                            <SettingRow icon={<FaImage />} title="Desktop" subtitle="Wallpaper">
                                <div className="wallpaper-picker">
                                    {wallpapers.map((wallpaper, index) => (
                                        <button key={index} className={`wallpaper-option ${settings.wallpaper === index ? "selected" : ""}`} onClick={() => changeSetting("wallpaper", index)}>
                                            <img
                                                src={wallpaper}
                                                alt={`Wallpaper ${index + 1}`}
                                                loading="lazy"
                                            />
                                        </button>
                                    ))}
                                </div>
                            </SettingRow>
                        </div>
                    )}
                </div>
            </div>
        </Window>
    );
}

function SettingRow({ icon, title, subtitle, children }: SettingRowProps) {
    return (
        <div className="setting-row">

            <div className="setting-left">
                <div className="setting-icon">
                    {icon}
                </div>

                <div>
                    <div className="setting-title">{title}</div>
                    <div className="setting-subtitle">{subtitle}</div>
                </div>
            </div>

            {children}
        </div>
    );
}

function Toggle({ checked, setChecked }: { checked: boolean, setChecked: (check: boolean) => void }) {
    return (
        <label className="switch">
            <input type="checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} />
            <span className="slider" />
        </label>
    );
}

export default SettingsWindow