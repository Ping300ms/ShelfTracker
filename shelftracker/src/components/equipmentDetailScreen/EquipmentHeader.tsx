import { IoAdd, IoRemove, IoTrashOutline } from "react-icons/io5";
import { typeConfig } from "../../utils/equipmentTypeConfig";
import type { Equipment } from "../../types/Equipment";

interface EquipmentHeaderProps {
    equipment: Equipment;
    addedToCart: boolean;
    onDelete: () => void;
    onToggleCart: () => void;
}

export function EquipmentHeader({ equipment, addedToCart, onDelete, onToggleCart }: EquipmentHeaderProps) {
    const type = equipment?.type ?? "Autre";
    const { icon: Icon, color } = typeConfig[type] || typeConfig["Autre"];

    return (
        <div className="equipment-card-header">
            <div className="equipment-detail-icon" style={{ background: color }}>
                <Icon size={28} color="white" />
            </div>
            <h2 className="equipment-detail-name">{equipment?.name}</h2>
            <button className="equipment-detail-delete-btn" onClick={onDelete}>
                <IoTrashOutline className="equipment-detail-delete-icon" size={24} color="lightcoral" />
            </button>
            <button className="equipment-detail-add-btn" onClick={onToggleCart}>
                {addedToCart ? <IoRemove size={28} color="lightcoral" /> : <IoAdd size={28} color="lightgreen" />}
            </button>

            <div className="equipment-detail-add-btn" onClick={onToggleCart}>

            </div>

            <p className="equipment-detail-type">{equipment?.type}</p>
            <p className="equipment-detail-location">
                {equipment?.location == null ? "Emplacement inconnu" : equipment?.location}
            </p>
        </div>
    );
}
