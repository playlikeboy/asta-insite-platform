import { defineConfig } from 'drizzle-kit';

// Migrations need the direct port (5432). The pooler (6432) cannot run session-level DDL.
export default defineConfig({
  dialect: 'postgresql',
  schema: './src/schema/index.ts',
  out: './migrations',
  dbCredentials: { url: process.env.DIRECT_URL ?? '' },
  strict: true,
  verbose: true,
});
