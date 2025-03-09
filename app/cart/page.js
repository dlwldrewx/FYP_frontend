"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const backendURL = "https://fyp-production-61ab.up.railway.app"; // Replace with your actual backend URL

  useEffect(() => {
    // Fetch cart data from the backend
    const fetchCart = async () => {
      try {
        const response = await fetch(`${backendURL}/api/cart`, {
          credentials: "include", // Ensure cookies are sent if using authentication
        });
        const data = await response.json();
        setCart(data.cart);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    fetchCart();
  }, []);

  const handleRemoveItem = async (id) => {
    try {
      const response = await fetch(`${backendURL}/api/cart/remove`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId: id }),
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to remove item");

      setCart(cart.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-semibold mb-6">Shopping Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600">Your cart is empty!</p>
          <Link href="/products">
            <button className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400">
              Browse Products
            </button>
          </Link>
        </div>
      ) : (
        <>
          <div className="grid gap-6">
            {cart.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg shadow-lg flex justify-between items-center"
              >
                <div>
                  <h2 className="text-xl font-semibold">{item.name}</h2>
                  <p className="text-gray-600">Price: ${item.price}</p>
                  <p className="text-gray-600">Quantity: {item.quantity}</p>
                </div>
                <button
                  className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-400"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <p className="text-xl font-semibold">
              Total Price: ${totalPrice.toFixed(2)}
            </p>
            <Link href="/checkout">
              <button className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-400">
                Proceed to Checkout
              </button>
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
