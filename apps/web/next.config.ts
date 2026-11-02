import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Internal packages ship TypeScript source, so Next.js compiles them.
  transpilePackages: ['@asta/contracts', '@asta/database', '@asta/design-tokens'],
};

export default nextConfig;
