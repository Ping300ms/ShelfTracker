import { useEffect, useState } from "react";
import "./SettingsTheme.css";

function SettingsTheme() {
    const [darkMode, setDarkMode] = useState<boolean>(() => {
        const stored = localStorage.getItem("darkMode");
        if (stored === null) return true; // <-- sombre par défaut
        return stored === "true";
    });

    useEffect(() => {
        applyTheme(darkMode);
    }, [darkMode]);

    const applyTheme = (enabled: boolean) => {
        const root = document.documentElement;

        if (enabled) {
            root.style.setProperty("--primary-color", "#222222");
            root.style.setProperty("--secondary-color", "#2d2d2d");
            root.style.setProperty("--tertiary-color", "#353535");
            root.style.setProperty("--primary-text-color", "#ffffff");
            root.style.setProperty("--secondary-text-color", "#000000");
            root.style.setProperty("--tertiary-text-color", "#cccccc");
            root.style.setProperty("--success-color", "#aaff98");
        } else {
            root.style.setProperty("--primary-color", "#f5f5f5");
            root.style.setProperty("--secondary-color", "#ffffff");
            root.style.setProperty("--tertiary-color", "#eaeaea");
            root.style.setProperty("--primary-text-color", "#000000");
            root.style.setProperty("--secondary-text-color", "#ffffff");
            root.style.setProperty("--tertiary-text-color", "#333333");
            root.style.setProperty("--success-color", "#48b531");
        }

        localStorage.setItem("darkMode", String(enabled));
    };

    return (
        <div className="card settings-theme__card">
            <h2>Apparence</h2>
            <label className="switch">
                <input
                    type="checkbox"
                    checked={darkMode}
                    onChange={() => setDarkMode(prev => !prev)}
                />
                <span className="slider"></span>
                <span className="label-text">Mode sombre</span>
            </label>
        </div>
    );
}

export default SettingsTheme;
