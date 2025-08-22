import { useEffect, useState } from "react";
import { getEquipments } from "../../api/EquipmentsApi";
import type { Equipment } from "../../types/Equipment";
import { EquipmentCard } from "./EquipmentCard";
import { IoSearch } from "react-icons/io5";
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
            {/* Barre de recherche */}
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Rechercher un équipement..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <IoSearch size={20} className="search-icon" />
            </div>

            {/* Liste des équipements */}
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
