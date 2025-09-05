import { IoAdd, IoRemove, IoTrashOutline } from "react-icons/io5";
import { typeConfig } from "../../utils/equipmentTypeConfig";
import type { Equipment } from "../../types/Equipment";
import "./EquipmentHeader.css";

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
        <div className="card">
            <div className="equipment-header__top-bar">
                <div className="equipment-header__icon" style={{ background: color }}>
                    <Icon size={28} color="white" />
                </div>
                <h2>{equipment?.name}</h2>
                <button className="equipment-header__delete-btn" onClick={onDelete}>
                    <IoTrashOutline size={24} color="var(--error-color)" />
                </button>
                <button className="equipment-header__add-btn" onClick={onToggleCart}>
                    {addedToCart ? <IoRemove size={28} color="var(--error-color)" /> : <IoAdd size={28} color="var(--success-color)" />}
                </button>
            </div>

            <p className="equipment-header__type">{equipment?.type}</p>
            <p className="equipment-header__location">
                {equipment?.location == null ? "Emplacement inconnu" : equipment?.location}
            </p>
        </div>
    );
}
