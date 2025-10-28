import {
  X,
  Check,
  Download,
  ShoppingBag,
  Calendar,
  Mail,
  User,
} from "lucide-react";
import { Button } from "./button";
import { Card } from "./card";

export default function ReceiptModal({ receipt, onClose, onCartClear }) {
  const handleDownload = () => {
    const receiptText = `
NEXORA E-COMMERCE - ORDER RECEIPT
================================
Order Number: ${receipt.orderNumber}
Order Date: ${new Date(receipt.timestamp).toLocaleString()}

Customer Information:
Name: ${receipt.customerName}
Email: ${receipt.customerEmail}

Order Items:
${receipt.items
  .map(
    (item) =>
      `${item.name} x${item.quantity} @ $${item.price.toFixed(
        2
      )} = $${item.subtotal.toFixed(2)}`
  )
  .join("\n")}

================================
Total: $${receipt.total.toFixed(2)}
================================

${receipt.message || "Thank you for your purchase!"}
    `.trim();

    const element = document.createElement("a");
    element.setAttribute(
      "href",
      "data:text/plain;charset=utf-8," + encodeURIComponent(receiptText)
    );
    element.setAttribute("download", `receipt-${receipt.orderNumber}.txt`);
    element.style.display = "none";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-3 sm:p-4 overflow-y-auto">
      <div className="w-full max-w-2xl my-8">
        <Card className="w-full overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
          {/* Success Header with Animation */}
          <div className="relative overflow-hidden bg-linear-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 border-b border-green-200 dark:border-green-800">
            {/* Decorative circles */}
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-green-200/30 dark:bg-green-700/30 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-emerald-200/30 dark:bg-emerald-700/30 rounded-full blur-2xl"></div>

            <div className="relative p-4 sm:p-6 md:p-8">
              <button
                onClick={onClose}
                className="absolute top-3 right-3 sm:top-4 sm:right-4 rounded-full p-1.5 sm:p-2 hover:bg-green-100 dark:hover:bg-green-900/50 transition-colors"
              >
                <X className="h-4 w-4 sm:h-5 sm:w-5 text-green-700 dark:text-green-300" />
              </button>

              <div className="flex flex-col items-center text-center">
                <div className="flex h-12 w-12 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-green-600 shadow-lg mb-3 sm:mb-4 animate-in zoom-in duration-500">
                  <Check
                    className="h-6 w-6 sm:h-8 sm:w-8 text-white"
                    strokeWidth={3}
                  />
                </div>
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-green-900 dark:text-green-100 mb-2">
                  Order Confirmed!
                </h2>
                <p className="text-xs sm:text-sm md:text-base text-green-700 dark:text-green-300">
                  Thank you for your purchase
                </p>
                <div className="mt-3 sm:mt-4 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-green-100 dark:bg-green-900/50 border border-green-300 dark:border-green-700">
                  <p className="text-xs sm:text-sm font-mono font-semibold text-green-800 dark:text-green-200">
                    #{receipt.orderNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-4 sm:p-6 md:p-8 space-y-4 sm:space-y-6">
            {/* Customer & Order Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg bg-muted/50 border border-border">
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <User className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground mb-0.5 sm:mb-1">
                    Customer
                  </p>
                  <p className="font-semibold text-foreground text-sm sm:text-base truncate">
                    {receipt.customerName}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg bg-muted/50 border border-border">
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground mb-0.5 sm:mb-1">
                    Email
                  </p>
                  <p className="font-semibold text-foreground text-sm sm:text-base truncate">
                    {receipt.customerEmail}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg bg-muted/50 border border-border sm:col-span-2">
                <div className="flex h-8 w-8 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground mb-0.5 sm:mb-1">
                    Order Date
                  </p>
                  <p className="font-semibold text-foreground text-sm sm:text-base wrap-break-word">
                    {new Date(receipt.timestamp).toLocaleString("en-US", {
                      weekday: "short",
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Items */}
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="bg-muted/50 px-3 sm:px-4 py-2.5 sm:py-3 border-b border-border">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground" />
                  <h3 className="font-semibold text-sm sm:text-base text-foreground">
                    Order Items
                  </h3>
                  <span className="ml-auto text-xs text-muted-foreground">
                    {receipt.items.length}{" "}
                    {receipt.items.length === 1 ? "item" : "items"}
                  </span>
                </div>
              </div>
              <div className="divide-y divide-border">
                {receipt.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm sm:text-base line-clamp-2 sm:line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="font-bold text-foreground text-sm sm:text-base">
                        ${item.subtotal.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="relative overflow-hidden rounded-xl bg-linear-to-br from-primary/10 to-primary/5 p-4 sm:p-6 border-2 border-primary/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl"></div>
              <div className="relative flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1">
                    Total Amount
                  </p>
                  <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-primary">
                    ${receipt.total.toFixed(2)}
                  </p>
                </div>
                <div className="flex h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 shrink-0 items-center justify-center rounded-full bg-primary/10 border-2 border-primary/20">
                  <Check
                    className="h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 text-primary"
                    strokeWidth={2.5}
                  />
                </div>
              </div>
            </div>

            {/* Message */}
            {receipt.message && (
              <div className="rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 p-3 sm:p-4">
                <p className="text-xs sm:text-sm text-blue-900 dark:text-blue-100 text-center">
                  {receipt.message}
                </p>
              </div>
            )}

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
              <Button
                onClick={handleDownload}
                variant="outline"
                className="flex-1 bg-transparent h-10 sm:h-11"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Receipt
              </Button>
              <Button
                onClick={onClose}
                className="flex-1 bg-primary hover:bg-primary/90 h-10 sm:h-11"
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
