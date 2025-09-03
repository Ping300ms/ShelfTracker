import { useState } from "react";
import { useNavigate } from "react-router-dom";
import TopBar from "../components/common/TopBar.tsx";
import { createEquipment } from "../api/EquipmentsApi.ts";
import type { NewEquipment } from "../types/Equipment.ts";

import { EquipmentCreateForm } from "../components/equipmentCreateScreen/EquipmentCreateForm.tsx";

function EquipmentCreateScreen() {
    const navigate = useNavigate();

    const [form, setForm] = useState<NewEquipment>({
        name: "",
        note: "",
        rent_price: 0,
        location: "",
        type: "Autre",
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
        } catch (err) {
            //@ts-expect-error wtf
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <TopBar title="Création" />
            <EquipmentCreateForm
                form={form}
                loading={loading}
                error={error}
                onChange={handleChange}
                onSubmit={handleSubmit}
            />
        </div>
    );
}

export default EquipmentCreateScreen;
