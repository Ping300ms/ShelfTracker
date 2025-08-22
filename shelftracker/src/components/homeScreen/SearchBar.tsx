import { useEffect, useState } from "react";

interface SearchBarProps {
    onSearch: (query: string) => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState("");
    const [visible, setVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > lastScrollY && currentScrollY > 50) {
                // vers le bas → cache
                setVisible(false);
            } else {
                // vers le haut → montre
                setVisible(true);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value);
    };

    return (
        <div className={`searchbar ${visible ? "show" : "hide"}`}>
            <input
                type="text"
                placeholder="Rechercher un équipement..."
                value={query}
                onChange={handleChange}
            />
        </div>
    );
};
