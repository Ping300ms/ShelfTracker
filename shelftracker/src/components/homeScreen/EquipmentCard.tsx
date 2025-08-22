import { IoCube } from "react-icons/io5";
import type { Equipment } from "../../types/Equipment";
import "../../styles/EquipmentCard.css";

interface EquipmentCardProps {
    equipment: Equipment;
}

export const EquipmentCard: React.FC<EquipmentCardProps> = ({ equipment }) => {
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
        </div>
    );
};
