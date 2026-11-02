# Monorepo Structure

## Today (Implemented)

```text
apps/
  web/                 Next.js 16 admin shell and API
    src/app/(admin)/   Admin layout and overview
    src/app/api/health Health endpoint
    src/components/    Admin navigation; ui/ holds shadcn components
    src/env.ts         Server environment validation
    src/lib/database.ts One database client per process
    e2e/               Playwright tests
  mobile/              Expo SDK 58 app
    src/app/           Expo Router: index, customer/ tabs, provider/ tabs
    src/components/    Shared screens
    src/lib/           Environment validation, tab options
    src/global.css     Uniwind, HeroUI and brand mapping
packages/
  config/              Shared tsconfig and ESLint base
  contracts/           Zod API envelope, pagination, health
  database/            Drizzle schema, client, migrations, integration tests
  design-tokens/       Brand tokens (CSS and TS) with contrast tests
scripts/check-docs.mjs Link checker for Markdown
docs/                  This handbook
.claude/               Agent rules, agents, skills
.github/workflows/     CI
```

## Planned additions

| Path                                                      | Milestone | Purpose                                                                                                                                                           |
| --------------------------------------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `packages/domain/`                                        | M2        | Services and business rules, one folder per module: `identity`, `providers`, `requirements`, `leads`, `content`, `messaging`, `billing`, `notifications`, `admin` |
| `apps/mobile/src/features/customer`, `provider`, `shared` | M3        | Feature code; screens in `src/app` stay thin                                                                                                                      |
| `apps/web/src/app/api/v1/`                                | M2        | Versioned API                                                                                                                                                     |
| `apps/web/src/app/(auth)/`                                | M2        | Admin sign-in                                                                                                                                                     |
| `infrastructure/appwrite/`                                | M1        | Appwrite setup as code or documented steps, plus Functions                                                                                                        |

## Dependency direction

```text
apps/web     -> domain, contracts, database, design-tokens
apps/mobile  -> contracts, design-tokens
domain       -> contracts, database
database     -> (nothing internal)
contracts    -> (nothing internal)
design-tokens-> (nothing internal)
```

Mobile must never import `database` or `domain`, because that would ship server code and connection logic in the app.

## Differences from the blueprint

See [ADR-016](ARCHITECTURE_DECISIONS.md#adr-016-packages-created-only-when-used).

## Conventions

- Package names: `@asta/<name>`. App names: `web`, `mobile`.
- Internal dependencies use `workspace:*`.
- Run tasks from the root: `pnpm build`, `pnpm lint`, `pnpm typecheck`, `pnpm test`.
- One package only: `pnpm --filter web <script>`.
- `shadcn` adds components under `apps/web/src/components/ui`; do not hand-edit them without reason.
