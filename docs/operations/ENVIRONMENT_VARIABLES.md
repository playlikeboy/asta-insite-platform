# Environment Variables

Templates: `.env.example`, `.env.development.example`, `.env.staging.example`. They contain names and harmless placeholders only. **Never commit real values.**

`EXPO_PUBLIC_*` values are compiled into the app and can be read by anyone with it. Never put a secret there.

## In use now (Implemented)

| Name                              | Purpose                                                                         | Required            | App      | Source                              | Secret           |
| --------------------------------- | ------------------------------------------------------------------------------- | ------------------- | -------- | ----------------------------------- | ---------------- |
| `DATABASE_URL`                    | Pooled PostgreSQL (port 6432) for runtime. `/api/health` returns 503 without it | At runtime          | web      | `apps/web/.env.local`; Sites        | Yes              |
| `DIRECT_URL`                      | Direct PostgreSQL (port 5432) for migrations                                    | For migrations      | database | `packages/database/.env`; CI secret | Yes              |
| `TEST_DATABASE_URL`               | Integration tests. **Destructive: drops the schema**                            | Optional; set in CI | database | Shell; CI                           | Local value only |
| `EXPO_PUBLIC_APPWRITE_ENDPOINT`   | Appwrite API URL                                                                | Yes                 | mobile   | `apps/mobile/.env.local`; EAS       | No               |
| `EXPO_PUBLIC_APPWRITE_PROJECT_ID` | Appwrite project                                                                | Yes                 | mobile   | Same                                | No               |
| `EXPO_PUBLIC_API_BASE_URL`        | Asta API URL                                                                    | Yes                 | mobile   | Same                                | No               |

The app's env parsers validate these and report variable names, never values.

## Planned

| Name                               | Purpose                                                      | Required | App            | Source           | Secret      | Milestone |
| ---------------------------------- | ------------------------------------------------------------ | -------- | -------------- | ---------------- | ----------- | --------- |
| `APPWRITE_ENDPOINT`                | Server Appwrite URL                                          | Yes      | web            | Sites            | No          | M2        |
| `APPWRITE_PROJECT_ID`              | Server Appwrite project                                      | Yes      | web            | Sites            | No          | M2        |
| `APPWRITE_API_KEY`                 | Scoped server key                                            | Yes      | web            | Sites            | **Yes**     | M2        |
| `APP_ENV`                          | `development`, `staging`, `production`                       | Yes      | web            | Sites            | No          | M2        |
| `INTERNAL_JOB_SECRET`              | Authorizes Functions calling job routes                      | Yes      | web, functions | Sites, Functions | **Yes**     | M4        |
| `CURSOR_SIGNING_SECRET`            | Signs pagination cursors, if signing is chosen over encoding | Optional | web            | Sites            | **Yes**     | M3        |
| `RAZORPAY_KEY_ID`                  | Gateway key ID                                               | Yes      | web            | Sites            | Server-held | M4        |
| `RAZORPAY_KEY_SECRET`              | Gateway API secret                                           | Yes      | web            | Sites            | **Yes**     | M4        |
| `RAZORPAY_WEBHOOK_SECRET`          | Webhook HMAC                                                 | Yes      | web            | Sites            | **Yes**     | M4        |
| `RAZORPAY_WEBHOOK_SECRET_PREVIOUS` | Retries during rotation                                      | Optional | web            | Sites            | **Yes**     | M4        |
| `MSG91_AUTH_KEY`                   | SMS, only if D-12 selects MSG91                              | Optional | web            | Sites            | **Yes**     | M2        |
| `EXPO_TOKEN`                       | EAS builds from CI                                           | Optional | CI             | GitHub Secrets   | **Yes**     | M2        |

## Not environment variables

APNs keys, FCM service accounts and Resend keys go in the Appwrite Messaging console, per environment. They never enter the repository.

## Adding a variable

1. Add it to the Zod schema in the app's env module.
2. Add a placeholder to the templates.
3. Add a row here.
4. Set it in each environment's console.

## Rotation

See [Maintenance](MAINTENANCE.md) and [Incident response](../security/INCIDENT_RESPONSE.md#secret-exposure).

## Build logs

Don't print environment values in CI. Next.js inlines `NEXT_PUBLIC_*` at build time, so none of these names use it.
