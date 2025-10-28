import { useState } from "react";
import { ShoppingCart, Check } from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";

export default function ProductCard({ product, onAddToCart }) {
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart();
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      {/* Product Image */}
      <div className="relative h-48 w-full overflow-hidden bg-muted">
        <img
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          className="h-full w-full object-cover transition-transform hover:scale-105"
          onError={(e) => {
            e.target.src =
              "https://via.placeholder.com/400x300?text=Product+Image";
          }}
        />
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground line-clamp-2 min-h-12">
          {product.name}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {product.description}
        </p>

        {/* Price and Button */}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            ${product.price.toFixed(2)}
          </span>
          <Button
            onClick={handleAddToCart}
            className={`transition-all ${
              isAdded
                ? "bg-green-600 hover:bg-green-700"
                : "bg-primary hover:bg-primary/90"
            }`}
            size="sm"
          >
            {isAdded ? (
              <Check className="h-4 w-4" />
            ) : (
              <ShoppingCart className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </Card>
  );
}
