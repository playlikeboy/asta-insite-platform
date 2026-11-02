# Repository Audit

Performed 2026-11-02, before any foundation work.

## What existed

| Item                          | Finding                                                                                                                                                                                                                   |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Branch                        | `main`, up to date with `origin/main`                                                                                                                                                                                     |
| History                       | One commit: `6d0d4cd Initial commit`                                                                                                                                                                                      |
| Tracked files                 | `README.md`, containing only `# asta-insite-platform`                                                                                                                                                                     |
| Untracked                     | `.env` with two public values: Appwrite endpoint (`sgp.cloud.appwrite.io`) and project ID. `PRD.md`, the project blueprint, deleted on 2026-11-02 at the owner's request after its content was carried into this handbook |
| Package manager config        | None                                                                                                                                                                                                                      |
| Applications and dependencies | None                                                                                                                                                                                                                      |
| Environment templates         | None                                                                                                                                                                                                                      |
| CI/CD                         | None                                                                                                                                                                                                                      |
| `.gitignore`                  | None, so `.env` was at risk of being committed                                                                                                                                                                            |
| Architecture decisions        | Only as prose in `PRD.md`                                                                                                                                                                                                 |

## Functional, incomplete, missing

- **Functional:** nothing.
- **Incomplete:** nothing, because no code existed.
- **Missing:** everything: code, tests, CI, documentation, ignore rules.
- **Reusable:** the blueprint's naming, screen lists, schema groups and brand colors, all carried into this handbook.

## Risks found

| Risk                                                                                          | Severity | Action                                                                                  |
| --------------------------------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------- |
| The repository is **public**                                                                  | High     | No client documents or secrets committed. Decision D-17 asks whether to make it private |
| The active local GitHub account (`SH20RAJ`) has read-only access; `playlikeboy` owns the repo | Medium   | Pushes fail until the account changes. Commits stay local                               |
| An Appwrite API key was pasted into a chat session on 2026-11-02                              | High     | It was not used or stored. **Rotate it in the Appwrite Console**                        |
| Blueprint's chat design splits related data across two databases                              | Medium   | Resolved by ADR-004                                                                     |
| Blueprint assumes Razorpay works for in-app subscriptions                                     | High     | Recorded as D-05                                                                        |
| `.env` sits at the repository root, but Expo reads `apps/mobile/`                             | Low      | Documented in [Environment variables](../operations/ENVIRONMENT_VARIABLES.md)           |
| Brand terracotta and sage fail WCAG AA for small text                                         | Medium   | Darker text shades added; tests enforce contrast                                        |

## Changes recommended and made

The repository had nothing to preserve beyond its README, so a new monorepo was added around it. See [Monorepo structure](../architecture/MONOREPO_STRUCTURE.md) and [Project status](../delivery/PROJECT_STATUS.md).
