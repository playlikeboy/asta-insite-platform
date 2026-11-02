import { z } from 'zod';

const serverEnvSchema = z.object({
  DATABASE_URL: z.url({ protocol: /^postgres(ql)?$/ }),
});

export type ServerEnv = z.infer<typeof serverEnvSchema>;

/** Reads on demand so `next build` works without runtime secrets. Errors name variables, not values. */
export function parseServerEnv(source: Record<string, string | undefined>): ServerEnv {
  const result = serverEnvSchema.safeParse(source);
  if (!result.success) {
    const names = result.error.issues.map((issue) => issue.path.join('.')).join(', ');
    throw new Error(
      `Invalid server environment: ${names}. See docs/operations/ENVIRONMENT_VARIABLES.md`,
    );
  }
  return result.data;
}
