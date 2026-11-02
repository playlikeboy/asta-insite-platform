# Testing Strategy

Tooling: [ADR-013](../architecture/ARCHITECTURE_DECISIONS.md#adr-013-test-tooling).

| Layer       | Tool                       | Scope                             | Status                         |
| ----------- | -------------------------- | --------------------------------- | ------------------------------ |
| Unit        | Vitest                     | Pure logic, schemas, tokens       | Implemented                    |
| Integration | Vitest and real PostgreSQL | Constraints, repositories, routes | Implemented for current schema |
| E2E web     | Playwright                 | Admin flows                       | Implemented: shell, health     |
| E2E mobile  | Maestro                    | Critical flows                    | Planned M3                     |
| Bundle      | Expo export                | iOS and Android JS compiles       | Implemented                    |
| Device      | Manual                     | Real iOS and Android              | **Not yet done**               |
| Load        | Decide at M11              | Lead feed, chat                   | Planned                        |

## Coverage

80% lines, branches, functions and statements for `.ts` files, enforced by `pnpm test:coverage` (root `vitest.config.ts`). `.tsx` files aren't measured in unit coverage; Playwright and Maestro cover them. Declarative schema, vendored shadcn files and framework route files are excluded. Do not exclude business logic to reach the number.

## TDD

For new features and bug fixes: write a failing test, implement, refactor. A bug fix starts with a test that reproduces the bug.

## Rules

- Do not mock the database in integration tests. Mock real vendors at the integration module boundary, using recorded shapes.
- Tests create their own data and don't depend on order or seeds.
- Never use real phone numbers, keys or payments. Appwrite mock numbers and Razorpay test mode only.
- A flaky test gets fixed or quarantined with a ticket, not retried silently.
- Fix code, not tests, unless the test is wrong.

## What each feature must test

| Feature type  | Tests                                                                                               |
| ------------- | --------------------------------------------------------------------------------------------------- |
| Endpoint      | Validation, 401, 403, other user's record 404, happy path, envelope shape                           |
| State machine | Each legal move; illegal moves rejected                                                             |
| Money         | Webhook cases in [Payment security](../security/PAYMENT_SECURITY.md#tests-required-before-m4-exits) |
| Concurrency   | Double tap, duplicate event, unique constraint holds                                                |
| Migration     | Applied from empty; drift check                                                                     |
| Mobile screen | Loading, empty, error, success                                                                      |

## Critical E2E flows by launch

Sign in, post requirement, provider approval, subscription activation (test mode), show interest, accept, chat, account deletion.

## CI

`.github/workflows/ci.yml`: format, docs check, lint, typecheck, coverage with PostgreSQL 18, drift, build, mobile bundle, Playwright, dependency audit. Written but **not yet run on GitHub**, because the first push is pending.
