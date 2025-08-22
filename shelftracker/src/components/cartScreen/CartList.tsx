import { useEffect, useState } from "react";
import type { Equipment } from "../../types/Equipment";
import { IoSearch } from "react-icons/io5";
import "../../styles/EquipmentList.css";
import {useCart} from "../../hooks/CartHook.ts";
import {CartCard} from "./CartCard.tsx";

export const CartList = () => {
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
                        <CartCard key={eq.id} equipment={eq} />
                    ))
                ) : (
                    <p>Aucun équipement trouvé.</p>
                )}
            </div>
        </div>
    );
};
