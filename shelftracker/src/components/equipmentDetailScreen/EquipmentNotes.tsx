import type { Equipment } from "../../types/Equipment";
import "./EquipmentNotes.css";

export function EquipmentNotes({ equipment }: { equipment: Equipment }) {
    return (
        <>
            <div className="card">
                <p>
                    {equipment?.note == null ? "Cet équipement n'a pas de description." : equipment?.note}
                </p>
            </div>
        </>
    );
}
