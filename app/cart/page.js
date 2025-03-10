"use client";
import { useEffect, useState } from "react";
import { getCart, addToCart, removeFromCart, updateCartItem } from "@/services/cart";

export default function CartPage() {
    const [cart, setCart] = useState({ items: [] });
    const [token, setToken] = useState(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            const storedToken = localStorage.getItem("token");
            setToken(storedToken);
        }
    }, []);

    useEffect(() => {
        if (token) {
            getCart(token)
                .then((data) => setCart(data))
                .catch(console.error);
        }
    }, [token]);

    const handleRemove = async (productId) => {
        await removeFromCart(productId, token);
        setCart((prevCart) => ({
            items: prevCart.items.filter((item) => item.productId !== productId),
        }));
    };

    const handleUpdate = async (productId, quantity) => {
        await updateCartItem(productId, quantity, token);
        setCart((prevCart) => ({
            items: prevCart.items.map((item) =>
                item.productId === productId ? { ...item, quantity } : item
            ),
        }));
    };

    return (
        <div className="p-5">
            <h2 className="text-xl font-bold">Your Cart</h2>
            {cart.items.length === 0 ? (
                <p>Cart is empty</p>
            ) : (
                cart.items.map((item) => (
                    <div key={item.productId} className="flex justify-between items-center p-3 border">
                        <span>{item.name} (x{item.quantity})</span>
                        <button 
                            onClick={() => handleRemove(item.productId)} 
                            className="bg-red-500 text-white p-1"
                        >
                            Remove
                        </button>
                    </div>
                ))
            )}
        </div>
    );
}
