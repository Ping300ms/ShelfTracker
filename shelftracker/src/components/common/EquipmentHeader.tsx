// components/equipment/EquipmentHeader.tsx
import { typeConfig } from "../../utils/equipmentTypeConfig";
import type { Equipment, NewEquipment } from "../../types/Equipment";
import "./EquipmentHeader.css";

interface EquipmentHeaderProps<T extends Equipment | NewEquipment> {
    equipment: T;
    onChange: (field: keyof T, value: string) => void;
}

export function EquipmentHeader<T extends Equipment | NewEquipment>({
                                                                        equipment,
                                                                        onChange,
                                                                    }: EquipmentHeaderProps<T>) {
    const type = equipment.type ?? "Autre";
    const { icon: Icon, color } = typeConfig[type] || typeConfig["Autre"];

    return (
        <div className="card">
            <div className="equipment-header__container">
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
