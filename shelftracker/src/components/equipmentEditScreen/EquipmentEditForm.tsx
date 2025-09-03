import { typeConfig } from "../../utils/equipmentTypeConfig";
import type { Equipment } from "../../types/Equipment";
import "./EquipmentEditForm.css";

interface EquipmentEditFormProps {
    equipment: Equipment;
    saving: boolean;
    onChange: (field: keyof Equipment, value: string) => void;
    onSave: () => void;
}

export function EquipmentEditForm({ equipment, saving, onChange, onSave }: EquipmentEditFormProps) {
    return (
        <div className="card">
            <div className="equipment-edit-form__container">
                <label>Type</label>
                <select
                    className="input"
                    value={equipment.type?.toString()}
                    onChange={(e) => onChange("type", e.target.value)}
                >
                    {Object.keys(typeConfig).map((key) => (
                        <option key={key} value={key}>
                            {key}
                        </option>
                    ))}
                </select>

                <label>Emplacement</label>
                <input
                    className="input"
                    type="text"
                    value={equipment.location ?? ""}
                    onChange={(e) => onChange("location", e.target.value)}
                />

                <label>Note</label>
                <textarea
                    className="input"
                    value={equipment.note ?? ""}
                    onChange={(e) => onChange("note", e.target.value)}
                />

                <button
                    className="btn"
                    onClick={onSave}
                    disabled={saving}
                >
                    {saving ? "Sauvegarde..." : "Sauvegarder"}
                </button>
            </div>
        </div>
    );
}
