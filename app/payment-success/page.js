"use client"; // ✅ Required for client-side hooks

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

function PaymentSuccessContent() {
    const searchParams = useSearchParams();
    const session_id = searchParams.get("session_id");
    const [orderDetails, setOrderDetails] = useState(null);

    useEffect(() => {
        if (session_id) {
            const fetchOrderDetails = async () => {
                try {
                    const response = await fetch(`/api/order-details?session_id=${session_id}`);
                    if (!response.ok) throw new Error("Failed to fetch order details");
                    
                    const data = await response.json();
                    setOrderDetails(data);
                } catch (error) {
                    console.error("Error fetching order details:", error);
                }
            };
            fetchOrderDetails();
        }
    }, [session_id]);

    if (!orderDetails) {
        return <div className="text-xl text-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-green-50 p-6 flex flex-col items-center justify-center">
            <h1 className="text-3xl font-semibold mb-6 text-green-600">Payment Successful!</h1>
            <p className="mb-4">Thank you for your purchase! Your order has been confirmed.</p>
            
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-xl font-semibold mb-2">Order Details</h2>
                <p><strong>Order ID:</strong> {orderDetails.orderId}</p>
                <p><strong>Total Amount:</strong> ${orderDetails.totalAmount}</p>
                <p><strong>Status:</strong> {orderDetails.status}</p>
                <div className="mt-4 text-center">
                    <Link href="/products" className="text-blue-500 hover:underline">
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
