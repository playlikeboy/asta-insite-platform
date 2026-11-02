import { z } from 'zod';

/** Stable, client-safe error codes. Clients branch on these, never on message text. */
export const apiErrorCode = z.enum([
  'VALIDATION_FAILED',
  'UNAUTHENTICATED',
  'FORBIDDEN',
  'NOT_FOUND',
  'CONFLICT',
  'RATE_LIMITED',
  'INTERNAL_ERROR',
  'SERVICE_UNAVAILABLE',
]);
export type ApiErrorCode = z.infer<typeof apiErrorCode>;

export const apiError = z.object({
  code: apiErrorCode,
  message: z.string(),
  fields: z.record(z.string(), z.array(z.string())).optional(),
});
export type ApiError = z.infer<typeof apiError>;

export const pageMeta = z.object({
  nextCursor: z.string().nullable(),
  limit: z.number().int().positive(),
});
export type PageMeta = z.infer<typeof pageMeta>;

/** Builds the response envelope schema for a payload. See docs/api/API_STANDARDS.md. */
export function apiResponse<T extends z.ZodType>(data: T) {
  return z.discriminatedUnion('success', [
    z.object({ success: z.literal(true), data, meta: pageMeta.optional() }),
    z.object({ success: z.literal(false), error: apiError }),
  ]);
}

export type ApiResponse<T> =
  { success: true; data: T; meta?: PageMeta } | { success: false; error: ApiError };

export const MAX_PAGE_SIZE = 100;

/** Cursor pagination query. Query strings arrive as text, so limit is coerced. */
export const pageQuery = z.object({
  cursor: z.string().min(1).max(512).optional(),
  limit: z.coerce.number().int().min(1).max(MAX_PAGE_SIZE).default(20),
});
export type PageQuery = z.infer<typeof pageQuery>;

export const healthStatus = z.object({
  status: z.literal('ok'),
  database: z.literal('up'),
});
export type HealthStatus = z.infer<typeof healthStatus>;
