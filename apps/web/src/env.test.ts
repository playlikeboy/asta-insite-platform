import { describe, expect, it } from 'vitest';
import { parseServerEnv } from './env';

describe('parseServerEnv', () => {
  it('accepts a PostgreSQL URL', () => {
    const DATABASE_URL = 'postgresql://admin:pw@db.example.com:6432/asta?sslmode=require';
    expect(parseServerEnv({ DATABASE_URL })).toEqual({ DATABASE_URL });
  });

  it.each([undefined, '', 'mysql://host/db', 'not-a-url'])('rejects %s', (DATABASE_URL) => {
    expect(() => parseServerEnv({ DATABASE_URL })).toThrow('DATABASE_URL');
  });

  it('never includes the value in the error', () => {
    expect(() => parseServerEnv({ DATABASE_URL: 'mysql://user:hunter2@host/db' })).not.toThrow(
      'hunter2',
    );
  });
});
