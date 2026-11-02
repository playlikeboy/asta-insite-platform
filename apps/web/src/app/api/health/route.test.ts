import { apiResponse, healthStatus } from '@asta/contracts';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getDatabase } from '@/lib/database';

import { GET } from './route';

vi.mock('@/lib/database', () => ({ getDatabase: vi.fn() }));

const responseSchema = apiResponse(healthStatus);
const mockedGetDatabase = vi.mocked(getDatabase);

function databaseWith(execute: () => Promise<unknown>) {
  return { execute } as unknown as ReturnType<typeof getDatabase>;
}

describe('GET /api/health', () => {
  beforeEach(() => {
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
  });

  it('returns 200 and the contract shape when the database answers', async () => {
    mockedGetDatabase.mockReturnValue(databaseWith(() => Promise.resolve()));
    const response = await GET();
    expect(response.status).toBe(200);
    expect(responseSchema.parse(await response.json())).toMatchObject({ success: true });
  });

  it('returns 503 when the database query fails', async () => {
    mockedGetDatabase.mockReturnValue(databaseWith(() => Promise.reject(new Error('down'))));
    const response = await GET();
    expect(response.status).toBe(503);
    expect(responseSchema.parse(await response.json())).toMatchObject({ success: false });
  });

  it('returns a generic 503 without leaking details when configuration is invalid', async () => {
    mockedGetDatabase.mockImplementation(() => {
      throw new Error('Invalid server environment: DATABASE_URL');
    });
    const response = await GET();
    expect(response.status).toBe(503);
    expect(JSON.stringify(await response.json())).not.toContain('DATABASE_URL');
  });
});
