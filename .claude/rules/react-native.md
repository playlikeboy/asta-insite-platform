---
paths:
  - 'apps/mobile/**'
---

# React Native

- Use HeroUI Native first, then Uniwind classes. No raw hex; import from `@asta/design-tokens` only where a class cannot reach.
- `withUniwindConfig` stays outermost in `metro.config.js`. HeroUI's provider stays inside `GestureHandlerRootView`.
- Server state goes in TanStack Query, never copied to `useState`.
- Each screen has loading, empty, error and offline states. Icon buttons have `accessibilityLabel`. Targets are at least 48.
- Only `EXPO_PUBLIC_*` values are readable, and they are public.
- Use `expo install` for Expo-managed packages, so versions match the SDK.
- Customer-facing copy avoids jargon and never says "lead".
