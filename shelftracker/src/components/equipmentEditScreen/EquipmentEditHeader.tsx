import { typeConfig } from "../../utils/equipmentTypeConfig";
import type { Equipment } from "../../types/Equipment";
import "./EquipmentEditHeader.css";

interface EquipmentEditHeaderProps {
    equipment: Equipment;
    onChange: (field: keyof Equipment, value: string) => void;
}

export function EquipmentEditHeader({ equipment, onChange }: EquipmentEditHeaderProps) {
    const type = equipment.type ?? "Autre";
    const { icon: Icon, color } = typeConfig[type] || typeConfig["Autre"];

    return (
        <div className="card">
            <div className="equipment-edit-header__container">
                <div className="icon" style={{ background: color }}>
                    <Icon size={28} color="white" />
                </div>
                <input
                    className="input"
                    type="text"
                    value={equipment.name}
                    onChange={(e) => onChange("name", e.target.value)}
                />
            </div>
        </div>
    );
}
