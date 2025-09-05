import { useState } from "react";
import type { Equipment } from "../../types/Equipment.ts";
import "./EquipmentList.css";
import { EquipmentCard } from "./EquipmentCard.tsx";
import { SearchBar } from "./SearchBar.tsx";
import { Loader } from "./Loader.tsx";
import { EmptyState } from "./EmptyState.tsx";
import { useNavigate } from "react-router-dom";
import { IoAdd } from "react-icons/io5";

interface EquipmentListProps {
    equipments: Equipment[];
    loading: boolean;
    error: string | null;
    search: string;
    setSearch: (search: string) => void;
    canAdd?: boolean;
}

export const EquipmentList: React.FC<EquipmentListProps> = ({ equipments, loading, error, search, setSearch, canAdd = true }) => {
    const [typeFilter, setTypeFilter] = useState<string>("Tous");
    const navigate = useNavigate();

    const filteredEquipments = equipments.filter((eq) => {
        const matchesSearch =
            eq.name.toLowerCase().includes(search.toLowerCase()) ||
            (eq.location?.toLowerCase().includes(search.toLowerCase()) ?? false);

        const matchesType = typeFilter === "Tous" || eq.type === typeFilter;

        return matchesSearch && matchesType;
    });

    if (loading) return <Loader />;
    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (equipments.length === 0) return <EmptyState message="Aucun équipement trouvé." />;

    return (
        <div className="equipment-list__container">
            {/* Bouton pour créer un nouvel équipement */}
            <SearchBar
                value={search}
                onChange={setSearch}
                typeFilter={typeFilter}
                setTypeFilter={setTypeFilter}
            />

            {canAdd &&  <div className="equipment-list__create-btn" onClick={() => navigate("/ShelfTracker/equipment/new")}>
                            <IoAdd size={28} />
                        </div>}


            <div className="equipment-list__card-container">
                {filteredEquipments.length > 0 ? (
                    filteredEquipments.map((eq) => <EquipmentCard key={eq.id} equipment={eq} />)
                ) : (
                    <EmptyState message="Aucun équipement trouvé." />
                )}
            </div>
        </div>
    );
};
