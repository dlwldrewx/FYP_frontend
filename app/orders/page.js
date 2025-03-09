'use client';
import { useEffect, useState } from 'react';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/orders/user/USER_ID_HERE'); // Replace USER_ID_HERE
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        console.error('Error fetching orders:', err);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-semibold mb-6">My Orders</h1>
      {orders.length === 0 ? (
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
