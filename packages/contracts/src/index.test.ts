import { describe, expect, it } from 'vitest';
import { MAX_PAGE_SIZE, apiResponse, healthStatus, pageQuery } from './index';

describe('pageQuery', () => {
  it('defaults the limit and coerces query string values', () => {
    expect(pageQuery.parse({}).limit).toBe(20);
    expect(pageQuery.parse({ limit: '50' }).limit).toBe(50);
  });

  it.each(['0', '-1', '1.5', 'abc', String(MAX_PAGE_SIZE + 1)])('rejects limit %s', (limit) => {
    expect(pageQuery.safeParse({ limit }).success).toBe(false);
  });

  it('rejects an empty cursor', () => {
    expect(pageQuery.safeParse({ cursor: '' }).success).toBe(false);
  });
});

describe('apiResponse', () => {
  const schema = apiResponse(healthStatus);

  it('accepts a success envelope', () => {
    const body = { success: true, data: { status: 'ok', database: 'up' } };
    expect(schema.parse(body)).toEqual(body);
  });

  it('accepts an error envelope', () => {
    const body = { success: false, error: { code: 'NOT_FOUND', message: 'Missing' } };
    expect(schema.parse(body)).toEqual(body);
  });

  it('rejects success without data and failure without error', () => {
    expect(schema.safeParse({ success: true }).success).toBe(false);
    expect(schema.safeParse({ success: false }).success).toBe(false);
  });

  it('rejects an unknown error code', () => {
    const body = { success: false, error: { code: 'TEAPOT', message: 'No' } };
    expect(schema.safeParse(body).success).toBe(false);
  });
});
