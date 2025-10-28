const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1,
  },
});

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      default: "mock-user-123", // Mock user for now
      required: true,
    },
    items: [cartItemSchema],
    total: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

// Method to calculate total
cartSchema.methods.calculateTotal = async function () {
  await this.populate("items.productId");

  this.total = this.items.reduce((sum, item) => {
    return sum + item.productId.price * item.quantity;
  }, 0);

  return this.total;
};

module.exports = mongoose.model("Cart", cartSchema);
