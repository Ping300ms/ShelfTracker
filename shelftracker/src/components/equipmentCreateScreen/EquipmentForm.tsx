import { typeConfig } from "../../utils/equipmentTypeConfig";
import type { NewEquipment } from "../../types/Equipment";

interface EquipmentFormProps {
    form: NewEquipment;
    loading: boolean;
    error: string | null;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    onSubmit: (e: React.FormEvent) => void;
}

export function EquipmentForm({ form, loading, error, onChange, onSubmit }: EquipmentFormProps) {
    return (
        <form className="equipment-form" onSubmit={onSubmit}>
            {error && <p style={{ color: "red" }}>{error}</p>}

            <label>
                Nom
                <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    required
                />
            </label>

            <label>
                Type
                <select
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

            <label>
                Emplacement
                <input
                    type="text"
                    name="location"
                    value={form.location ?? ""}
                    onChange={onChange}
                />
            </label>

            <label>
                Prix de location (€)
                <input
                    type="number"
                    step="0.01"
                    name="rent_price"
                    value={form.rent_price}
                    onChange={onChange}
                />
            </label>

            <label>
                Note
                <textarea
                    name="note"
                    value={form.note ?? ""}
                    onChange={onChange}
                />
            </label>

            <button type="submit" disabled={loading}>
                {loading ? "Création..." : "Créer"}
            </button>
        </form>
    );
}
