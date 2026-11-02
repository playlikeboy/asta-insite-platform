# Project Status

**Source of truth for what actually exists. Last updated: 2026-11-02.** Update it with every milestone.

## Summary

M0 foundation is complete on the local machine. **Not yet on GitHub:** the push is denied (403), so CI has never run remotely. **Nothing is deployed. No Appwrite connection has been made.** No real product feature exists yet: no sign-in, no requirements, no chat, no payments.

## Implemented

| Area            | What exists                                                                       |
| --------------- | --------------------------------------------------------------------------------- |
| Monorepo        | pnpm workspaces, Turborepo, ESLint, Prettier, TypeScript, Vitest                  |
| Web             | Next.js admin shell with 16-item sidebar, Overview placeholder, `GET /api/health` |
| Mobile          | Expo Router tabs for both roles with placeholder screens; temporary role chooser  |
| Database        | 5 tables with constraints, first migration, integration tests                     |
| Contracts       | Response envelope, error codes, pagination, health schema                         |
| Design tokens   | Colors, radius, touch target, contrast tests                                      |
| CI              | Workflow file, unproven on GitHub                                                 |
| Docs and agents | This handbook, `CLAUDE.md`, `.claude/` rules, agents and skills                   |

## Verified locally on 2026-11-02

| Check                          | Result                                        |
| ------------------------------ | --------------------------------------------- |
| Build, web                     | Pass                                          |
| Mobile bundle, iOS and Android | Pass; **not run on a device**                 |
| Typecheck, lint                | Pass, 5 of 5 packages                         |
| Unit and integration tests     | 51 pass, against PostgreSQL 18.3              |
| Coverage                       | 100% lines, 86.66% branches of measured files |
| E2E                            | 2 of 2 pass                                   |
| Audit                          | 3 advisories, 1 low and 2 moderate, none high |

Rerun before trusting these numbers.

## Not done or unproven

| Item                                 | State              |
| ------------------------------------ | ------------------ |
| Spikes S-01 to S-08                  | None run           |
| Figma and client design approval     | Not started (D-21) |
| SRS signature                        | Not signed         |
| Backups, monitoring, logging         | Not configured     |
| Screen-reader test, real device test | Not done           |
| Appwrite Pro price                   | Unverified         |

## Blockers

| Blocker                  | Owner             | Action                                                           |
| ------------------------ | ----------------- | ---------------------------------------------------------------- |
| Push denied to `SH20RAJ` | Developer         | Run `gh auth switch -u playlikeboy`, then `git push origin main` |
| Exposed Appwrite API key | Key owner         | Rotate it                                                        |
| D-04, D-05, D-10         | Client            | Decide before M4                                                 |
| D-16                     | Client            | Accounts and bundle ID                                           |
| D-17, D-18, D-19         | Client, developer | Decide now                                                       |

## Next milestone

M1. See [Roadmap](IMPLEMENTATION_ROADMAP.md#m1-environments-and-spikes).
