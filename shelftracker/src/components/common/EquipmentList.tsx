import type { Equipment } from "../../types/Equipment.ts";
import "../../styles/EquipmentList.css";
import {EquipmentCard} from "./EquipmentCard.tsx";
import {SearchBar} from "./SearchBar.tsx";
import {Loader} from "./Loader.tsx";
import {EmptyState} from "./EmptyState.tsx";

interface EquipmentListProps {
    equipments: Equipment[];
    loading: boolean;
    error: string | null;
    search: string;
    setSearch: (search: string) => void;
}

export const EquipmentList: React.FC<EquipmentListProps> = ({ equipments, loading, error, search, setSearch }) => {

    const filteredEquipments = equipments.filter(
        (eq) =>
            eq.name.toLowerCase().includes(search.toLowerCase()) ||
            (eq.location?.toLowerCase().includes(search.toLowerCase()) ?? false)
    );

    if (loading) return <Loader/>;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (equipments.length === 0) return <EmptyState message="Aucun équipement trouvé." />;

    return (
        <div className="equipment-list-container">
            <SearchBar value={search} onChange={setSearch} />
            <div className="equipment-list">
                {filteredEquipments.length > 0 ? (
                    filteredEquipments.map((eq) => (
                        <EquipmentCard key={eq.id} equipment={eq} />
                    ))
                ) : (
                    <EmptyState message="Aucun équipement trouvé." />
                )}
            </div>
        </div>
    );
};
