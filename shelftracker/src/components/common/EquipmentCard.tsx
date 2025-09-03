import type { Equipment } from "../../types/Equipment.ts";
import "./EquipmentCard.css";
import { useCart } from "../../hooks/CartHook.ts";

interface EquipmentCardProps {
    equipment: Equipment;
}
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import { typeConfig } from "../../utils/equipmentTypeConfig";
import {IoAdd, IoRemove} from "react-icons/io5";

export const EquipmentCard: React.FC<EquipmentCardProps> = ({ equipment }) => {
    const [addedToCard, setAddedToCart] = useState(false);

    const { addToCart, removeFromCart, cart } = useCart();
    const navigate = useNavigate();

    const type = equipment.type ?? "Autre";
    const { icon: Icon, color } = typeConfig[type] || typeConfig["Autre"];

    useEffect(() => {
        if (cart.find(eq => eq.id === equipment.id)) {
            setAddedToCart(true);
        }
        else {
            setAddedToCart(false);
        }
    }, [cart, equipment.id])

    const handleClick = () => {
        if (addedToCard) {
            removeFromCart(equipment.id);
            return;
        }
        addToCart(equipment);
        setAddedToCart(!addedToCard);
    }

    const handleCardClick = () => {
        navigate(`/ShelfTracker/equipment/${equipment.id}`)
    }

    return (
        <div className="equipment-card__container">
            {/* Icône / logo dynamique */}
            <div className="icon" style={{ background: color }} onClick={handleCardClick}>
                <Icon size={28} />
            </div>

            {/* Infos principales */}
            <div className="equipment-card__info-container" onClick={handleCardClick}>
                <p className="equipment-card__name">
                    <span>{equipment.name}</span>
                </p>
                <p className="equipment-card__location">
                    <span>{equipment.location ?? "Emplacement inconnu"}</span>
                </p>
            </div>

            <button
                className="equipment-card__add-btn"
                onClick={handleClick}
            >
                {addedToCard ? <IoRemove size={28} color="lightcoral" /> : <IoAdd size={28} color="lightgreen" />}
            </button>
        </div>
    );
};
