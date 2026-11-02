import { z } from 'zod';

const schema = z.object({
  EXPO_PUBLIC_APPWRITE_ENDPOINT: z.url({ protocol: /^https$/ }),
  EXPO_PUBLIC_APPWRITE_PROJECT_ID: z.string().min(1),
  EXPO_PUBLIC_API_BASE_URL: z.url({ protocol: /^https?$/ }),
});

export type MobileEnv = z.infer<typeof schema>;

/** Expo only inlines direct process.env.EXPO_PUBLIC_* reads, so callers pass each one explicitly. */
export function parseMobileEnv(source: Record<keyof MobileEnv, string | undefined>): MobileEnv {
  const result = schema.safeParse(source);
  if (!result.success) {
    const names = result.error.issues.map((issue) => issue.path.join('.')).join(', ');
    throw new Error(
      `Invalid mobile environment: ${names}. See docs/operations/ENVIRONMENT_VARIABLES.md`,
    );
  }
  return result.data;
}

export const readMobileEnv = () =>
  parseMobileEnv({
    EXPO_PUBLIC_APPWRITE_ENDPOINT: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
    EXPO_PUBLIC_APPWRITE_PROJECT_ID: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
    EXPO_PUBLIC_API_BASE_URL: process.env.EXPO_PUBLIC_API_BASE_URL,
  });
