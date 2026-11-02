# Deployment Architecture

**Status:** Nothing deployed. Steps in [Deployment](../operations/DEPLOYMENT.md).

| Component             | Target                        | Trigger                                                               |
| --------------------- | ----------------------------- | --------------------------------------------------------------------- |
| Next.js admin and API | Appwrite Sites                | Git push, filtered by branch and path                                 |
| PostgreSQL            | Appwrite Native PostgreSQL    | Migrations run from a protected CI job or by hand with the direct URL |
| Functions             | Appwrite Functions, `node-22` | Git or CLI                                                            |
| Mobile                | EAS Build and Submit          | Manual, tagged release                                                |
| Code                  | GitHub                        |                                                                       |

## Environments

Three Appwrite projects in one organization: `asta-insite-dev`, `asta-insite-staging`, `asta-insite-prod`. Each has its own site, database, TablesDB, buckets, Auth settings, Messaging providers and Functions. Details: [Environments](../operations/ENVIRONMENTS.md).

## Sites settings to test in S-01

| Setting          | Starting value                                          |
| ---------------- | ------------------------------------------------------- |
| Root directory   | Repository root, because `apps/web` needs the workspace |
| Install command  | `corepack enable && pnpm install --frozen-lockfile`     |
| Build command    | `pnpm --filter web build`                               |
| Output directory | `apps/web/.next`                                        |
| Path filter      | `apps/web/**`, `packages/**`, `pnpm-lock.yaml`          |
| Branch           | `main` for production; `staging` for staging            |

Appwrite's docs show root directory and path filters but no pnpm monorepo example. Treat these values as a starting point. If S-01 fails, try `output: 'standalone'`, then consider another Next.js host through an ADR.

## Release order

Database migration first, then API, then mobile. The API must accept the previous mobile version. Destructive schema changes wait until old clients are gone; see [Migration guide](../database/MIGRATION_GUIDE.md).
