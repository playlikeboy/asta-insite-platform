# Database Architecture

**Status:** Identity and category tables Implemented and tested against PostgreSQL 18. Remaining tables Planned in [Schema reference](../database/SCHEMA_REFERENCE.md).

## Principles

- PostgreSQL is the single system of record ([ADR-003](ARCHITECTURE_DECISIONS.md#adr-003-postgresql-with-drizzle-and-node-postgres)).
- Server-only access. Appwrite's permission system does not apply to Native PostgreSQL, so authorization lives entirely in the service layer.
- UUID primary keys, foreign keys, `timestamptz`, unique constraints for invariants.
- Enforce what the database can enforce: uniqueness, references, checks. Tests prove it.

## Connections

| Use                       | URL            | Port | Mode                     |
| ------------------------- | -------------- | ---- | ------------------------ |
| Runtime                   | `DATABASE_URL` | 6432 | Pooler, transaction mode |
| Migrations, introspection | `DIRECT_URL`   | 5432 | Direct                   |

Create one client per process at module scope. Do not use `LISTEN/NOTIFY`, advisory locks, temporary tables or `SET LOCAL` on the pooled URL.

## Network exposure

By default the database accepts connections from anywhere with valid credentials. Set an IP allowlist if Sites and Functions turn out to have fixed egress addresses. This was not stated in the docs and needs checking in S-02. Otherwise rely on strong credentials, TLS and rotation.

## Environments

Each of the three Appwrite projects has its own database. Use Appwrite database branches for risky migration rehearsals and CI against realistic data.

## Soft deletion

Use `deleted_at` only where retention requires it: `users`, `requirements`, `content_posts`, `messages`. Everything else deletes for real. See [Data retention](../database/DATA_RETENTION.md).

## Related

[ERD](../database/ERD.md), [Relationships](../database/RELATIONSHIPS.md), [Indexes](../database/INDEXING_STRATEGY.md), [Migrations](../database/MIGRATION_GUIDE.md).
