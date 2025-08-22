// src/screens/ScanScreen.tsx
import { useEffect, useRef, useState } from "react";
import { Html5Qrcode } from "html5-qrcode";
import "../styles/ScanScreen.css";

function ScanScreen() {
    const scannerRef = useRef<Html5Qrcode | null>(null);
    const [scannedCode, setScannedCode] = useState<string | null>(null);

    useEffect(() => {
        const scannerId = "reader";
        const html5QrCode = new Html5Qrcode(scannerId, false);
        scannerRef.current = html5QrCode;

        html5QrCode
            .start(
                { facingMode: "environment" },
                { fps: 10, qrbox: 250, aspectRatio: window.innerWidth / window.innerHeight },
                (decodedText) => {
                    setScannedCode(decodedText);
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
        <div className="scan-screen">
            <div id="reader"></div>
            {scannedCode && <div className="scanned-code">QR Code : {scannedCode}</div>}
        </div>
    );
}

export default ScanScreen;
