import { useNavigate, useParams } from "react-router-dom";
import TopBar from "../components/common/TopBar.tsx";
import { getEquipmentById, updateEquipment } from "../api/EquipmentsApi.ts";
import { useEffect, useState } from "react";
import type { Equipment } from "../types/Equipment.ts";
import "../styles/EquipmentEdit.css";
import { Loader } from "../components/common/Loader.tsx";
import { typeConfig } from "../utils/equipmentTypeConfig.ts";

function EquipmentEditScreen() {
    const [equipment, setEquipment] = useState<Equipment | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEquipment = async () => {
            const eq = await getEquipmentById(Number(id));
            setEquipment(eq);
            setLoading(false);
        };
        fetchEquipment();
    }, [id]);

    const handleChange = (field: keyof Equipment, value: string) => {
        if (!equipment) return;
        setEquipment({ ...equipment, [field]: value });
    };

    const handleSave = async () => {
        if (!equipment) return;
        setSaving(true);
        try {
            await updateEquipment(equipment);
            navigate(-1);
        } catch (e) {
            console.error(e);
            alert("Erreur lors de la sauvegarde");
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div>
                <TopBar title="Édition" />
                <Loader />
            </div>
        );
    }

    if (!equipment) {
        return (
            <div>
                <TopBar title="Édition" />
                <p>Équipement introuvable</p>
            </div>
        );
    }

    const type = equipment.type ?? "Autre";
    const { icon: Icon, color } = typeConfig[type] || typeConfig["Autre"];

    return (
        <div>
            <TopBar title="Modifier un équipement" />
            <div className="equipment-edit-container">
                <div className="equipment-card-header">
                    <div className="equipment-detail-icon" style={{ background: color }}>
                        <Icon size={28} color="white" />
                    </div>
                    <input
                        className="equipment-edit-input"
                        type="text"
                        value={equipment.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                    />
                </div>

                <label className="equipment-edit-label">Type</label>
                <select
                    className="equipment-edit-input"
                    value={equipment.type?.toString()}
                    onChange={(e) => handleChange("type", e.target.value)}
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
                    onChange={(e) => handleChange("location", e.target.value)}
                />

                <label className="equipment-edit-label">Note</label>
                <textarea
                    className="equipment-edit-textarea"
                    value={equipment.note ?? ""}
                    onChange={(e) => handleChange("note", e.target.value)}
                />

                <button
                    className="equipment-save-btn"
                    onClick={handleSave}
                    disabled={saving}
                >
                    {saving ? "Sauvegarde..." : "Sauvegarder"}
                </button>
            </div>
        </div>
    );
}

export default EquipmentEditScreen;
