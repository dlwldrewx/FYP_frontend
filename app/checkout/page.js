"use client";

import { useState, useEffect } from "react";

export default function CheckoutPage() {
    const [cart, setCart] = useState([]);
    const [userInfo, setUserInfo] = useState({ name: "", email: "", address: "" });
    const [isLoading, setIsLoading] = useState(false);
    const backendURL = "https://fyp-production-61ab.up.railway.app"; // 🔥 Replace with your actual backend URL

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const token = localStorage.getItem("token"); // Get token for authentication
                const response = await fetch(`${backendURL}/api/cart`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`
                    },
                    credentials: "include", // Ensures cookies/session info is sent
                });

                if (!response.ok) throw new Error("Failed to fetch cart");
                
                const data = await response.json();
                setCart(data.cart);
            } catch (error) {
                console.error("Error fetching cart:", error);
            }
        };

        fetchCart();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckout = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const token = localStorage.getItem("token"); // 🔥 Retrieve token

            const response = await fetch(`${backendURL}/api/payment/create-checkout-session`, {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}` // 🔥 Include token in request
                },
                body: JSON.stringify({ userInfo, cart }),
                credentials: "include",
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || "Failed to create Stripe session");
            }

            const data = await response.json();
            if (data.url) {
                window.location.href = data.url; // Redirect to Stripe Checkout
            } else {
                console.error("Stripe session creation failed.");
            }
        } catch (error) {
            console.error("Error:", error.message);
        }

        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <h1 className="text-3xl font-semibold mb-6">Checkout</h1>
            {cart.length === 0 ? (
                <p>Your cart is empty!</p>
            ) : (
                <>
                    <div className="grid gap-6 mb-6">
                        {cart.map((item) => (
                            <div key={item.id} className="bg-white p-4 rounded-lg shadow-lg flex justify-between">
                                <div>
                                    <h2 className="text-xl font-semibold">{item.name}</h2>
                                    <p className="text-gray-600">Price: ${item.price}</p>
                                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mb-6">
                        <h2 className="text-xl font-semibold mb-2">Shipping Information</h2>
                        <form onSubmit={handleCheckout} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={userInfo.name}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={userInfo.email}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Shipping Address</label>
                                <textarea
                                    name="address"
                                    value={userInfo.address}
                                    onChange={handleChange}
                                    className="w-full p-3 border border-gray-300 rounded-lg"
                                    rows="4"
                                    required
                                />
                            </div>

                            <div className="mt-4 flex justify-between">
                                <p className="text-xl font-semibold">
                                    Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
                                </p>
                                <button
                                    type="submit"
                                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Processing..." : "Proceed to Payment"}
                                </button>
                            </div>
                        </form>
                    </div>
                </>
            )}
        </div>
    );
}
