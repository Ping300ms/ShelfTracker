import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/common/TopBar";
import { createEquipment } from "../api/EquipmentsApi";
import type { NewEquipment } from "../types/Equipment";

import { EquipmentHeader } from "../components/common/EquipmentHeader";
import { EquipmentForm } from "../components/common/EquipmentForm";

function EquipmentCreateScreen() {
    const navigate = useNavigate();

    const [equipment, setEquipment] = useState<NewEquipment>({
        name: "",
        note: "",
        location: "",
        type: "Autre",
        rent_price: 0,
    });

    const [saving, setSaving] = useState(false);

    const handleChange = (field: keyof NewEquipment, value: string) => {
        setEquipment((prev) => ({ ...prev, [field]: value }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await createEquipment(equipment);
            navigate("/ShelfTracker/");
        } catch (err) {
            console.error(err);
            alert("Erreur lors de la création");
        } finally {
            setSaving(false);
        }
    };

    return (
        <div>
            <TopBar title="Créer un équipement" />
            <EquipmentHeader equipment={equipment} onChange={handleChange} />
            <EquipmentForm
                equipment={equipment}
                saving={saving}
                onChange={handleChange}
                onSave={handleSave}
            />
        </div>
    );
}

export default EquipmentCreateScreen;
