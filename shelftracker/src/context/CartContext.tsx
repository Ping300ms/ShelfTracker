// src/context/CartContext.tsx
import React, { createContext, useState } from "react";
import type { Equipment } from "../types/Equipment";

interface CartContextType {
    cart: Equipment[];
    addToCart: (equipment: Equipment) => void;
    removeFromCart: (id: number) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<Equipment[]>([]);

    const addToCart = (equipment: Equipment) => {
        setCart((prev) => [...prev, equipment]);
    };

    const removeFromCart = (id: number) => {
        setCart((prev) => prev.filter((item) => item.id !== id));
    };

    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
