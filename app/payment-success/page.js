"use client"; // ✅ Required for client-side hooks

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function PaymentSuccessContent() {
    const searchParams = useSearchParams();
    const session_id = searchParams.get("session_id");
    const [orderDetails, setOrderDetails] = useState(null);
    const [error, setError] = useState("");

    useEffect(() => {
        if (session_id) {
            const fetchOrderDetails = async () => {
                try {
                    const response = await fetch(
                        `https://fyp-production-61ab.up.railway.app/api/orders/session/${session_id}`
                    );
                    
                    if (!response.ok) throw new Error("Failed to fetch order details");

                    const data = await response.json();
                    setOrderDetails(data);
                } catch (err) {
                    setError("Oops! We couldn't retrieve your order details. Please try again.");
                    console.error("Error fetching order details:", err);
                }
            };
            fetchOrderDetails();
        } else {
            setError("Invalid session. No order details found.");
        }
    }, [session_id]);

    if (error) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center text-center">
                <h1 className="text-2xl font-semibold text-red-600">⚠️ Payment Success, but an Error Occurred</h1>
                <p className="text-gray-600">{error}</p>
                <Link href="/products" className="mt-4 text-blue-500 hover:underline">
                    Go to Products
                </Link>
            </div>
        );
    }

    if (!orderDetails) {
        return <div className="text-xl text-center animate-pulse">Loading order details...</div>;
    }

    return (
        <div className="min-h-screen bg-green-50 p-6 flex flex-col items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
                <h1 className="text-3xl font-semibold text-green-600 flex items-center justify-center space-x-2">
                    ✅ <span>Payment Successful!</span>
                </h1>
                <p className="text-gray-700 mt-4">Thank you for your purchase! Your order has been confirmed.</p>

                <div className="mt-6 text-left">
                    <h2 className="text-lg font-semibold">Order Details</h2>
                    <p><strong>Order ID:</strong> {orderDetails.orderId}</p>
                    <p><strong>Total Amount:</strong> ${orderDetails.totalAmount}</p>
                    <p><strong>Status:</strong> {orderDetails.status}</p>
                    <p><strong>Purchase Date:</strong> {new Date(orderDetails.createdAt).toLocaleString()}</p>
                    
                    {orderDetails.items && orderDetails.items.length > 0 && (
                        <div className="mt-4">
                            <h3 className="text-md font-semibold">Purchased Items:</h3>
                            <ul className="list-disc list-inside">
                                {orderDetails.items.map((item) => (
                                    <li key={item.id} className="text-gray-700">
                                        {item.name} - ${item.price} x {item.quantity}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="mt-6">
                    <Link
                        href="/products"
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                    >
                        Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
}

// ✅ Wrap in <Suspense> to fix Next.js build issue
export default function PaymentSuccess() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xl">Loading...</div>}>
            <PaymentSuccessContent />
        </Suspense>
    );
}
