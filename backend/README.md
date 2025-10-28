# Nexora E-Commerce Backend API

A RESTful API for a mock e-commerce shopping cart application built with Express.js and MongoDB.

## 🚀 Features

- **Product Management**: Browse 10 mock products
- **Shopping Cart**: Add, update, remove items with real-time total calculation
- **Checkout**: Mock checkout process with order receipt generation
- **Database Persistence**: MongoDB for cart and order storage
- **Error Handling**: Comprehensive validation and error responses
- **CORS Enabled**: Ready for frontend integration

## 📋 Prerequisites

- Node.js (v16 or higher)
- MongoDB (running locally or connection string)
- pnpm (or npm/yarn)

## 🛠️ Installation

1. **Install dependencies:**

```bash
cd backend
pnpm install
```

2. **Configure environment variables:**

Edit the `.env` file with your MongoDB connection:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/nexora-ecom
NODE_ENV=development
```

3. **Start MongoDB:**

```bash
# If using local MongoDB
mongod
```

## 🎯 Running the Server

### Development mode (with auto-reload):

```bash
pnpm dev
```

### Production mode:

```bash
pnpm start
```

The server will start on `http://localhost:5000`

## 📚 API Endpoints

### Health Check

- `GET /` - API information
- `GET /api/health` - Health status

### Products

- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Cart

- `GET /api/cart` - Get cart with items and total
- `POST /api/cart` - Add item to cart
  ```json
  {
    "productId": "6xxxxx",
    "quantity": 1
  }
  ```
- `PUT /api/cart/:id` - Update cart item quantity
  ```json
  {
    "quantity": 3
  }
  ```
- `DELETE /api/cart/:id` - Remove item from cart
- `DELETE /api/cart` - Clear entire cart

### Checkout

- `POST /api/checkout` - Process checkout
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com"
  }
  ```
- `GET /api/checkout/orders` - Get all orders (testing)
- `GET /api/checkout/orders/:id` - Get single order

## 📦 Response Format

### Success Response

```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

### Error Response

```json
{
  "success": false,
  "message": "Error description"
}
```

## 🧪 Testing the API

### Using cURL:

**Get all products:**

```bash
curl http://localhost:5000/api/products
```

**Add to cart:**

```bash
curl -X POST http://localhost:5000/api/cart \
  -H "Content-Type: application/json" \
  -d '{"productId":"PRODUCT_ID","quantity":2}'
```

**Get cart:**

```bash
curl http://localhost:5000/api/cart
```

**Checkout:**

```bash
curl -X POST http://localhost:5000/api/checkout \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com"}'
```

### Using Postman:

Import the endpoints above into Postman and test with the request bodies provided.

## 🗃️ Database Schema

### Product

- `name`: String (required)
- `price`: Number (required, min: 0)
- `description`: String
- `category`: String
- `image`: String (URL)
- `stock`: Number (default: 100)

### Cart

- `userId`: String (mock user ID)
- `items`: Array of cart items
  - `productId`: ObjectId (reference to Product)
  - `quantity`: Number (min: 1)
- `total`: Number (calculated)

### Order

- `userId`: String
- `customerName`: String (required)
- `customerEmail`: String (required)
- `items`: Array of order items
- `total`: Number (required)
- `status`: String (enum: pending/completed/cancelled)

## 🔧 Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── middleware/
│   │   └── errorHandler.js       # Error handling middleware
│   ├── models/
│   │   ├── Product.js            # Product schema
│   │   ├── Cart.js               # Cart schema
│   │   └── Order.js              # Order schema
│   ├── routes/
│   │   ├── products.js           # Product routes
│   │   ├── cart.js               # Cart routes
│   │   └── checkout.js           # Checkout routes
│   ├── utils/
│   │   └── seedProducts.js       # Database seeding
│   └── server.js                 # Main application file
├── .env                          # Environment variables
├── package.json
└── README.md
```

## 🌟 Features Implemented

- ✅ RESTful API design
- ✅ MongoDB integration with Mongoose ODM
- ✅ 10 mock products with images
- ✅ Full cart CRUD operations
- ✅ Real-time cart total calculation
- ✅ Mock checkout with receipt generation
- ✅ Input validation and error handling
- ✅ CORS enabled for frontend integration
- ✅ Database persistence
- ✅ Stock validation
- ✅ Automatic product seeding

## 🚧 Mock User

Currently using a mock user ID (`mock-user-123`) for cart operations. In production, this would be replaced with actual user authentication.

## 📝 Notes

- This is a **mock checkout** - no real payment processing
- Cart persists in MongoDB across sessions
- Products are automatically seeded on first run
- All prices are in USD

## 🤝 Integration with Frontend

The API is CORS-enabled and ready to connect with a React frontend. Base URL: `http://localhost:5000/api`
