# Error Handling

**Implemented:** envelope types, error codes, `/api/health` generic 503, environment errors naming variables only. **Planned:** domain errors and route wrapper at M2.

## Server

```ts
class DomainError extends Error {
  constructor(
    readonly code: ApiErrorCode,
    message: string,
    readonly fields?: Record<string, string[]>,
  ) {
    super(message);
  }
}
```

A single route wrapper handles it:

| Thrown                         | Response                                                  |
| ------------------------------ | --------------------------------------------------------- |
| `ZodError`                     | 422 `VALIDATION_FAILED` with `fields`                     |
| `DomainError`                  | Mapped status and code                                    |
| Postgres `23505` where handled | 409 `CONFLICT`                                            |
| Anything else                  | 500 `INTERNAL_ERROR`, generic message, full detail logged |

Never swallow an error silently. Never put driver or vendor messages in responses.

## Vendor failure

Timeouts on every call. Retry only idempotent work, with backoff. Asynchronous work retries through the outbox. After the final failure, keep the event visible for an operator. Never call a vendor inside a database transaction.

## Mobile

| Error   | Behavior                                                          |
| ------- | ----------------------------------------------------------------- |
| Network | Offline banner, retry, keep input                                 |
| 401     | Refresh JWT once and retry; else sign in, keeping the destination |
| 403     | Explain, and offer the fix                                        |
| 404     | "No longer available"                                             |
| 409     | Refetch and explain                                               |
| 422     | Show on the fields                                                |
| 429     | Wait for `Retry-After`                                            |
| 5xx     | Friendly message, Retry, request ID in details                    |

Use a root error boundary. A crash must offer a way back.

## Web admin

Next.js `error.tsx` and `not-found.tsx` per section. Destructive actions confirm the result, never assuming success.

## User-facing messages

Say what happened and what to do, in plain words. Never "Something went wrong" alone when the user can act.
