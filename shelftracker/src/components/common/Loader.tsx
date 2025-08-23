// src/components/common/Loader.tsx
import "../../styles/Loader.css";

export const Loader = () => {
    return (
        <div className="loader-container">
            <div className="loader"></div>
            <p>Chargement...</p>
        </div>
    );
};
