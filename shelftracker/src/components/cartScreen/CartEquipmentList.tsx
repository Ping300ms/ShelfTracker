import { useEffect, useState } from "react";
import type { Equipment } from "../../types/Equipment";
import "../../styles/EquipmentList.css";
import {useCart} from "../../hooks/CartHook.ts";
import {EquipmentList} from "../common/EquipmentList.tsx";

export const CartEquipmentList = () => {
    const [equipments, setEquipments] = useState<Equipment[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [search, setSearch] = useState("");

    const { cart } = useCart()

    useEffect(() => {
        try {
            setEquipments(cart);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erreur inconnue");
        } finally {
            setLoading(false);
        }
    }, [cart]);

    return (
        <EquipmentList equipments={equipments}
                       error={error}
                       search={search}
                       setSearch={setSearch}
                       loading={loading}/>
    );
};
