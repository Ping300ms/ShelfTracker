// src/components/FloatingCart.tsx
import React from "react";
import {IoPencilOutline} from "react-icons/io5";
import "../../styles/FloatingEdit.css";

interface FloatingCartProps {
    onClick?: () => void;
}

const FloatingEdit: React.FC<FloatingCartProps> = ({ onClick }) => {
    return (
        <div className="fab-edit" onClick={onClick}>
            <IoPencilOutline/>
        </div>
    );
};

export default FloatingEdit;
