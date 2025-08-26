import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import { useCart } from "../../hooks/CartHook";
import { getEquipmentById } from "../../api/EquipmentsApi"; // à créer si tu n’as pas déjà

function Camera() {
    const scannerRef = useRef<Html5Qrcode | null>(null);
    const [scannedCode, setScannedCode] = useState<string | null>(null);
    const { addToCart } = useCart();

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
                        setScannedCode(decodedText);

                        // On suppose que ton QR contient un JSON {id: number}
                        const parsed = JSON.parse(decodedText);

                        if (parsed.id) {
                            const equipment = await getEquipmentById(parsed.id);
                            if (equipment) {
                                addToCart(equipment);
                                alert(`${equipment.name} ajouté au panier !`);
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
        <div className="camera-container">
            <div id="reader"></div>
            {scannedCode && <div className="scanned-code">QR Code : {scannedCode}</div>}
        </div>
    );
}

export default Camera;
