import { createDatabase } from '@asta/database';
import { afterEach, describe, expect, it, vi } from 'vitest';

vi.mock('server-only', () => ({}));
vi.mock('@asta/database', () => ({ createDatabase: vi.fn(() => ({ id: 'client' })) }));

describe('getDatabase', () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
    vi.mocked(createDatabase).mockClear();
  });

  it('creates one client per process', async () => {
    vi.stubEnv('DATABASE_URL', 'postgresql://user:pw@db.example.com:6432/asta');
    const { getDatabase } = await import('./database');
    expect(getDatabase()).toBe(getDatabase());
    expect(createDatabase).toHaveBeenCalledTimes(1);
  });

  it('refuses to create a client from invalid configuration', async () => {
    vi.stubEnv('DATABASE_URL', 'not-a-url');
    const { getDatabase } = await import('./database');
    expect(() => getDatabase()).toThrow('DATABASE_URL');
    expect(createDatabase).not.toHaveBeenCalled();
  });
});
