// src/utils/equipmentTypeConfig.ts
import {
    IoCube,
    IoBagHandle,
    IoSunny,
    IoFlash,
    IoVideocam,
    IoPodium,
    IoCamera,
    IoTv,
    IoHeadset,
    IoHandRight,
    IoBatteryCharging,
    IoExtensionPuzzle,
    IoColorFilter
} from "react-icons/io5";
import type { IconType } from "react-icons";

interface TypeConfig {
    icon: IconType;
    color: string;
}

export const typeConfig: Record<string, TypeConfig> = {
    "Sac": { icon: IoBagHandle, color: "#4A90E2" },
    "Lumière": { icon: IoSunny, color: "#FFD93D" },
    "Flash": { icon: IoFlash, color: "#FF5E5E" },
    "Stabilisateur": { icon: IoVideocam, color: "#50E3C2" },
    "Pied": { icon: IoPodium, color: "#B8E986" },
    "Objectif": { icon: IoCamera, color: "#9B51E0" },
    "Filtre": { icon: IoColorFilter, color: "#FF8C42" },
    "Retour vidéo": { icon: IoTv, color: "#2D9CDB" },
    "Accessoire caméra": { icon: IoExtensionPuzzle, color: "#F2994A" },
    "Son": { icon: IoHeadset, color: "#27AE60" },
    "Grip": { icon: IoHandRight, color: "#F2C94C" },
    "Alimentation": { icon: IoBatteryCharging, color: "#EB5757" },
    "Autre": { icon: IoCube, color: "#888888" },
};
