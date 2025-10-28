import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";
import { api } from "../lib/api";

export default function CheckoutModal({
  total,
  itemCount,
  onCheckout,
  onClose,
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Please enter your name");
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailPattern.test(email)) {
      setError("Please enter a valid email");
      return;
    }

    setIsLoading(true);
    try {
      const receipt = await api.checkout(name, email);
      onCheckout(receipt);
    } catch (err) {
      setError(err.message || "Checkout failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <Card className="w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border bg-card p-6">
          <h2 className="text-xl font-bold text-foreground">Checkout</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1 hover:bg-muted"
            disabled={isLoading}
          >
            <X className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Order Summary */}
          <div className="rounded-lg bg-muted p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Items:</span>
              <span className="font-semibold text-foreground">{itemCount}</span>
            </div>
            <div className="mt-2 flex items-center justify-between border-t border-border pt-2">
              <span className="font-semibold text-foreground">Total:</span>
              <span className="text-xl font-bold text-primary">
                ${total.toFixed(2)}
              </span>
            </div>
          </div>

          {/* Form Fields */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john@example.com"
              className="w-full rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              disabled={isLoading}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="rounded-lg border border-destructive bg-destructive/10 p-3 text-sm text-destructive">
              {error}
            </div>
          )}

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1 bg-transparent"
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                "Complete Purchase"
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
