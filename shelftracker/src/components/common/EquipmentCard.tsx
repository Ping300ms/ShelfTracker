import {IoCube, IoAdd, IoRemove} from "react-icons/io5";
import type { Equipment } from "../../types/Equipment.ts";
import "../../styles/EquipmentCard.css";
import { useCart } from "../../hooks/CartHook.ts";

interface EquipmentCardProps {
    equipment: Equipment;
    addedToCard: boolean;
}

export const EquipmentCard: React.FC<EquipmentCardProps> = ({ equipment, addedToCard }) => {
    const { addToCart, removeFromCart } = useCart();

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



            <button
                className="equipment-add-btn"
                onClick={addedToCard ? () => removeFromCart(equipment.id) : () => addToCart(equipment) }
            >
                {addedToCard ? <IoRemove size={28} color="red" /> : <IoAdd size={28} color="lightgreen" />}
            </button>
        </div>
    );
};
