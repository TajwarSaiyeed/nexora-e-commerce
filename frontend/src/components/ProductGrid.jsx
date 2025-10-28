import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import ProductCard from "./ProductCard";
import { api } from "../lib/api";

export default function ProductGrid({ onCartUpdate }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await api.getProducts();
        setProducts(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = async (productId) => {
    try {
      const cartData = await api.addToCart(productId, 1);
      onCartUpdate(cartData);
    } catch (err) {
      console.error("Failed to add to cart:", err);
      alert(err.message || "Failed to add to cart");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-lg border border-destructive bg-destructive/10 p-4 text-destructive">
        <p className="font-semibold">Error loading products</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product._id}
          product={product}
          onAddToCart={() => handleAddToCart(product._id)}
        />
      ))}
    </div>
  );
}
