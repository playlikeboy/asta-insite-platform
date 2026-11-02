import 'server-only';

import { createDatabase, type Database } from '@asta/database';

import { parseServerEnv } from '@/env';

let database: Database | undefined;

/** One client per server process, so warm invocations reuse the connection pool. */
export function getDatabase(): Database {
  database ??= createDatabase(parseServerEnv(process.env).DATABASE_URL);
  return database;
}
