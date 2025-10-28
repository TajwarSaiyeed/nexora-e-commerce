const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const Product = require("../models/Product");

const MOCK_USER_ID = "mock-user-123";

const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ userId });
  if (!cart) {
    cart = new Cart({ userId, items: [] });
    await cart.save();
  }
  return cart;
};

// @route   GET /api/cart
// @desc    Get cart with total
// @access  Public
router.get("/", async (req, res, next) => {
  try {
    const cart = await getOrCreateCart(MOCK_USER_ID);
    await cart.populate("items.productId");
    await cart.calculateTotal();
    await cart.save();

    res.json({
      success: true,
      data: {
        items: cart.items.map((item) => ({
          _id: item._id,
          product: {
            _id: item.productId._id,
            name: item.productId.name,
            price: item.productId.price,
            image: item.productId.image,
          },
          quantity: item.quantity,
          subtotal: item.productId.price * item.quantity,
        })),
        total: cart.total,
        itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0),
      },
    });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/cart
// @desc    Add item to cart
// @access  Public
router.post("/", async (req, res, next) => {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }

    if (quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Quantity must be at least 1",
      });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.stock} items available in stock`,
      });
    }

    const cart = await getOrCreateCart(MOCK_USER_ID);

    const existingItem = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (existingItem) {
      const newQuantity = existingItem.quantity + quantity;
      if (product.stock < newQuantity) {
        return res.status(400).json({
          success: false,
          message: `Only ${product.stock} items available in stock`,
        });
      }
      existingItem.quantity = newQuantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    await cart.populate("items.productId");
    await cart.calculateTotal();
    await cart.save();

    res.json({
      success: true,
      message: "Item added to cart",
      data: {
        items: cart.items.map((item) => ({
          _id: item._id,
          product: {
            _id: item.productId._id,
            name: item.productId.name,
            price: item.productId.price,
            image: item.productId.image,
          },
          quantity: item.quantity,
          subtotal: item.productId.price * item.quantity,
        })),
        total: cart.total,
        itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0),
      },
    });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/cart/:id
// @desc    Update cart item quantity
// @access  Public
router.put("/:id", async (req, res, next) => {
  try {
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Valid quantity is required (minimum 1)",
      });
    }

    const cart = await getOrCreateCart(MOCK_USER_ID);
    const item = cart.items.id(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    // Check stock
    const product = await Product.findById(item.productId);
    if (product.stock < quantity) {
      return res.status(400).json({
        success: false,
        message: `Only ${product.stock} items available in stock`,
      });
    }

    item.quantity = quantity;
    await cart.save();
    await cart.populate("items.productId");
    await cart.calculateTotal();
    await cart.save();

    res.json({
      success: true,
      message: "Cart updated",
      data: {
        items: cart.items.map((item) => ({
          _id: item._id,
          product: {
            _id: item.productId._id,
            name: item.productId.name,
            price: item.productId.price,
            image: item.productId.image,
          },
          quantity: item.quantity,
          subtotal: item.productId.price * item.quantity,
        })),
        total: cart.total,
        itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0),
      },
    });
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/cart/:id
// @desc    Remove item from cart
// @access  Public
router.delete("/:id", async (req, res, next) => {
  try {
    const cart = await getOrCreateCart(MOCK_USER_ID);

    const itemIndex = cart.items.findIndex(
      (item) => item._id.toString() === req.params.id
    );

    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Cart item not found",
      });
    }

    cart.items.splice(itemIndex, 1);
    await cart.save();
    await cart.populate("items.productId");
    await cart.calculateTotal();
    await cart.save();

    res.json({
      success: true,
      message: "Item removed from cart",
      data: {
        items: cart.items.map((item) => ({
          _id: item._id,
          product: {
            _id: item.productId._id,
            name: item.productId.name,
            price: item.productId.price,
            image: item.productId.image,
          },
          quantity: item.quantity,
          subtotal: item.productId.price * item.quantity,
        })),
        total: cart.total,
        itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0),
      },
    });
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/cart
// @desc    Clear entire cart
// @access  Public
router.delete("/", async (req, res, next) => {
  try {
    const cart = await getOrCreateCart(MOCK_USER_ID);
    cart.items = [];
    cart.total = 0;
    await cart.save();

    res.json({
      success: true,
      message: "Cart cleared",
      data: {
        items: [],
        total: 0,
        itemCount: 0,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
