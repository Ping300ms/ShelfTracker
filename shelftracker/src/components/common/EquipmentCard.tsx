import type { Equipment } from "../../types/Equipment.ts";
import "../../styles/EquipmentCard.css";
import { useCart } from "../../hooks/CartHook.ts";
import {
    IoCube,
    IoAdd,
    IoRemove,
    IoBagHandle,
    IoSunny,
    IoFlash,
    IoVideocam,
    IoPodium,
    IoCamera,
    IoTv,
    IoHeadset,
    IoHandRight,
    IoBatteryCharging,
    IoExtensionPuzzle, IoColorFilter
} from "react-icons/io5";

interface EquipmentCardProps {
    equipment: Equipment;
}
import type { IconType } from "react-icons";
import {useEffect, useState} from "react";

interface TypeConfig {
    icon: IconType;
    color: string;
}

const typeConfig: Record<string, TypeConfig> = {
    "Sac": { icon: IoBagHandle, color: "#4A90E2" },
    "Lumière": { icon: IoSunny, color: "#FFD93D" },
    "Flash": { icon: IoFlash, color: "#FF5E5E" },
    "Stabilisateur": { icon: IoVideocam, color: "#50E3C2" },
    "Pied": { icon: IoPodium, color: "#B8E986" },
    "Objectif": { icon: IoCamera, color: "#9B51E0" },
    "Filtre": { icon: IoColorFilter, color: "#FF8C42" },
    "Retour vidéo": { icon: IoTv, color: "#2D9CDB" },
    "Accessoire caméra": { icon: IoExtensionPuzzle, color: "#F2994A" },
    "Son": { icon: IoHeadset, color: "#27AE60" },
    "Grip": { icon: IoHandRight, color: "#F2C94C" },
    "Alimentation": { icon: IoBatteryCharging, color: "#EB5757" },
    "Autre": { icon: IoCube, color: "#888888" },
};


export const EquipmentCard: React.FC<EquipmentCardProps> = ({ equipment }) => {
    const [addedToCard, setAddedToCart] = useState(false);

    const { addToCart, removeFromCart, cart } = useCart();

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

    return (
        <div className="equipment-card">
            {/* Icône / logo dynamique */}
            <div className="equipment-icon" style={{ background: color }}>
                <Icon size={28} />
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
                onClick={handleClick}
            >
                {addedToCard ? <IoRemove size={28} color="red" /> : <IoAdd size={28} color="lightgreen" />}
            </button>
        </div>
    );
};
