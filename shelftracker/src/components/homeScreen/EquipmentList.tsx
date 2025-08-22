import { useEffect, useState } from "react";
import { getEquipments } from "../../api/EquipmentsApi";
import type { Equipment } from "../../types/Equipment";
import { EquipmentCard } from "./EquipmentCard.tsx";
import { SearchBar } from "./SearchBar.tsx"; // 👈 import
import "../../styles/EquipmentList.css";

export const EquipmentList = () => {
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

    const filteredEquipments = equipments.filter(
        (eq) =>
            eq.name.toLowerCase().includes(search.toLowerCase()) ||
            (eq.location?.toLowerCase().includes(search.toLowerCase()) ?? false)
    );

    if (loading) return <p>Chargement...</p>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (equipments.length === 0) return <p>Aucun équipement trouvé.</p>;

    return (
        <div className="equipment-list-container">
            <SearchBar value={search} onChange={setSearch} /> {/* 👈 nouvelle barre */}
            <div className="equipment-list">
                {filteredEquipments.length > 0 ? (
                    filteredEquipments.map((eq) => (
                        <EquipmentCard key={eq.id} equipment={eq} />
                    ))
                ) : (
                    <p>Aucun équipement trouvé.</p>
                )}
            </div>
        </div>
    );
};
