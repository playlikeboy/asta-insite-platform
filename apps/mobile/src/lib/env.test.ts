import { afterEach, describe, expect, it, vi } from 'vitest';
import { parseMobileEnv, readMobileEnv } from './env';

const valid = {
  EXPO_PUBLIC_APPWRITE_ENDPOINT: 'https://sgp.cloud.appwrite.io/v1',
  EXPO_PUBLIC_APPWRITE_PROJECT_ID: 'project',
  EXPO_PUBLIC_API_BASE_URL: 'http://192.168.1.10:3000',
};

describe('parseMobileEnv', () => {
  it('accepts a complete environment', () => {
    expect(parseMobileEnv(valid)).toEqual(valid);
  });

  it('names missing variables', () => {
    expect(() => parseMobileEnv({ ...valid, EXPO_PUBLIC_APPWRITE_PROJECT_ID: undefined })).toThrow(
      'EXPO_PUBLIC_APPWRITE_PROJECT_ID',
    );
  });

  it('rejects a plain HTTP Appwrite endpoint', () => {
    const insecure = { ...valid, EXPO_PUBLIC_APPWRITE_ENDPOINT: 'http://sgp.cloud.appwrite.io/v1' };
    expect(() => parseMobileEnv(insecure)).toThrow('EXPO_PUBLIC_APPWRITE_ENDPOINT');
  });

  it('never includes values in the error', () => {
    const invalid = { ...valid, EXPO_PUBLIC_API_BASE_URL: 'not-a-url-secret-value' };
    expect(() => parseMobileEnv(invalid)).not.toThrow('secret-value');
  });
});

describe('readMobileEnv', () => {
  afterEach(() => vi.unstubAllEnvs());

  it('reads each public variable from process.env', () => {
    for (const [name, value] of Object.entries(valid)) vi.stubEnv(name, value);
    expect(readMobileEnv()).toEqual(valid);
  });
});
