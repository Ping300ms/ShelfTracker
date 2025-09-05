// components/equipment/EquipmentForm.tsx
import { typeConfig } from "../../utils/equipmentTypeConfig";
import type { Equipment, NewEquipment } from "../../types/Equipment";
import "./EquipmentForm.css";

interface EquipmentFormProps<T extends Equipment | NewEquipment> {
    equipment: T;
    saving: boolean;
    onChange: (field: keyof T, value: string) => void;
    onSave: () => void;
}

export function EquipmentForm<T extends Equipment | NewEquipment>({
                                                                      equipment,
                                                                      saving,
                                                                      onChange,
                                                                      onSave,
                                                                  }: EquipmentFormProps<T>) {
    return (
        <div className="card">
            <div className="equipment-form__container">
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
