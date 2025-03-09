"use client";  // ✅ Add this line

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PaymentSuccess() {
    const [orderDetails, setOrderDetails] = useState(null);
    const router = useRouter();
    const { session_id } = router.query; // Get session_id from the URL query parameter

    useEffect(() => {
        // Fetch order details using the session_id (you can call an API to get order details)
        if (session_id) {
            const fetchOrderDetails = async () => {
                const response = await fetch(`/api/order-details?session_id=${session_id}`);
                const data = await response.json();
                setOrderDetails(data);
            };
            fetchOrderDetails();
        }
    }, [session_id]);

    if (!orderDetails) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-green-50 p-6">
            <h1 className="text-3xl font-semibold mb-6 text-green-600">Payment Successful!</h1>
            <p className="mb-4">Thank you for your purchase! Your order has been confirmed.</p>
            <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold">Order Details</h2>
                <p><strong>Order ID:</strong> {orderDetails.orderId}</p>
                <p><strong>Total Amount:</strong> {orderDetails.totalAmount}</p>
                <p><strong>Status:</strong> {orderDetails.status}</p>
                <div className="mt-4">
                    <a href="/products" className="text-blue-500 hover:underline">Go back to shopping</a>
                </div>
            </div>
        </div>
    );
}
