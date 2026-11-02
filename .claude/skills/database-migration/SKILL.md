---
description: Change the PostgreSQL schema safely with Drizzle. Use for any table, column, index or constraint change.
paths:
  - 'packages/database/**'
---

# Database Migration

1. Read `docs/database/MIGRATION_GUIDE.md` and the current schema.
2. Is it breaking for the running code or old apps? Use expand, migrate, contract.
3. Add a failing constraint test in `packages/database/src/`.
4. Edit `packages/database/src/schema/index.ts`.
5. Run `pnpm db:generate`, then read the SQL. Look for drops, renames generated as drop and add, and table locks.
6. Test from empty, using a throwaway database only, because this drops its schema:

   ```bash
   TEST_DATABASE_URL=postgresql://localhost:5432/asta_test pnpm --filter @asta/database test
   ```

7. Run `pnpm db:generate` again. It must report no changes.
8. Update `docs/database/SCHEMA_REFERENCE.md`, plus `ERD.md`, `RELATIONSHIPS.md`, `INDEXING_STRATEGY.md` and `DATA_RETENTION.md` as they apply.
9. Commit schema, migration, tests and docs together.

**Hard stops:** Never apply to staging or production without explicit authorization. Never edit an applied migration. Never use `drizzle-kit push` on a shared database. Take a backup before risky production changes and rehearse on a database branch.
