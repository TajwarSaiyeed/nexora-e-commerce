const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// @route   GET /api/products
// @desc    Get all products
// @access  Public
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/products/:id
// @desc    Get single product
// @access  Public
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      data: product,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
