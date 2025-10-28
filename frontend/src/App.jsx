import { useState, useEffect } from "react";
import { ShoppingCart } from "lucide-react";
import ProductGrid from "./components/ProductGrid";
import CartSidebar from "./components/CartSidebar";
import CheckoutModal from "./components/CheckoutModal";
import ReceiptModal from "./components/ReceiptModal";
import { api } from "./lib/api";
import "./App.css";

function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [cartData, setCartData] = useState({
    items: [],
    total: 0,
    itemCount: 0,
  });
  const [cartRefetchKey, setCartRefetchKey] = useState(0);

  // Fetch cart on initial load
  useEffect(() => {
    const fetchInitialCart = async () => {
      try {
        const data = await api.getCart();
        setCartData(data);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      }
    };
    fetchInitialCart();
  }, []);

  // Handle checkout
  const handleCheckout = (receiptData) => {
    setReceipt(receiptData);
    setCartData({ items: [], total: 0, itemCount: 0 });
    setIsCheckoutOpen(false);
    setIsCartOpen(false); // Close cart sidebar
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-card shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <span className="text-lg font-bold text-primary-foreground">
                  N
                </span>
              </div>
              <h1 className="text-2xl font-bold text-foreground">
                Nexora E-Commerce
              </h1>
            </div>
            <button
              onClick={() => setIsCartOpen(!isCartOpen)}
              className="relative flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-primary-foreground transition-all hover:opacity-90"
            >
              <ShoppingCart className="h-5 w-5" />
              <span className="font-semibold">{cartData.itemCount}</span>
              {cartData.itemCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                  {cartData.itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)] overflow-hidden">
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-foreground">
                Featured Products
              </h2>
              <p className="mt-2 text-muted-foreground">
                Discover our curated collection of premium items
              </p>
            </div>
            <ProductGrid
              onCartUpdate={(data) => {
                setCartData(data);
                setCartRefetchKey((prev) => prev + 1);
              }}
            />
          </div>
        </main>

        {isCartOpen && (
          <>
            {/* Backdrop */}
            <div
              className="fixed inset-0 z-30 bg-black/50 lg:hidden"
              onClick={() => setIsCartOpen(false)}
            />
            {/* Cart Sidebar */}
            <div className="fixed right-0 top-[73px] z-40 h-[calc(100vh-73px)] w-full max-w-sm border-l border-border bg-background shadow-lg lg:relative lg:top-0 lg:h-full lg:max-w-sm lg:shadow-none">
              <CartSidebar
                key={`cart-${cartRefetchKey}`}
                onCheckout={() => setIsCheckoutOpen(true)}
                onClose={() => setIsCartOpen(false)}
                onCartUpdate={setCartData}
                refetchKey={cartRefetchKey}
              />
            </div>
          </>
        )}
      </div>

      {/* Checkout Modal */}
      {isCheckoutOpen && (
        <CheckoutModal
          total={cartData.total}
          itemCount={cartData.itemCount}
          onCheckout={handleCheckout}
          onClose={() => setIsCheckoutOpen(false)}
        />
      )}

      {/* Receipt Modal */}
      {receipt && (
        <ReceiptModal receipt={receipt} onClose={() => setReceipt(null)} />
      )}
    </div>
  );
}

export default App;
