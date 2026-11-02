---
paths:
  - 'packages/database/**'
---

# Database

- Schema change means: edit schema, `pnpm db:generate`, read the SQL, test from empty, commit together.
- Never edit an applied migration. Never `drizzle-kit push` on shared databases.
- Breaking changes use expand, migrate, contract.
- Keep [Schema reference](../../docs/database/SCHEMA_REFERENCE.md) and [ERD](../../docs/database/ERD.md) in step.
- Parameterize all SQL. Add indexes for real queries, and use keyset pagination.
- Runtime uses port 6432: no prepared statements, advisory locks, `LISTEN/NOTIFY`, temp tables or `SET LOCAL`. Migrations use port 5432.
