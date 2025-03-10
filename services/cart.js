const API_URL = "https://fyp-production-61ab.up.railway.app/api/cart";

export const getCart = async (token) => {
    const res = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to fetch cart");
    return res.json();
};

export const addToCart = async (productId, quantity, token) => {
    const res = await fetch(`${API_URL}/add`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
    });
    if (!res.ok) throw new Error("Failed to add item");
    return res.json();
};

export const removeFromCart = async (productId, token) => {
    const res = await fetch(`${API_URL}/remove/${productId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Failed to remove item");
    return res.json();
};

export const updateCartItem = async (productId, quantity, token) => {
    const res = await fetch(`${API_URL}/update`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
    });
    if (!res.ok) throw new Error("Failed to update cart");
    return res.json();
};
