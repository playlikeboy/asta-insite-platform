# API Reference

**Implemented:** `GET /api/health` only. All other endpoints are Planned; they define the design and may change. Machine-readable spec: [openapi.yaml](openapi.yaml). Standards: [API standards](API_STANDARDS.md).

| Area                                 | Reference                                |
| ------------------------------------ | ---------------------------------------- |
| Sign-in and session                  | [Auth](AUTH_ENDPOINTS.md)                |
| Customer profile and discovery       | [Customer](CUSTOMER_ENDPOINTS.md)        |
| Provider profile, portfolio, leads   | [Provider](PROVIDER_ENDPOINTS.md)        |
| Requirements, interests, connections | [Requirements](REQUIREMENT_ENDPOINTS.md) |
| Content and media                    | [Content](CONTENT_ENDPOINTS.md)          |
| Chat                                 | [Chat](CHAT_ENDPOINTS.md)                |
| Plans, checkout, webhooks            | [Payments](PAYMENT_ENDPOINTS.md)         |
| Admin                                | [Admin](ADMIN_ENDPOINTS.md)              |

## System

### `GET /api/health` (Implemented)

Public. Checks that the database answers. Used by monitoring.

| Status | Body                                                                                                                     |
| ------ | ------------------------------------------------------------------------------------------------------------------------ |
| 200    | `{ "success": true, "data": { "status": "ok", "database": "up" } }`                                                      |
| 503    | `{ "success": false, "error": { "code": "SERVICE_UNAVAILABLE", "message": "The service is temporarily unavailable." } }` |

### `GET /api/v1/service-categories`

Public. Active categories. Cached briefly.

### `GET /api/v1/service-categories/:id/questions`

Authenticated. Current question version for the wizard.

### Internal jobs

`POST /api/internal/jobs/:name`, called by scheduled Functions with an `x-internal-secret` header compared in constant time. Not for clients. Excluded from the OpenAPI spec.

### Notifications

| Method | Path                                  | Purpose                   |
| ------ | ------------------------------------- | ------------------------- |
| GET    | `/api/v1/notifications`               | Own list                  |
| POST   | `/api/v1/notifications/:id/read`      | Mark read                 |
| POST   | `/api/v1/notifications/read-all`      | Mark all read             |
| PUT    | `/api/v1/me/notification-preferences` | Marketing and quiet hours |

The blueprint's `POST /api/notifications` was removed from the public API, because clients must not create notifications. Admin campaigns use the admin API.
