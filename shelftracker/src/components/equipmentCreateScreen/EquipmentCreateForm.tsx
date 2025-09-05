import { typeConfig } from "../../utils/equipmentTypeConfig";
import type { NewEquipment } from "../../types/Equipment";
import "./EquipmentCreateForm.css";

interface EquipmentFormProps {
    form: NewEquipment;
    loading: boolean;
    error: string | null;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
}

export function EquipmentCreateForm({ form, loading, error, onChange, onSubmit }: EquipmentFormProps) {
    return (
        <div className="card">
            <form className="equipment-creation-form__container" onSubmit={onSubmit}>
                {error && <p style={{ color: "red" }}>{error}</p>}

                <label className="equipment-creation-form__label">
                    Nom
                    <input
                        className="input"
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={onChange}
                        required
                    />
                </label>

                <label className="equipment-creation-form__label">
                    Type
                    <select
                        className="input"
                        name="type"
                        value={form.type ?? "Autre"}
                        onChange={onChange}
                    >
                        {Object.keys(typeConfig).map((typeKey) => (
                            <option key={typeKey} value={typeKey}>
                                {typeKey}
                            </option>
                        ))}
                    </select>
                </label>

                <label className="equipment-creation-form__label">
                    Emplacement
                    <input
                        className="input"
                        type="text"
                        name="location"
                        value={form.location ?? ""}
                        onChange={onChange}
                    />
                </label>

                <label className="equipment-creation-form__label">
                    Prix de location (€)
                    <input
                        className="input"
                        type="number"
                        step="0.01"
                        name="rent_price"
                        value={form.rent_price}
                        onChange={onChange}
                    />
                </label>

                <label className="equipment-creation-form__label">
                    Note
                    <textarea
                        className="input"
                        name="note"
                        value={form.note ?? ""}
                        onChange={onChange}
                    />
                </label>

                <button type="submit" disabled={loading} className="btn">
                    {loading ? "Création..." : "Créer"}
                </button>
            </form>
        </div>

    );
}
