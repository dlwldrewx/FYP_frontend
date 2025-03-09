"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ProductDetail() {
  const params = useParams();
  const id = params?.id; // ✅ Ensure ID is retrieved correctly
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        try {
          const res = await fetch(`https://fyp-production-61ab.up.railway.app/api/products/${id}`);
          if (!res.ok) throw new Error("Failed to fetch product");
          
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

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
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
    alert(`${quantity} item(s) added to cart!`);
  };

  if (!product) return <div className="text-center text-xl">Loading product...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <div className="max-w-2xl bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-semibold mb-4">{product.name}</h1>
        <img
          src={product.imageUrl || "/default-product-image.jpg"}
          alt={product.name}
          className="w-full h-96 object-cover rounded-lg mb-4"
        />
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-lg font-semibold text-blue-500 mb-4">${product.price.toFixed(2)}</p>

        <div className="flex items-center space-x-4">
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-16 p-2 border rounded-lg text-center"
          />
          <button
            onClick={handleAddToCart}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
