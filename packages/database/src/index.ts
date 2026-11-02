import { sql } from 'drizzle-orm';
import { drizzle, type NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

export * from './schema';

export type Database = NodePgDatabase<typeof schema> & { $client: Pool };

// Stops a stalled database from hanging a health check or request indefinitely.
const CONNECTION_TIMEOUT_MS = 5_000;

/**
 * Creates a client for the pooled runtime URL (port 6432), not the direct URL. node-postgres
 * only prepares named statements, so this is safe with the pooler's transaction mode.
 */
export function createDatabase(connectionString: string): Database {
  const pool = new Pool({ connectionString, connectionTimeoutMillis: CONNECTION_TIMEOUT_MS });
  return drizzle({ client: pool, schema });
}

/** True when the database answers a trivial query. Never throws. */
export async function isDatabaseReachable(database: Pick<Database, 'execute'>): Promise<boolean> {
  try {
    await database.execute(sql`SELECT 1`);
    return true;
  } catch {
    return false;
  }
}
