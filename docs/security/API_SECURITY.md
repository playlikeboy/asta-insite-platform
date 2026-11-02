# API Security

Mapped to the [OWASP API Security Top 10](https://owasp.org/www-project-api-security/). **Status:** Planned, except where marked.

| Risk                          | Control                                                                                    |
| ----------------------------- | ------------------------------------------------------------------------------------------ |
| Broken object authorization   | Ownership in services; tests per endpoint                                                  |
| Broken authentication         | Appwrite JWT verified server-side; 15-minute life; no custom tokens                        |
| Broken property authorization | Response DTOs, never raw rows. Strict input schemas reject extras such as `approvalStatus` |
| Unrestricted resource use     | Limits, page size cap, body size cap, upload limits                                        |
| Broken function authorization | Admin routes check role in services                                                        |
| Sensitive business flows      | Limits on Show Interest and requirement creation                                           |
| SSRF                          | No user-supplied URLs fetched by the server                                                |
| Misconfiguration              | Security headers; CORS allowlist; no debug output                                          |
| Inventory                     | OpenAPI and docs updated with each endpoint                                                |
| Unsafe consumption of APIs    | Vendor responses validated with Zod; signed webhooks                                       |

## Validation

Zod schemas from `@asta/contracts` at every boundary. Implemented for the response envelope, pagination and environment parsing.

## Headers

For the admin web app: `Content-Security-Policy`, `Strict-Transport-Security`, `X-Content-Type-Options: nosniff`, `Referrer-Policy`, `frame-ancestors 'none'`. Set in `next.config.ts` at M9, then test them.

## CORS

Native apps do not need CORS. The API allows only its own admin origin. No wildcard.

## CSRF

Admin uses `sameSite: strict` cookies, and Server Actions or JSON routes check `Origin`. Mobile uses bearer tokens, so CSRF does not apply.

## Rate limiting

In PostgreSQL ([ADR-011](../architecture/ARCHITECTURE_DECISIONS.md#adr-011-rate-limiting-in-postgresql)). Limits are in [API standards](../api/API_STANDARDS.md#rate-limits).

| Case                    | Behavior                                      |
| ----------------------- | --------------------------------------------- |
| Limit reached           | 429 with `Retry-After`                        |
| Limiter's database down | Sensitive routes fail closed; reads fail open |

## Errors

Unexpected errors return a generic message and a request ID. Stack traces, SQL and vendor messages stay in logs. Authentication errors never reveal whether an account exists. Implemented: `/api/health` returns a generic 503.

## Internal routes

`/api/internal/*` requires `INTERNAL_JOB_SECRET`, compared in constant time. Jobs are idempotent.

## Logging

Never log tokens, OTPs, secrets, message bodies, documents or full webhook payloads. See [Logging](../engineering/LOGGING.md).
