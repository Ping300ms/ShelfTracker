// src/components/common/TopBar.tsx
import {IoChevronBack} from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./TopBar.css";

interface TopBarProps {
    title: string;
    backPath?: string; // optionnel : chemin précis où retourner
    cantGoBack?: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ title, backPath, cantGoBack }) => {
    const navigate = useNavigate();

    const handleBack = () => {
        if (backPath) {
            navigate(backPath);
        } else {
            navigate(-1); // retour en arrière par défaut
        }
    };

    return (
        <header className="top-bar__container">
            {!cantGoBack &&
                <button className="top-bar__back-btn" onClick={handleBack} aria-label="Retour">
                    <IoChevronBack size={24} />
                </button>}

            <h1 className="top-bar__title">{title}</h1>
            <div className="top-bar__spacer" /> {/* pour équilibrer le layout */}
        </header>
    );
};

export default TopBar;
