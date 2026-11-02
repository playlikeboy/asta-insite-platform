# Asta Insite Platform

Two-sided marketplace for home and construction services in India: customers post requirements, subscribed providers show interest, and a mutual match opens chat. One Expo app for customers and providers; a Next.js admin dashboard that also hosts the API. Codename: Asta One (never shown to users).

## Start here

Before writing code, read in order: this file, [docs/README.md](docs/README.md), [Overview](docs/project/OVERVIEW.md), [Open decisions](docs/project/OPEN_DECISIONS.md), [System overview](docs/architecture/SYSTEM_OVERVIEW.md), the `CLAUDE.md` in the folder you will edit, then the code itself and [Project status](docs/delivery/PROJECT_STATUS.md). Write a short plan, then develop.

**Documentation is not proof.** Most of the handbook describes the plan. Only Project status says what exists. Distinguish Confirmed, Proposed, Implemented, Planned, Assumption and Open.

## Stack (accepted in [ADRs](docs/architecture/ARCHITECTURE_DECISIONS.md))

pnpm workspaces and Turborepo; TypeScript 6; Next.js 16 with shadcn/ui and Tailwind v4; Expo SDK 58 with Expo Router, HeroUI Native and Uniwind; TanStack Query; Zod; Drizzle and `pg` on PostgreSQL 18; Appwrite Cloud (Sites, Auth, Native PostgreSQL, Storage, Functions, Messaging, TablesDB for signals only); Razorpay; Vitest and Playwright. Do not swap any of these without a new ADR.

## Layout

`apps/web` admin and API. `apps/mobile` app. `packages/database` schema and migrations. `packages/contracts` shared Zod schemas. `packages/design-tokens` brand values. `packages/config` shared TS and ESLint. `docs` handbook.

## Hard rules

- Mobile never connects to PostgreSQL. Business rules live in server services, not pages, routes or UI.
- Roles come from database rows, never from a client value. Authorize in the service, and return 404 for another user's private record.
- Only a verified billing event changes subscription state. Money is integer paise.
- Migrations use `DIRECT_URL` (5432); runtime uses `DATABASE_URL` (6432).
- Build no feature that depends on an open decision without recording the default used. Never silently add payment between customers and providers, booking, commission or in-app calling.
- Never invent vendor prices, limits or APIs. Check official docs and record facts in [Official references](docs/technical/OFFICIAL_REFERENCES.md).

## Security

- **Never commit or print secrets**, `.env` files, real phone numbers or client PDFs. The repository is public.
- `EXPO_PUBLIC_*` ships inside the app, so never put a secret there.
- Do not deploy or connect to production without credentials and explicit authorization.
- `TEST_DATABASE_URL` is destructive. Point it only at a throwaway database.

## Commands

```bash
pnpm install
pnpm dev
pnpm lint && pnpm typecheck
pnpm test                 # add TEST_DATABASE_URL for integration tests
pnpm test:coverage        # 80% thresholds
pnpm build && pnpm test:e2e
pnpm --filter mobile bundle:check
pnpm format:check && pnpm docs:check
pnpm db:generate && pnpm db:migrate
```

## Conventions

Immutable updates, small files, functions under 50 lines, no `console.log`, TDD with 80% coverage. See [Coding standards](docs/engineering/CODING_STANDARDS.md); path-scoped rules load from `.claude/rules/`.

## Git

Conventional commits (`feat:`, `fix:`, `docs:` and so on). Read the staged diff before committing. Never force-push, reset or discard work. See [Git workflow](docs/engineering/GIT_WORKFLOW.md).

## When you finish a task

Update the affected docs in the same commit, and update [Project status](docs/delivery/PROJECT_STATUS.md) with what was verified. A new architectural decision needs an ADR. When documents conflict, accepted ADRs and client-confirmed requirements win; flag the contradiction in Open decisions. Report test results as they actually happened.
