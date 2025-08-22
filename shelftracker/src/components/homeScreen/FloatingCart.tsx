// src/components/FloatingCart.tsx
import React from "react";
import { IoCart } from "react-icons/io5";
import "../../styles/FloatingCart.css";

interface FloatingCartProps {
    onClick?: () => void;
}

const FloatingCart: React.FC<FloatingCartProps> = ({ onClick }) => {
    return (
        <div className="fab-cart" onClick={onClick}>
            <IoCart />
        </div>
    );
};

export default FloatingCart;
