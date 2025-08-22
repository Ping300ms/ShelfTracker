// src/components/homeScreen/SearchBar.tsx
import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import "../../styles/SearchBar.css";

interface SearchBarProps {
    value: string;
    onChange: (value: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                setVisible(false); // scroll down → cache
            } else {
                setVisible(true); // scroll up → montre
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <div className={`search-bar ${visible ? "show" : "hide"}`}>
            <input
                type="text"
                placeholder="Rechercher un équipement..."
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            <IoSearch size={20} className="search-icon" />
        </div>
    );
};
