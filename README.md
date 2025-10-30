# Graduation Project — Full‑Stack Bags App

Simple full‑stack app for browsing “Luxury Modern Bags” with user registration and login. The backend is an Express + PostgreSQL API with JWT auth; the frontend is a React + Vite SPA that consumes the API.

## Stack

- Backend: Node.js, Express 5, PostgreSQL (`pg`), JWT (`jsonwebtoken`), CORS
- Frontend: React 19, React Router, Vite, Axios/Fetch
- Dev tooling: Nodemon, Concurrently

## Project Structure

```
.
├─ backend/
│  ├─ index.js                # Express app entry
│  ├─ db.js                   # PostgreSQL pool
│  ├─ routes/
│  │  ├─ auth.js              # /auth/register, /auth/login
│  │  └─ products.js          # /products (list)
│  ├─ package.json
│  └─ .env                    # Local environment (not committed)
├─ frontend/
│  ├─ src/
│  │  ├─ App.jsx, main.jsx
│  │  ├─ components/Navbar.jsx
│  │  └─ pages/{Home,Products,About,Contact}.jsx
│  ├─ index.html, package.json, vite.config.js
├─ package.json               # Root scripts (concurrently)
└─ README.md                  # This file
```

## Prerequisites

- Node.js 18+ and npm
- PostgreSQL 13+

## Setup

1) Clone and install dependencies

```
npm install               # at repo root (installs root dev deps)
npm install --prefix backend
npm install --prefix frontend
```

2) Backend environment

- Copy the example env and fill in values:

```
cp backend/.env.example backend/.env
```

Required variables (see `backend/db.js:1` and `backend/index.js:15`):

```
PORT=10000                 # Keep 10000 to match frontend calls
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=bagsdb
JWT_SECRET=your_strong_secret
```

3) Database schema (minimum)

Run the following SQL in your PostgreSQL database (`DB_NAME`). Adjust types as needed.

```
-- users table
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  username TEXT NOT NULL,
  password TEXT NOT NULL,          -- For demo only; hash in production
  created_at TIMESTAMP DEFAULT NOW()
);

-- products table
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  price NUMERIC(10,2),
  image TEXT,
  description TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- optional sample data
INSERT INTO products (title, price, image, description) VALUES
('Classic Tote', 129.99, 'https://picsum.photos/seed/tote/600/400', 'Timeless everyday tote.'),
('City Backpack', 149.00, 'https://picsum.photos/seed/backpack/600/400', 'Sleek urban carry.'),
('Evening Clutch', 99.50, 'https://picsum.photos/seed/clutch/600/400', 'Elegant night out.');
```

## Run

- Run frontend and backend together from the repo root:

```
npm run dev
```

By default:

- Backend runs on `http://localhost:10000` (from `backend/.env`)
- Frontend (Vite) runs on `http://localhost:5173`

Frontend pages call the API at `http://localhost:10000/...`, so ensure backend `PORT=10000` or update the frontend URLs (`frontend/src/register.jsx`, `frontend/src/Login.jsx`, `frontend/src/pages/Products.jsx`).

You can also run each part separately:

```
npm run dev --prefix backend
npm run dev --prefix frontend
```

## API

- GET `/products`
  - Returns an array of products. Expected fields used by UI: `id`, `title`, `price`, `image`.
- POST `/auth/register`
  - Body: `{ email, username, password }`
  - Returns created user without password.
- POST `/auth/login`
  - Body: `{ email, password }`
  - Returns `{ token, user }` where `token` is a JWT signed with `JWT_SECRET`.

Notes:

- CORS is enabled globally in the backend (`backend/index.js`).
- The sample code does not enforce auth middleware on `/products`; the frontend still sends an `Authorization: Bearer ...` header.
- Passwords are stored as plain text in this demo. For any real app, use a password hash (e.g., `bcrypt`) and HTTPS.

## Scripts

- Root: `npm run dev` — runs backend and frontend concurrently
- Backend: `npm run dev` — starts Express with Nodemon
- Frontend: `npm run dev` — starts Vite dev server

## Troubleshooting

- 404/Network errors from UI
  - Ensure backend is running on the same port the UI calls (`10000` by default).
- Database connection errors
  - Verify `backend/.env` DB settings and that PostgreSQL is accessible.
- JWT errors on login
  - Ensure `JWT_SECRET` is set in `backend/.env`.

## License

For academic/demonstration purposes. Replace with your preferred license.

## Docker

You can run the full stack (Postgres + API + static frontend) with Docker.

1) Build and start

```
docker compose up --build -d
```

This starts:
- Postgres on `localhost:5432`
- Backend on `http://localhost:${BACKEND_PORT:-10000}`
- Frontend (Nginx) on `http://localhost:${FRONTEND_PORT:-8080}`

2) Environment variables (Compose)

`docker-compose.yml` uses these variables with sensible defaults:

```
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=bagsdb
JWT_SECRET=changeme
BACKEND_PORT=10000
FRONTEND_PORT=8080
```

You can override them by creating a `.env` file at the repo root (not committed) or by exporting them in your shell before running Compose.

3) Database schema

Run the SQL from the “Database schema (minimum)” section against `localhost:5432` using your preferred client. The backend will connect to the `db` service internally; from your host use `localhost`.

4) Access

- Open the app at `http://localhost:8080`
- The UI calls the API at `http://localhost:10000` (as hardcoded in the frontend). Both ports are published, so this works from your browser.

5) Stop

```
docker compose down
```

Notes:
- For hot‑reload dev in containers, you could run Vite in dev mode with `--host 0.0.0.0` and mount volumes. The provided setup serves a production build via Nginx.
- If you prefer a single origin (frontend proxies API), refactor the frontend to use relative URLs (e.g., `/api`) and add an Nginx proxy location mapping to the backend.
