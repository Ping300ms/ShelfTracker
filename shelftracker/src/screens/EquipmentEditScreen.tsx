import { useNavigate, useParams } from "react-router-dom";
import TopBar from "../components/common/TopBar";
import { getEquipmentById, updateEquipment } from "../api/EquipmentsApi";
import { useEffect, useState } from "react";
import type { Equipment } from "../types/Equipment";
import { Loader } from "../components/common/Loader";

import { EquipmentEditHeader } from "../components/equipmentEditScreen/EquipmentEditHeader";
import { EquipmentEditForm } from "../components/equipmentEditScreen/EquipmentEditForm";

function EquipmentEditScreen() {
    const [equipment, setEquipment] = useState<Equipment | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEquipment = async () => {
            if (!id) return;
            const eq = await getEquipmentById(id);
            setEquipment(eq);
            setLoading(false);
        };
        void fetchEquipment();
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

    return (
        <div>
            <TopBar title="Modifier un équipement" />
            <EquipmentEditHeader equipment={equipment} onChange={handleChange} />
            <EquipmentEditForm
                equipment={equipment}
                saving={saving}
                onChange={handleChange}
                onSave={handleSave}
            />
        </div>
    );
}

export default EquipmentEditScreen;
