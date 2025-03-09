"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token); // Convert token to boolean
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token"); // Remove token
        setIsLoggedIn(false);
        router.push("/login"); // Redirect to login
    };

    return (
        <header className="bg-blue-500 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link href="/" className="text-2xl font-semibold">E-Commerce</Link>
                
                <nav>
                    <ul className="flex space-x-6">
                        <li>
                            <Link href="/" className="hover:text-blue-300">Home</Link>
                        </li>
                        <li>
                            <Link href="/products" className="hover:text-blue-300">Products</Link>
                        </li>
                        <li>
                            <Link href="/cart" className="hover:text-blue-300">Cart</Link>
                        </li>
                        <li>
                            <Link href="/checkout" className="hover:text-blue-300">Checkout</Link>
                        </li>
                        <li>
                            {isLoggedIn ? (
                                <button 
                                    onClick={handleLogout} 
                                    className="hover:text-red-300 transition duration-200"
                                >
                                    Logout
                                </button>
                            ) : (
                                <Link href="/login" className="hover:text-green-300">
                                    Login
                                </Link>
                            )}
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
