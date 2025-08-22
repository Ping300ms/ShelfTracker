import {IoCube, IoRemove} from "react-icons/io5";
import type { Equipment } from "../../types/Equipment.ts";
import "../../styles/EquipmentCard.css";
import { useCart } from "../../hooks/CartHook.ts";

interface EquipmentCardProps {
    equipment: Equipment;
}

export const CartCard: React.FC<EquipmentCardProps> = ({ equipment }) => {
    const { removeFromCart } = useCart();

    return (
        <div className="equipment-card">
            {/* Icône / logo par défaut */}
            <div className="equipment-icon">
                <IoCube size={28} />
            </div>

            {/* Infos principales */}
            <div className="equipment-info">
                <p className="equipment-name">{equipment.name}</p>
                <p className="equipment-location">
                    {equipment.location ?? "Emplacement inconnu"}
                </p>
            </div>

            {/* Bouton ajouter au panier */}
            <button
                className="equipment-add-btn"
                onClick={() => removeFromCart(equipment.id)}
            >
                <IoRemove size={28} color="red" />
            </button>
        </div>
    );
};
