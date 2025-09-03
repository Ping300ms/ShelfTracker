import { IoCheckmark } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import "./SuccessBox.css";

export function SuccessBox() {
    const navigate = useNavigate();

    return (
        <div className="card" style={{ backgroundColor: "var(--secondary-success-color)" }}>
            <div className="success-box__content">
                <IoCheckmark size={24} color="black" />
                <p>Réservation confirmée</p>
                <button className="success-box__home-btn" onClick={() => navigate("/ShelfTracker")}>
                    Retour à l'accueil
                </button>
            </div>
        </div>
);
}
