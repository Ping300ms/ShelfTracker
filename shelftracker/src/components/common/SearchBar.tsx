// src/components/common/SearchBar.tsx
import { useEffect, useState } from "react";
import "./SearchBar.css";

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
    typeFilter: string;
    setTypeFilter: (filter: string) => void;
}

const TYPES = [
    "Tous",
    "Sac",
    "Lumière",
    "Flash",
    "Stabilisateur",
    "Pied",
    "Objectif",
    "Filtre",
    "Retour vidéo",
    "Accessoire caméra",
    "Son",
    "Grip",
    "Alimentation",
    "Autre",
];

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, typeFilter, setTypeFilter }) => {
    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > lastScrollY) setVisible(false);
            else setVisible(true);
            setLastScrollY(currentScrollY);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <div className={`search-bar__container ${visible ? "visible" : "hidden"}`}>
            <input
                type="text"
                className="search-bar__input"
                placeholder="Rechercher un équipement..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />

            <select
                className="search-bar__filter"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
            >
                {TYPES.map((type) => (
                    <option key={type} value={type}>
                        {type}
                    </option>
                ))}
            </select>
        </div>
    );
};
