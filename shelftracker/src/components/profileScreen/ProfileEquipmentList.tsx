import { useEffect, useState } from "react";
import { getEquipments } from "../../api/EquipmentsApi";
import type { Equipment } from "../../types/Equipment";
import "../../styles/EquipmentList.css";
import {EquipmentList} from "../common/EquipmentList.tsx";

export const ProfileEquipmentList = () => {
    const [equipments, setEquipments] = useState<Equipment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getEquipments();
                setEquipments(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : "Erreur inconnue");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <EquipmentList equipments={equipments}
                       loading={loading}
                       error={error}
                       search={search}
                       setSearch={setSearch}/>
    );
};
