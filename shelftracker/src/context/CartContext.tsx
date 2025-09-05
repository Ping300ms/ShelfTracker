import React, { createContext, useState, useEffect } from "react";
import type { Equipment } from "../types/Equipment";

interface CartContextType {
    cart: Equipment[];
    addToCart: (equipment: Equipment) => void;
    removeFromCart: (id: string) => void;
    clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [cart, setCart] = useState<Equipment[]>(() => {
        // Initialiser le panier depuis le localStorage
        try {
            const stored = localStorage.getItem("cart");
            return stored ? JSON.parse(stored) : [];
        } catch {
            return [];
        }
    });

    // Sauvegarder le panier à chaque modification
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cart));
    }, [cart]);

    const addToCart = (equipment: Equipment) => {
        if (cart.some((item) => item.id === equipment.id)) return;
        setCart((prev) => [...prev, equipment]);
    };

    const removeFromCart = (id: string) => {
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
