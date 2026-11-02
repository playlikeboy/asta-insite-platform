# apps/mobile

Expo SDK 58 with Expo Router, HeroUI Native and Uniwind. Read [Mobile architecture](../../docs/architecture/MOBILE_ARCHITECTURE.md) and [Mobile screens](../../docs/design/MOBILE_SCREENS.md).

- Every screen is a placeholder today. `src/app/index.tsx` is a temporary chooser, removed at M2.
- Data comes from the API through TanStack Query. Appwrite SDK only for sign-in, uploads, Realtime signals and push targets.
- No secrets. Env is read in `src/lib/env.ts`, from `apps/mobile/.env.local`, not the root `.env`.
- Touch targets are at least 48. Each data screen has loading, empty, error and offline states.
- `withUniwindConfig` must be the outermost Metro wrapper. Forward safe-area insets manually.
- A passing `pnpm --filter mobile bundle:check` proves it compiles, not that it runs. Test on a real device for native work.
