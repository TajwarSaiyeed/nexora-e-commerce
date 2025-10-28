const Product = require("../models/Product");

const seedProducts = async () => {
  try {
    const count = await Product.countDocuments();

    if (count > 0) {
      console.log("Products already seeded");
      return;
    }

    const products = [
      {
        name: "Wireless Headphones",
        price: 79.99,
        description: "High-quality wireless headphones with noise cancellation",
        category: "Electronics",
        image:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
        stock: 50,
      },
      {
        name: "Smart Watch",
        price: 199.99,
        description: "Feature-rich smartwatch with fitness tracking",
        category: "Electronics",
        image:
          "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
        stock: 30,
      },
      {
        name: "Laptop Backpack",
        price: 49.99,
        description: "Durable backpack with padded laptop compartment",
        category: "Accessories",
        image:
          "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400",
        stock: 75,
      },
      {
        name: "USB-C Hub",
        price: 34.99,
        description: "Multi-port USB-C hub with HDMI and card reader",
        category: "Electronics",
        image:
          "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400",
        stock: 100,
      },
      {
        name: "Mechanical Keyboard",
        price: 129.99,
        description: "RGB mechanical keyboard with brown switches",
        category: "Electronics",
        image:
          "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400",
        stock: 40,
      },
      {
        name: "Wireless Mouse",
        price: 29.99,
        description: "Ergonomic wireless mouse with precision tracking",
        category: "Electronics",
        image:
          "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400",
        stock: 80,
      },
      {
        name: "Phone Stand",
        price: 19.99,
        description: "Adjustable aluminum phone stand for desk",
        category: "Accessories",
        image:
          "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400",
        stock: 120,
      },
      {
        name: "Portable Charger",
        price: 39.99,
        description: "20000mAh portable power bank with fast charging",
        category: "Electronics",
        image:
          "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400",
        stock: 60,
      },
      {
        name: "Desk Lamp",
        price: 44.99,
        description:
          "LED desk lamp with adjustable brightness and color temperature",
        category: "Home",
        image:
          "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400",
        stock: 45,
      },
      {
        name: "Water Bottle",
        price: 24.99,
        description: "Insulated stainless steel water bottle, 32oz",
        category: "Lifestyle",
        image:
          "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400",
        stock: 90,
      },
    ];

    await Product.insertMany(products);
    console.log("✅ Products seeded successfully");
  } catch (error) {
    console.error("Error seeding products:", error);
  }
};

module.exports = seedProducts;
