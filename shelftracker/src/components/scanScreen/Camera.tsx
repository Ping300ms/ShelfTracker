import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { getEquipmentById } from "../../api/EquipmentsApi";
import type {Equipment} from "../../types/Equipment.ts";
import {EquipmentCard} from "../common/EquipmentCard.tsx";
import "./Camera.css"

function Camera() {
    const scannerRef = useRef<Html5Qrcode | null>(null);
    const [scannedEquipment, setScannedEquipment] = useState<Equipment | null>(null);

    useEffect(() => {
        const scannerId = "reader";
        const html5QrCode = new Html5Qrcode(scannerId, false);
        scannerRef.current = html5QrCode;

        html5QrCode
            .start(
                { facingMode: "environment" },
                {
                    fps: 10,
                    qrbox: 250,
                },
                async (decodedText) => {
                    try {
                        const parsed = JSON.parse(decodedText);
                        if (parsed.id) {
                            const equipment = await getEquipmentById(parsed.id);
                            if (equipment) {
                                //addToCart(equipment);
                                setScannedEquipment(equipment);
                                //alert(`${equipment.name} ajouté au panier !`);
                            }
                        }
                    } catch (err) {
                        console.error("QR non valide", err);
                    }
                },
                () => {}
            )
            .catch((err) => console.error("Impossible de démarrer le scanner :", err));

        return () => {
            if (scannerRef.current?.getState().toString() === "SCANNING") {
                scannerRef.current
                    .stop()
                    .then(() => scannerRef.current?.clear())
                    .catch((err) => console.error("Erreur lors de l'arrêt :", err));
            }
        };
    }, []);

    return (
        <div className="camera__container">
            <div id="reader"></div>
            {scannedEquipment &&
                <div className="camera__equipment">
                    <EquipmentCard equipment={scannedEquipment}/>
                </div>}
        </div>
    );
}

export default Camera;
