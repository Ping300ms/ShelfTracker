import type { Equipment } from "../types/Equipment";
import "../styles/EquipmentList.css";
import {EquipmentCard} from "./EquipmentCard.tsx";

interface EquipmentListProps {
    equipments: Equipment[];
    loading: boolean;
    error: string | null;
    search: string;
    addedToCart: boolean;
}

export const EquipmentList: React.FC<EquipmentListProps> = ({ equipments, loading, error, search, addedToCart }) => {

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
            <div className="equipment-list">
                {filteredEquipments.length > 0 ? (
                    filteredEquipments.map((eq) => (
                        <EquipmentCard key={eq.id} equipment={eq} addedToCard={addedToCart} />
                    ))
                ) : (
                    <p>Aucun équipement trouvé.</p>
                )}
            </div>
        </div>
    );
};
