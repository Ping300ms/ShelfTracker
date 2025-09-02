import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/common/TopBar.tsx";
import { createEquipment } from "../api/EquipmentsApi.ts";
import type { NewEquipment } from "../types/Equipment.ts";
import { typeConfig } from "../utils/equipmentTypeConfig.ts";
import "../styles/EquipmentCreate.css";

function EquipmentCreateScreen() {
    const navigate = useNavigate();

    const [form, setForm] = useState<NewEquipment>({
        name: "",
        note: "",
        rent_price: 0,
        location: "",
        type: "Autre", // valeur par défaut
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: name === "rent_price" ? Number(value) : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await createEquipment(form);
            navigate("/ShelfTracker/");
        }
        catch (err) {
            //@ts-expect-error wtf
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <TopBar title="Création" />
            <div className="equipment-detail-container">
                <form className="equipment-form" onSubmit={handleSubmit}>
                    {error && <p style={{ color: "red" }}>{error}</p>}

                    <label>
                        Nom
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Type
                        <select
                            name="type"
                            value={form.type ?? "Autre"}
                            onChange={handleChange}
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
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        Prix de location (€)
                        <input
                            type="number"
                            step="0.01"
                            name="rent_price"
                            value={form.rent_price}
                            onChange={handleChange}
                        />
                    </label>

                    <label>
                        Note
                        <textarea
                            name="note"
                            value={form.note ?? ""}
                            onChange={handleChange}
                        />
                    </label>

                    <button type="submit" disabled={loading}>
                        {loading ? "Création..." : "Créer"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default EquipmentCreateScreen;
