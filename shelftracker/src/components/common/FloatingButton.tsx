// src/components/common/FloatingButton.tsx
import { type IconType } from "react-icons";
import "./FloatingButton.css";

interface FloatingButtonProps {
    icon: IconType;
    color?: string;
    iconColor?: string;
    onClick?: () => void;
}

export default function FloatingButton({ icon: Icon, color = "var(--success-color)", iconColor = "var(--secondary-text-color)", onClick }: FloatingButtonProps) {
    return (
        <button className="floating-button__container" style={{ backgroundColor: color, color: iconColor }} onClick={onClick}>
            <Icon size={28} />
        </button>
    );
}
