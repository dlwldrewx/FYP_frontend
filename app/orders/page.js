"use client";
import { useEffect, useState } from "react";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const API_BASE_URL = "https://fyp-production-61ab.up.railway.app"; // ✅ Replace with Railway backend URL

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError("");

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("User not logged in.");
          setLoading(false);
          return;
        }

        const res = await fetch(`${API_BASE_URL}/api/orders/user`, { // ✅ Fetch orders for logged-in user
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // ✅ Include JWT token
          },
        });

        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }

        const data = await res.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      }

      setLoading(false);
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-semibold mb-6">My Orders</h1>

      {loading ? (
        <p>Loading orders...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="grid gap-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold">Order #{order._id}</h2>
              <p>Status: {order.status}</p>
              <p>Total: ${order.totalPrice.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
