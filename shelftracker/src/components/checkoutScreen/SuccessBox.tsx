import { IoCheckmark } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export function SuccessBox() {
    const navigate = useNavigate();

    return (
        <div className="success-box">
        <div className="success-box-text">
        <IoCheckmark size={24} color="black" />
        <p>Réservation confirmée</p>
    <button className="back-home-button" onClick={() => navigate("/ShelfTracker")}>
    Retour à l'accueil
    </button>
    </div>
    </div>
);
}
