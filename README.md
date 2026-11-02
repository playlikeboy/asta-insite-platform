# Asta Insite Platform

Monorepo for **Asta Insite**, a marketplace connecting homeowners with architects, interior designers, contractors and other home-service professionals in India.

**Status:** Foundation only. No product features yet, nothing is deployed. See [Project status](docs/delivery/PROJECT_STATUS.md).

| Path                     | Contents                                     |
| ------------------------ | -------------------------------------------- |
| `apps/web`               | Next.js admin dashboard and API              |
| `apps/mobile`            | Expo app for customers and providers         |
| `packages/database`      | Drizzle schema and migrations for PostgreSQL |
| `packages/contracts`     | Shared Zod API schemas                       |
| `packages/design-tokens` | Brand tokens                                 |
| `packages/config`        | Shared TypeScript and ESLint configuration   |
| `docs`                   | [Engineering handbook](docs/README.md)       |

## Quick start

Requires Node 22 and pnpm 12.6.

```bash
pnpm install
pnpm dev
pnpm lint && pnpm typecheck && pnpm test
```

Full instructions: [Development setup](docs/engineering/DEVELOPMENT_SETUP.md). AI agents: start with [CLAUDE.md](CLAUDE.md).

Never commit `.env` files or secrets. See [Environment variables](docs/operations/ENVIRONMENT_VARIABLES.md).
