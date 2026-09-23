# TaskLite

TaskLite is a small full-stack task tracker built for **learning and practice**. It is an exercise in Next.js, TypeScript, Prisma, and SQLite—not a production-ready application.

## What it covers

- Create, view, edit, and delete tasks with Server Actions
- Search by title and filter by status through a `GET /api/tasks` Route Handler
- Client Components for interactive, debounced filtering
- Prisma queries against a local SQLite database
- Data caching and invalidation after task changes
- Responsive styling with Tailwind CSS

## Run locally

1. Install dependencies: `npm install`
2. Create a `.env` file in the project root with `DATABASE_URL="file:./dev.db"`
3. Apply the database migration: `npx prisma migrate dev`
4. Generate the Prisma Client: `npx prisma generate`
5. Start the app: `npm run dev`

Open [http://localhost:3000](http://localhost:3000). The task API is available at `/api/tasks`, with optional `search` and `status` query parameters.

Run `npm run lint` for lint checks and `npm run build` to verify a production build.

## Note

This project intentionally keeps the scope small for hands-on practice. It does not include authentication, authorization, or production deployment setup.
