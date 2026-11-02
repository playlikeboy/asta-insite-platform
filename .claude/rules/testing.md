---
paths:
  - '**/*.test.ts'
  - '**/*.test.tsx'
  - '**/*.spec.ts'
  - 'apps/web/e2e/**'
---

# Testing

- Write the failing test first. A bug fix starts with a reproduction.
- Use a real PostgreSQL for integration tests; do not mock the database. Mock vendors at the integration boundary.
- Each test creates its data and doesn't depend on order. No real phone numbers, payments or keys.
- Test endpoints for validation, 401, 403, other-user 404 and success.
- Do not loosen a test to pass it unless the test is wrong. Do not exclude business logic from coverage.
- See [Testing strategy](../../docs/engineering/TESTING_STRATEGY.md).
