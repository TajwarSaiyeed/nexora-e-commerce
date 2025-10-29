# Nexora E‑Commerce

A minimal full‑stack e‑commerce demo. Frontend is a React + Vite app with a modern UI; backend is a Node.js + Express API using MongoDB via Mongoose. Products auto‑seed on first run and checkout is mock (no real payments).

## Project structure

- `frontend/` — React (Vite), Tailwind CSS UI, product grid, cart sidebar, checkout and receipt modals.
- `backend/` — Express REST API with MongoDB, products/cart/checkout endpoints, simple error handling and health check.

## Backend (API)

- Tech: Node.js, Express 5, MongoDB, Mongoose, CORS, dotenv.
- Env: set `MONGODB_URI` and optional `PORT` (default 5000).
- On start: connects to MongoDB and seeds sample products if none exist.
- Key endpoints:
  - `GET /` basic API info
  - `GET /api/health` health check
  - `GET /api/products` list products
  - `GET /api/cart` get cart (mock user)
  - `POST /api/cart` add item
  - `PUT /api/cart/:itemId` update quantity
  - `DELETE /api/cart/:itemId` remove item
  - `DELETE /api/cart` clear cart
  - `POST /api/checkout` mock checkout (validates name/email, creates order, returns receipt)
- Scripts: `pnpm dev` (watch), `pnpm start`.

## Frontend (Web app)

- Tech: React 19, Vite, Tailwind CSS.
- Env: set `VITE_API_URL` to the backend API base (defaults to `http://localhost:5000/api`).
- Features: product grid, add/update/remove cart items, clear cart, mock checkout with receipt.
- Scripts: `pnpm dev` (local dev), `pnpm build`, `pnpm preview`.

## Quick start

1. Backend

```
cd backend
cp .env.example .env
pnpm install
pnpm dev
```

2. Frontend

```
cd frontend
cp .env.example .env
pnpm install
pnpm dev
```

## Notes

- Checkout is mock only; no payment processing.
- A single mock user is used for the cart in the API.
- Product images are remote placeholders.
