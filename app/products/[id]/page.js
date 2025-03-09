"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation"; // ✅ Use useParams instead of useRouter

export default function ProductDetail() {
  const { id } = useParams(); // ✅ Get product ID from the URL
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1); // Default quantity is 1

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const res = await fetch(`http://localhost:5000/api/products/${id}`);
          const data = await res.json();
          setProduct(data);
        } catch (err) {
          console.error("Error fetching product:", err);
        }
      };

      fetchProduct();
    }
  }, [id]);

  const handleAddToCart = () => {
    if (!product) return;

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingItem = cart.find((item) => item.id === product._id);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: product._id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: quantity,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    alert("Product added to cart!");
  };

  if (!product) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-4">{product.name}</h1>
        <img
          src={product.imageUrl || "/default-product-image.jpg"}
          alt={product.name}
          className="w-full h-96 object-cover rounded-lg mb-4"
        />
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-lg font-semibold text-blue-500 mb-4">${product.price}</p>

        <div className="flex items-center space-x-4">
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-16 p-2 border rounded-lg"
          />
          <button
            onClick={handleAddToCart}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-400"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
