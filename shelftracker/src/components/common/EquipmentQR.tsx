import type { Equipment } from "../../types/Equipment";
import {QRCodeSVG} from 'qrcode.react';

interface EquipmentQRProps {
    equipment: Equipment;
}

const EquipmentQR: React.FC<EquipmentQRProps> = ({ equipment }) => {
    // On encode un JSON ou juste l’ID
    const qrValue = JSON.stringify({ id: equipment.id, name: equipment.name });

    return (
        <div style={{ textAlign: "center", margin: "1rem" }}>
            <QRCodeSVG value={qrValue} size={128} />
            <p>{equipment.name}</p>
        </div>
    );
};

export default EquipmentQR;
