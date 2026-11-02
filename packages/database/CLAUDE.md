# packages/database

Drizzle schema and migrations. Read [Database architecture](../../docs/architecture/DATABASE_ARCHITECTURE.md), [Schema reference](../../docs/database/SCHEMA_REFERENCE.md) and [Migration guide](../../docs/database/MIGRATION_GUIDE.md).

- Generate migrations with `pnpm db:generate`; read the SQL; commit schema and migration together. Never edit an applied migration.
- Never run `drizzle-kit push` beyond a throwaway local database.
- Foreign keys state `onDelete` deliberately. Money is integer paise. Timestamps have time zones.
- Only `users`, `requirements`, `content_posts` and `messages` use soft delete.
- Integration tests use `TEST_DATABASE_URL`, and they **drop the schema**.
- Test each constraint that protects a business rule. Use the `database-migration` skill.
