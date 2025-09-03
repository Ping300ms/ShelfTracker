import { typeConfig } from "../../utils/equipmentTypeConfig";
import type { Equipment } from "../../types/Equipment";

interface EquipmentEditFormProps {
    equipment: Equipment;
    saving: boolean;
    onChange: (field: keyof Equipment, value: string) => void;
    onSave: () => void;
}

export function EquipmentEditForm({ equipment, saving, onChange, onSave }: EquipmentEditFormProps) {
    return (
        <div className="equipment-edit-container">
            <label className="equipment-edit-label">Type</label>
            <select
                className="equipment-edit-input"
                value={equipment.type?.toString()}
                onChange={(e) => onChange("type", e.target.value)}
            >
                {Object.keys(typeConfig).map((key) => (
                    <option key={key} value={key}>
                        {key}
                    </option>
                ))}
            </select>

            <label className="equipment-edit-label">Emplacement</label>
            <input
                className="equipment-edit-input"
                type="text"
                value={equipment.location ?? ""}
                onChange={(e) => onChange("location", e.target.value)}
            />

            <label className="equipment-edit-label">Note</label>
            <textarea
                className="equipment-edit-textarea"
                value={equipment.note ?? ""}
                onChange={(e) => onChange("note", e.target.value)}
            />

            <button
                className="equipment-save-btn"
                onClick={onSave}
                disabled={saving}
            >
                {saving ? "Sauvegarde..." : "Sauvegarder"}
            </button>
        </div>
    );
}
