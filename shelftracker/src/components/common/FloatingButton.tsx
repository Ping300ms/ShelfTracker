// src/components/common/FloatingButton.tsx
import { type IconType } from "react-icons";
import "./FloatingButton.css";

interface FloatingButtonProps {
    icon: IconType;
    color?: string;
    onClick?: () => void;
}

export default function FloatingButton({ icon: Icon, color = "#4A90E2", onClick }: FloatingButtonProps) {
    return (
        <button className="floating-button__container" style={{ backgroundColor: color }} onClick={onClick}>
            <Icon size={28} color="white" />
        </button>
    );
}
