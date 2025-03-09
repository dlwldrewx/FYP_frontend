"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "https://fyp-production-61ab.up.railway.app"}/api/products`);
        if (!res.ok) throw new Error("Failed to fetch products");

        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item.id === product._id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({
        id: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart!`);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-semibold mb-6">Our Products</h1>
      {products.length === 0 ? (
        <p className="text-center text-lg">No products available.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div key={product._id} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
              <img
                src={product.imageUrl || "/default-product-image.jpg"}
                alt={product.name}
                className="w-full h-56 object-cover rounded-lg mb-4"
              />
              <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-500 mb-4">{product.description}</p>
              <p className="text-lg font-semibold text-blue-500 mb-4">${product.price.toFixed(2)}</p>

              <div className="flex justify-between">
                <Link href={`/products/${product._id}`}>
                  <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-400 transition">
                    View Product
                  </button>
                </Link>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
