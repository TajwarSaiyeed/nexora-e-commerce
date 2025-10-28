import { useState, useEffect } from "react";
import { X, Trash2, Plus, Minus, Loader2 } from "lucide-react";
import { Button } from "./button";
import { api } from "../lib/api";

export default function CartSidebar({ onCheckout, onClose, onCartUpdate }) {
  const [cart, setCart] = useState({ items: [], total: 0, itemCount: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const cartData = await api.getCart();
      setCart(cartData);
      onCartUpdate(cartData);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (itemId) => {
    try {
      const cartData = await api.removeFromCart(itemId);
      setCart(cartData);
      onCartUpdate(cartData);
    } catch (err) {
      console.error("Failed to remove item:", err);
      alert("Failed to remove item");
    }
  };

  const handleUpdateQuantity = async (itemId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemove(itemId);
      return;
    }
    try {
      const cartData = await api.updateCartItem(itemId, newQuantity);
      setCart(cartData);
      onCartUpdate(cartData);
    } catch (err) {
      console.error("Failed to update quantity:", err);
      alert("Failed to update quantity");
    }
  };

  return (
    <div className="flex h-full flex-col bg-card">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border p-4">
        <h2 className="text-lg font-bold text-foreground">Shopping Cart</h2>
        <button onClick={onClose} className="rounded-lg p-1 hover:bg-muted">
          <X className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>

      {/* Items */}
      <div className="flex-1 overflow-y-auto p-4">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : cart.items.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-8">
            Your cart is empty
          </p>
        ) : (
          <div className="space-y-4">
            {cart.items.map((item) => (
              <div
                key={item._id}
                className="flex gap-3 rounded-lg border border-border p-3"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="h-16 w-16 rounded object-cover"
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/64?text=Product";
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground text-sm line-clamp-2">
                    {item.product.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    ${item.product.price.toFixed(2)} each
                  </p>
                  <p className="text-sm font-bold text-primary mt-1">
                    ${item.subtotal.toFixed(2)}
                  </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                  {/* Quantity Controls */}
                  <div className="flex items-center gap-1 rounded border border-border">
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item._id, item.quantity - 1)
                      }
                      className="rounded p-1 hover:bg-muted"
                    >
                      <Minus className="h-3 w-3 text-muted-foreground" />
                    </button>
                    <span className="w-8 text-center text-sm font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        handleUpdateQuantity(item._id, item.quantity + 1)
                      }
                      className="rounded p-1 hover:bg-muted"
                    >
                      <Plus className="h-3 w-3 text-muted-foreground" />
                    </button>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemove(item._id)}
                    className="rounded p-1 hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      {cart.items.length > 0 && (
        <div className="border-t border-border p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-foreground">Total:</span>
            <span className="text-2xl font-bold text-primary">
              ${cart.total.toFixed(2)}
            </span>
          </div>
          <Button
            onClick={onCheckout}
            className="w-full bg-primary hover:bg-primary/90"
          >
            Proceed to Checkout
          </Button>
        </div>
      )}
    </div>
  );
}
