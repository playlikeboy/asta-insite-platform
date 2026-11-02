# API Standards

The envelope and pagination are Implemented in `packages/contracts`. Decision: [ADR-010](../architecture/ARCHITECTURE_DECISIONS.md#adr-010-api-conventions).

## URLs

- Base: `/api/v1`. Plural nouns, kebab-case: `/service-categories`.
- Actions that are not plain updates use a verb sub-resource: `POST /interests/:id/accept`.
- Unversioned: `/api/health`, `/api/webhooks/*`, `/api/internal/*`.
- Versioning: additive changes stay in v1. A breaking change means `/api/v2`, with v1 running until supported apps have moved.

## Response envelope

```json
{ "success": true, "data": {}, "meta": { "nextCursor": null, "limit": 20 } }
```

```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_FAILED",
    "message": "Some fields need attention.",
    "fields": { "budgetMax": ["Must be at least the minimum budget."] }
  }
}
```

Clients branch on `code`, never on `message`.

## Status codes

| Status        | Code                  | Use                                       |
| ------------- | --------------------- | ----------------------------------------- |
| 200, 201, 204 |                       | Success                                   |
| 400           | `VALIDATION_FAILED`   | Malformed JSON                            |
| 401           | `UNAUTHENTICATED`     | Missing or invalid token                  |
| 403           | `FORBIDDEN`           | Authenticated, not allowed                |
| 404           | `NOT_FOUND`           | Missing, or existence must stay hidden    |
| 409           | `CONFLICT`            | State conflict                            |
| 422           | `VALIDATION_FAILED`   | Valid JSON, invalid fields                |
| 429           | `RATE_LIMITED`        | With `Retry-After`                        |
| 500           | `INTERNAL_ERROR`      | Generic message, logged with a request ID |
| 503           | `SERVICE_UNAVAILABLE` | Dependency down                           |

Return 404, not 403, for private resources belonging to someone else.

## Conventions

- JSON field names are `camelCase`; database columns are `snake_case`.
- Dates are ISO 8601 UTC. Money is integer paise, named `...Paise`.
- IDs are UUIDs. Never expose `appwrite_user_id` to other users.
- Unknown fields in a body are rejected.

## Pagination

Cursor-based: `?cursor=...&limit=20`. Default 20, maximum 100. Cursors are opaque and signed or encoded by the server.

## Authentication

Mobile: `Authorization: Bearer <JWT>`. Admin: session cookie. Details: [Auth endpoints](AUTH_ENDPOINTS.md).

## Idempotency

`Idempotency-Key` header on checkout and refunds. `clientKey` in the body for messages. Repeating returns the original result.

## Rate limits

| Scope                             | Limit (start)    |
| --------------------------------- | ---------------- |
| Authenticated, per user           | 120 per minute   |
| Show Interest, per provider       | 30 per hour      |
| Requirement creation, per user    | 10 per day       |
| Messages, per user                | 60 per minute    |
| Admin sign-in, per IP and account | 5 per 15 minutes |

## Every endpoint must

1. Authenticate unless documented as public.
2. Validate with a Zod schema from `@asta/contracts`.
3. Authorize in the service.
4. Paginate collections.
5. Avoid leaking internals in errors.
6. Be documented here and in [openapi.yaml](openapi.yaml).
