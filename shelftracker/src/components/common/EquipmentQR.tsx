import type { Equipment } from "../../types/Equipment";
import { QRCodeSVG } from "qrcode.react";
import { useRef } from "react";
import "./EquipmentQR.css";
import {IoDownloadOutline} from "react-icons/io5";

interface EquipmentQRProps {
    equipment: Equipment;
}

const EquipmentQR: React.FC<EquipmentQRProps> = ({ equipment }) => {
    const svgRef = useRef<SVGSVGElement | null>(null);

    const handleDownload = (format: "png" | "jpg") => {
        if (!svgRef.current) return;

        // Récupération du SVG sous forme de string
        const svg = new XMLSerializer().serializeToString(svgRef.current);
        const img = new Image();
        const svgBlob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
        const url = URL.createObjectURL(svgBlob);

        img.onload = () => {
            const canvas = document.createElement("canvas");
            const size = 200; // taille finale du QR
            const padding = 20;
            const textHeight = 30;

            canvas.width = size + padding * 2;
            canvas.height = size + padding * 2 + textHeight;

            const ctx = canvas.getContext("2d");
            if (!ctx) return;

            // Fond blanc
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Dessin du QR
            ctx.drawImage(img, padding, padding, size, size);

            // Texte sous le QR
            ctx.fillStyle = "black";
            ctx.font = "16px Arial";
            ctx.textAlign = "center";
            ctx.fillText(equipment.name, canvas.width / 2, size + padding * 2 + 15);

            // Export
            const link = document.createElement("a");
            link.download = `${equipment.name}.${format}`;
            link.href = canvas.toDataURL(`image/${format}`);
            link.click();

            URL.revokeObjectURL(url);
        };

        img.src = url;
    };

    const qrValue = JSON.stringify({ id: equipment.id, name: equipment.name });

    return (
        <div className="card centered">
            <QRCodeSVG ref={svgRef} value={qrValue} size={200} />
            <div>
                <button onClick={() => handleDownload("png")} className="equipmentQR__download-btn">
                    <IoDownloadOutline size={24} />
                </button>
            </div>
        </div>
    );
};

export default EquipmentQR;
