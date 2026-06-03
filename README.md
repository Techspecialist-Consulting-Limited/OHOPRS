# OHOPRS — One Humanitarian & Poverty Response System

National unified platform for coordinating humanitarian and poverty-alleviation interventions across agencies.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Database:** PostgreSQL (with Prisma 7 ORM)
- **Auth:** NextAuth.js v5 (credentials)
- **UI:** Tailwind CSS + Recharts
- **State:** TanStack React Query

## Prerequisites

- Node.js 20+
- PostgreSQL 16+ (local or [Neon](https://neon.tech) free tier)

## Quick Start

### 1. Setup the Database

**Option A: Docker (recommended)**
```bash
docker compose up -d
```

**Option B: Neon (free hosted Postgres)**
1. Create a free account at [neon.tech](https://neon.tech)
2. Create a project and copy the connection string
3. Update `.env` with your connection string

### 2. Configure Environment

```bash
cp .env.example .env
# Edit .env with your DATABASE_URL and a random NEXTAUTH_SECRET
```

### 3. Install & Migrate

```bash
npm install
npx prisma migrate dev --name init
npm run seed
```

### 4. Run

```bash
npm run dev
# Open http://localhost:3000
```

## Demo Credentials

| Email | Password | Role |
|---|---|---|
| minister@ohoprs.gov.ng | password123 | Minister (national view) |
| admin@ncto.gov.ng | password123 | Agency Admin (NCTO) |
| admin@geep.gov.ng | password123 | Agency Admin (GEEP) |
| admin@nema.gov.ng | password123 | Agency Admin (NEMA) |
| admin@redcross.ng | password123 | Agency Admin (NRCS) |
| ops@ncto.gov.ng | password123 | Operations (NCTO) |
| partner@worldbank.org | password123 | Partner (limited view) |
| auditor@finance.gov.ng | password123 | View-Only (national) |

## Project Structure

```
ohoprs/
├── prisma/
│   ├── schema.prisma        # Data model
│   ├── seed.ts              # Seed data
│   └── migrations/
├── src/
│   ├── app/
│   │   ├── (auth)/login/    # Login page
│   │   ├── (dashboard)/
│   │   │   ├── national/    # Ministry dashboard
│   │   │   ├── agency/      # Agency dashboard
│   │   │   ├── interventions/ # CRUD
│   │   │   ├── beneficiaries/ # CRUD
│   │   │   └── programmes/  # List
│   │   └── api/             # REST endpoints
│   ├── components/
│   │   ├── dashboard/       # Sidebar, stat cards
│   │   └── providers.tsx    # React Query provider
│   ├── lib/
│   │   ├── auth.ts          # NextAuth config
│   │   ├── prisma.ts        # DB client
│   │   └── utils.ts         # Helpers
│   ├── types/               # TypeScript types
│   └── proxy.ts             # RBAC middleware
```

## API Endpoints

| Method | Path | Description |
|---|---|---|
| POST | `/api/auth/...` | Authentication |
| GET/POST | `/api/agencies` | List / Create |
| GET/PATCH | `/api/agencies/[id]` | Detail / Update |
| GET/POST | `/api/interventions` | List (filtered) / Create |
| GET/PATCH | `/api/interventions/[id]` | Detail / Update |
| PATCH | `/api/interventions/[id]/status` | Status transition |
| GET/POST | `/api/beneficiaries` | List / Register (with dedup) |
| GET/PATCH | `/api/beneficiaries/[id]` | Detail / Update |
| POST | `/api/beneficiaries/enroll` | Enroll in intervention |
| GET/POST | `/api/programmes` | List / Create |
| GET | `/api/dashboard/national` | National aggregate stats |
| GET | `/api/dashboard/agency/[id]` | Agency-specific stats |

## Deploy to Vercel

1. Push to GitHub
2. Import repo in Vercel
3. Set environment variables:
   - `DATABASE_URL` — your Neon PostgreSQL connection string
   - `NEXTAUTH_SECRET` — generate with `openssl rand -base64 32`
   - `NEXTAUTH_URL` — your Vercel deployment URL
4. Deploy

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run seed` | Seed database with demo data |
| `npm run db:migrate` | Run Prisma migrations |
| `npm run db:studio` | Open Prisma Studio (DB GUI) |
| `npm run db:reset` | Reset database (drops all data) |
