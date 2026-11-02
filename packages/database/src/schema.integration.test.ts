import { randomUUID } from 'node:crypto';
import path from 'node:path';
import { eq, sql } from 'drizzle-orm';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import {
  adminUsers,
  createDatabase,
  customerProfiles,
  isDatabaseReachable,
  providerProfiles,
  serviceCategories,
  users,
  type Database,
} from './index';

const testDatabaseUrl = process.env.TEST_DATABASE_URL;

/** Drizzle wraps driver errors, so the Postgres error code sits on the cause. */
async function postgresErrorCode(operation: PromiseLike<unknown>): Promise<string | undefined> {
  try {
    await operation;
    return undefined;
  } catch (error) {
    return ((error as { cause?: { code?: string } }).cause ?? (error as { code?: string })).code;
  }
}

const UNIQUE_VIOLATION = '23505';
const FOREIGN_KEY_VIOLATION = '23503';
const CHECK_VIOLATION = '23514';
const RESTRICT_VIOLATION = '23001';

// Skips without a database so unit runs stay fast. CI always sets TEST_DATABASE_URL.
describe.skipIf(!testDatabaseUrl)('schema constraints', () => {
  let database: Database;

  async function createUser() {
    const [user] = await database
      .insert(users)
      .values({ appwriteUserId: randomUUID() })
      .returning();
    if (!user) throw new Error('User insert returned no row');
    return user;
  }

  beforeAll(async () => {
    database = createDatabase(testDatabaseUrl as string);
    await database.execute(sql`DROP SCHEMA IF EXISTS public CASCADE`);
    await database.execute(sql`DROP SCHEMA IF EXISTS drizzle CASCADE`);
    await database.execute(sql`CREATE SCHEMA public`);
    await migrate(database, { migrationsFolder: path.join(import.meta.dirname, '../migrations') });
  });

  afterAll(async () => {
    await database?.$client.end();
  });

  it('reports a reachable database', async () => {
    expect(await isDatabaseReachable(database)).toBe(true);
  });

  it('allows only one user per Appwrite identity', async () => {
    const user = await createUser();
    const duplicate = database.insert(users).values({ appwriteUserId: user.appwriteUserId });
    expect(await postgresErrorCode(duplicate)).toBe(UNIQUE_VIOLATION);
  });

  it('lets one person hold both customer and provider profiles', async () => {
    const user = await createUser();
    await database.insert(customerProfiles).values({ userId: user.id, fullName: 'Asha' });
    await database.insert(providerProfiles).values({ userId: user.id, businessName: 'Asha Build' });
    const rows = await database
      .select()
      .from(providerProfiles)
      .where(eq(providerProfiles.userId, user.id));
    expect(rows).toHaveLength(1);
  });

  it('starts a provider as a draft that receives no leads', async () => {
    const user = await createUser();
    const [provider] = await database
      .insert(providerProfiles)
      .values({ userId: user.id, businessName: 'New Co' })
      .returning();
    expect(provider?.approvalStatus).toBe('draft');
    expect(provider?.availableForLeads).toBe(false);
  });

  it('allows only one provider profile per user', async () => {
    const user = await createUser();
    await database.insert(providerProfiles).values({ userId: user.id, businessName: 'First' });
    const second = database
      .insert(providerProfiles)
      .values({ userId: user.id, businessName: 'Second' });
    expect(await postgresErrorCode(second)).toBe(UNIQUE_VIOLATION);
  });

  it('rejects an out-of-range experience value', async () => {
    const user = await createUser();
    const insert = database
      .insert(providerProfiles)
      .values({ userId: user.id, businessName: 'Old Co', yearsOfExperience: 101 });
    expect(await postgresErrorCode(insert)).toBe(CHECK_VIOLATION);
  });

  it('rejects a profile for a user that does not exist', async () => {
    const insert = database
      .insert(customerProfiles)
      .values({ userId: randomUUID(), fullName: 'Ghost' });
    expect(await postgresErrorCode(insert)).toBe(FOREIGN_KEY_VIOLATION);
  });

  it('removes profiles with their user but protects admin users from deletion', async () => {
    const customer = await createUser();
    await database.insert(customerProfiles).values({ userId: customer.id, fullName: 'Ravi' });
    await database.delete(users).where(eq(users.id, customer.id));
    const profiles = await database
      .select()
      .from(customerProfiles)
      .where(eq(customerProfiles.userId, customer.id));
    expect(profiles).toHaveLength(0);

    const admin = await createUser();
    await database.insert(adminUsers).values({ userId: admin.id, role: 'operations' });
    const removal = database.delete(users).where(eq(users.id, admin.id));
    expect(await postgresErrorCode(removal)).toBe(RESTRICT_VIOLATION);
  });

  it('requires unique category slugs', async () => {
    const slug = `plumbing-${randomUUID()}`;
    await database.insert(serviceCategories).values({ slug, name: 'Plumbing' });
    const duplicate = database.insert(serviceCategories).values({ slug, name: 'Plumbing 2' });
    expect(await postgresErrorCode(duplicate)).toBe(UNIQUE_VIOLATION);
  });
});

describe('isDatabaseReachable', () => {
  it('returns false instead of throwing when the query fails', async () => {
    const failing = { execute: () => Promise.reject(new Error('down')) };
    expect(await isDatabaseReachable(failing as unknown as Pick<Database, 'execute'>)).toBe(false);
  });
});
