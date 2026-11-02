# Appwrite

Region: Singapore ([ADR-015](../architecture/ARCHITECTURE_DECISIONS.md#adr-015-region)), pending D-07. Endpoint: `https://sgp.cloud.appwrite.io/v1`.

| Product               | Use                            | Notes                                                      |
| --------------------- | ------------------------------ | ---------------------------------------------------------- |
| Sites                 | Hosts `apps/web`               | Spike S-01 must prove a pnpm monorepo builds               |
| Auth                  | OTP, OAuth, sessions, MFA, JWT | JWTs last 15 minutes                                       |
| Native PostgreSQL     | System of record               | Accessed by driver only; platform permissions do not apply |
| Storage               | Files                          | New buckets grant no access                                |
| Functions             | Scheduled triggers             | They call internal API routes; no business logic           |
| Messaging             | Push, email                    | Providers configured in console                            |
| TablesDB and Realtime | `user_signals` only            | Spike S-03                                                 |

## Project setup (once credentials exist)

1. Create projects `asta-insite-dev`, `asta-insite-staging`, `asta-insite-prod`.
2. Register platforms: bundle ID and Android package for mobile, the admin host for web.
3. Enable sign-in methods. Disable all others.
4. Create PostgreSQL databases. Record pooled (6432) and direct (5432) connection strings in a password manager and in the Sites environment.
5. Set an IP allowlist if Sites offers static egress (not stated in the docs read).
6. Create buckets per [File storage](FILE_STORAGE.md).
7. Create a TablesDB database with table `user_signals`, Row Security enabled.
8. Create scoped API keys: `users.read` and `users.write`, plus the storage and messaging scopes actually needed. One key per environment.
9. Set a budget cap.

## API keys

Server-only. Never in `EXPO_PUBLIC_*`, source control, chat or tickets. Rotate after any exposure and on the [maintenance](../operations/MAINTENANCE.md) schedule.

## When Appwrite is down

The API, admin and sign-in are unavailable, because all run on it. Mobile shows a retry screen and keeps cached data readable. There is no failover by design; backups allow rebuilding elsewhere. See [Backup and restore](../operations/BACKUP_AND_RESTORE.md).

## Lock-in

Low for data (standard PostgreSQL). Moderate for auth, because phone-based users must be migrated. Next.js is portable to another host.

## Unverified

Pro plan price and limits, Sites request timeouts, Function timeouts, antivirus details, per-plan file limits, static egress. See S-02, S-07, S-08 in [Assumptions](../project/ASSUMPTIONS.md).
