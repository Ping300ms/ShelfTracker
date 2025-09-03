import type { Equipment } from "../../types/Equipment";

export function EquipmentInfo({ equipment }: { equipment: Equipment }) {
    return (
        <>
            <div className="equipment-detail-note-container">
                <p className="equipment-detail-note">
                    {equipment?.note == null ? "Cet équipement n'a pas de description." : equipment?.note}
                </p>
            </div>
        </>
    );
}
