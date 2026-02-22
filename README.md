# Aurevia Overseas - Premium Agricultural Exports & Indian Handicrafts

A React + TypeScript website with a Node/Express backend for product CRUD and admin login.

## Features

- 🌾 Product listing page with API-backed product data
- 🔐 Admin panel login + add/update/delete products
- 💬 Customer testimonials
- 📝 Quote request form
- 🌍 Global presence information
- 📱 Fully responsive design

## Tech Stack

- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool & Dev Server
- **Tailwind CSS** - Styling
- **Express** - Backend API
- **PostgreSQL** - Persistent database
- **JWT** - Admin authentication

## Getting Started

### Prerequisites

- Node.js 16+ and npm
- PostgreSQL database (Neon, Supabase, Vercel Postgres, or any hosted Postgres)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Set environment variables:

```bash
DATABASE_URL=postgresql://user:password@host:5432/dbname
ADMIN_USERNAME=admin
ADMIN_PASSWORD=admin123
ADMIN_JWT_SECRET=replace_with_strong_secret
```

If your Postgres provider does not require SSL in local/dev:

```bash
PGSSL_DISABLE=true
```

4. Start the app:

```bash
npm run dev
```

The frontend runs on `http://localhost:5173` (or next free port), backend on `http://localhost:3001`.

## Available Scripts

- `npm run dev` - Start frontend + backend
- `npm run dev:client` - Start only Vite frontend
- `npm run dev:server` - Start only API server
- `npm run start:server` - Start API server
- `npm run build` - Build frontend for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Run TypeScript type checking

## Admin Panel Login

- Open hidden admin page with keyboard shortcut: `Ctrl + Shift + A`
- Default credentials: `admin` / `admin123`
- Override credentials via env vars:
	- `ADMIN_USERNAME`
	- `ADMIN_PASSWORD`
	- `ADMIN_JWT_SECRET`

## Project Structure

```
src/
├── components/          # React components
├── lib/
│   ├── productsApi.ts   # Frontend API client
│   └── mockData.ts      # Shared types

server/
├── app.js               # Express routes + JWT auth
├── db.js                # PostgreSQL connection + schema/seed init
├── index.js             # Local backend entrypoint
└── seedProducts.js      # Initial seed data

api/
└── index.js             # Vercel serverless adapter
```

## Vercel Backend Deployment

1. Import this repository in Vercel.
2. Add environment variables in Vercel project settings:
	 - `DATABASE_URL`
	 - `ADMIN_USERNAME`
	 - `ADMIN_PASSWORD`
	 - `ADMIN_JWT_SECRET`
3. Deploy. API endpoints are served under `/api/*` using `vercel.json`.

## Building for Production

```bash
npm run build
```

Frontend build output is in `dist/`.

