// src/components/FloatingCart.tsx
import React from "react";
import {IoCheckmark} from "react-icons/io5";
import "../../styles/FloatingCheckout.css";

interface FloatingCartProps {
    onClick?: () => void;
}

const FloatingCart: React.FC<FloatingCartProps> = ({ onClick }) => {
    return (
        <div className="fab-checkout" onClick={onClick}>
            <IoCheckmark/>
        </div>
    );
};

export default FloatingCart;
