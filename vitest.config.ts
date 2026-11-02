import { defineConfig } from 'vitest/config';

// Coverage only. Day-to-day tests run per package through `pnpm test`.
export default defineConfig({
  test: {
    projects: [
      'apps/web',
      'apps/mobile',
      'packages/contracts',
      'packages/database',
      'packages/design-tokens',
    ],
    coverage: {
      provider: 'v8',
      include: ['apps/*/src/**/*.ts', 'packages/*/src/**/*.ts'],
      // Declarative or vendored only. .tsx screens are covered by E2E tests, not by this report.
      exclude: [
        '**/*.test.ts',
        '**/*.d.ts',
        'apps/web/src/components/ui/**',
        'apps/web/src/components/admin-nav.ts',
        'apps/web/src/hooks/use-mobile.ts',
        'apps/web/src/lib/utils.ts',
        'apps/mobile/src/lib/tab-options.ts',
        'packages/database/src/schema/**',
      ],
      thresholds: { lines: 80, functions: 80, branches: 80, statements: 80 },
    },
  },
});
