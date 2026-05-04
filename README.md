# ABN Technologist

Single Next.js 14 project for portfolio UI + API routes, ready for Vercel with Neon PostgreSQL.

## Architecture

- `app/page.jsx`: renders the legacy HTML portfolio through Next.js.
- `app/api/**`: all backend APIs migrated from Express into Next Route Handlers.
- `lib/server/db.cjs`: shared PostgreSQL pool for local and serverless runtime.
- `database/migrate.js`: creates required tables and indexes.

## Local Setup

```bash
npm install
cp .env.example .env
npm run db:migrate
npm run dev
```

Open `http://localhost:3000`.

## Deploy To Vercel + Neon

1. Create a Neon database and copy the pooled `DATABASE_URL`.
2. In Vercel project settings, add env vars from `.env.example`.
3. Set `DATABASE_URL` to your Neon connection string.
4. Deploy with Vercel (Git integration or `vercel --prod`).
5. Run migrations once:

```bash
npm run db:migrate
```

You can run migrations from your local machine against Neon, or via a CI job.
No VPS, PM2, or Nginx setup is required for deployment.

## API Endpoints

- `POST /api/contact`
- `GET /api/contact` (admin secret auth)
- `GET /api/ventures`
- `GET /api/ventures/stats`
- `GET /api/ventures/:id`
- `GET /api/projects`
- `GET /api/projects/stats`
- `GET /api/projects/:id`
- `POST /api/analytics/pageview`
- `POST /api/analytics/event`
- `GET /api/analytics/summary` (admin secret auth)
- `POST /api/admin/login`
- `GET /api/admin/dashboard` (JWT admin auth)
- `PATCH /api/admin/contacts/:id` (JWT admin auth)
- `DELETE /api/admin/contacts/:id` (JWT admin auth)
- `GET /api/auth/linkedin`
- `GET /api/auth/linkedin/callback`
- `POST /api/auth/verify`
- `GET /api/health`
