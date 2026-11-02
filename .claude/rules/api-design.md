---
paths:
  - 'apps/web/src/app/api/**'
  - 'packages/contracts/**'
  - 'docs/api/**'
---

# API Design

- Follow [API standards](../../docs/api/API_STANDARDS.md): `/api/v1`, response envelope, error codes, cursor pagination, camelCase JSON, integer paise, UTC dates.
- Define request and response schemas in `@asta/contracts`.
- Return DTOs, never raw rows. Never expose `appwrite_user_id`.
- Update the endpoint document and `openapi.yaml` in the same commit; change `x-status` when implemented.
- Keep changes additive. Old apps stay installed.
