const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Cart = require("../models/Cart");

const MOCK_USER_ID = "mock-user-123";

// @route   POST /api/checkout
// @desc    Checkout and create order
// @access  Public
router.post("/", async (req, res, next) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({
        success: false,
        message: "Name and email are required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    const cart = await Cart.findOne({ userId: MOCK_USER_ID }).populate(
      "items.productId"
    );

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart is empty",
      });
    }

    await cart.calculateTotal();

    const orderItems = cart.items.map((item) => ({
      productId: item.productId._id,
      name: item.productId.name,
      price: item.productId.price,
      quantity: item.quantity,
    }));

    const order = new Order({
      userId: MOCK_USER_ID,
      customerName: name,
      customerEmail: email,
      items: orderItems,
      total: cart.total,
    });

    await order.save();

    cart.items = [];
    cart.total = 0;
    await cart.save();

    res.json({
      success: true,
      message: "Order placed successfully",
      receipt: {
        orderId: order._id,
        orderNumber: `ORD-${Date.now()}`,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        items: order.items.map((item) => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          subtotal: item.price * item.quantity,
        })),
        total: order.total,
        timestamp: order.createdAt,
        status: order.status,
        message:
          "Thank you for your order! This is a mock checkout - no payment has been processed.",
      },
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/checkout/orders
// @desc    Get all orders (for testing)
// @access  Public
router.get("/orders", async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: MOCK_USER_ID })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/checkout/orders/:id
// @desc    Get single order
// @access  Public
router.get("/orders/:id", async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.json({
      success: true,
      data: order,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
