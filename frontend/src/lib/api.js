const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const api = {
  // Products
  getProducts: async () => {
    const response = await fetch(`${API_BASE_URL}/products`);
    if (!response.ok) throw new Error("Failed to fetch products");
    const data = await response.json();
    return data.data;
  },

  // Cart
  getCart: async () => {
    const response = await fetch(`${API_BASE_URL}/cart`);
    if (!response.ok) throw new Error("Failed to fetch cart");
    const data = await response.json();
    return data.data;
  },

  addToCart: async (productId, quantity = 1) => {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to add to cart");
    }
    const data = await response.json();
    return data.data;
  },

  updateCartItem: async (itemId, quantity) => {
    const response = await fetch(`${API_BASE_URL}/cart/${itemId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ quantity }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to update cart");
    }
    const data = await response.json();
    return data.data;
  },

  removeFromCart: async (itemId) => {
    const response = await fetch(`${API_BASE_URL}/cart/${itemId}`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to remove from cart");
    const data = await response.json();
    return data.data;
  },

  clearCart: async () => {
    const response = await fetch(`${API_BASE_URL}/cart`, {
      method: "DELETE",
    });
    if (!response.ok) throw new Error("Failed to clear cart");
    const data = await response.json();
    return data.data;
  },

  // Checkout
  checkout: async (name, email) => {
    const response = await fetch(`${API_BASE_URL}/checkout`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || "Failed to checkout");
    }
    const data = await response.json();
    return data.receipt;
  },
};
