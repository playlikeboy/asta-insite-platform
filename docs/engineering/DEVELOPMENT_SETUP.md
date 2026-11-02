# Development Setup

## Requirements

| Tool           | Version       | Note                                                        |
| -------------- | ------------- | ----------------------------------------------------------- |
| Node.js        | 22 (`.nvmrc`) | Node 22.13 minimum for Expo SDK 58. Also ran on v26 locally |
| pnpm           | 12.6          | Set in root `packageManager`                                |
| PostgreSQL     | 18            | For integration tests. Docker or Homebrew                   |
| Xcode 26.4+    | iOS           | macOS only                                                  |
| Android Studio | Android       | Emulator                                                    |

## Install

```bash
git clone https://github.com/playlikeboy/asta-insite-platform.git
cd asta-insite-platform
nvm use
pnpm install
```

## Environment

Each app reads its own file. Copy from `.env.example`. Never commit real values. Full list: [Environment variables](../operations/ENVIRONMENT_VARIABLES.md).

| File                     | Variables       |
| ------------------------ | --------------- |
| `apps/web/.env.local`    | `DATABASE_URL`  |
| `apps/mobile/.env.local` | `EXPO_PUBLIC_*` |
| `packages/database/.env` | `DIRECT_URL`    |

A root `.env` is **not** read by Expo, so copy the values to `apps/mobile/.env.local`.

## Local database

```bash
createdb asta_dev
createdb asta_test
export DIRECT_URL=postgresql://localhost:5432/asta_dev
pnpm db:migrate
```

`TEST_DATABASE_URL` is destructive: the integration test drops its `public` schema. Never point it at anything important.

## Run

```bash
pnpm dev                               # All apps through Turborepo
pnpm --filter @asta/web dev            # Admin at http://localhost:3000
pnpm --filter @asta/mobile start       # Expo
```

The web app starts without a database, but `/api/health` returns 503 until `DATABASE_URL` is set.

HeroUI Native and notification features may need a development build rather than Expo Go. Test on a device when native modules are involved.

## Commands

| Command                                   | Purpose                                                                                                |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `pnpm lint`                               | ESLint everywhere                                                                                      |
| `pnpm typecheck`                          | TypeScript everywhere                                                                                  |
| `pnpm test`                               | Unit tests; integration too when `TEST_DATABASE_URL` is set                                            |
| `pnpm test:coverage`                      | With the 80% thresholds                                                                                |
| `pnpm test:e2e`                           | Playwright; run `pnpm build` first and `pnpm --filter @asta/web exec playwright install chromium` once |
| `pnpm build`                              | Production build of web                                                                                |
| `pnpm --filter @asta/mobile bundle:check` | Bundles iOS and Android JS                                                                             |
| `pnpm format` / `format:check`            | Prettier                                                                                               |
| `pnpm docs:check`                         | Broken Markdown links                                                                                  |
| `pnpm db:generate` / `db:migrate`         | Migrations                                                                                             |

## Troubleshooting

| Problem                                  | Fix                                                                               |
| ---------------------------------------- | --------------------------------------------------------------------------------- |
| `ERR_PNPM_IGNORED_BUILDS`                | Add the package to `allowBuilds` in `pnpm-workspace.yaml`, only after checking it |
| `spawn ENOEXEC` from shadcn CLI on macOS | Homebrew's pnpm wrapper lacks a shebang. Use Corepack or a shim                   |
| Playwright hangs at the end              | Web server must be `next start` directly, as configured                           |
| Metro cannot see a workspace change      | `pnpm --filter @asta/mobile start --clear`                                        |
| Uniwind class types missing              | Run the mobile bundle once to regenerate `uniwind-types.d.ts`                     |
