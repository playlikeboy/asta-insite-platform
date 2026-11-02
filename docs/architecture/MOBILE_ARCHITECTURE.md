# Mobile Architecture

**Status:** Navigation skeleton Implemented and bundled for iOS and Android. **Not yet run on a device or simulator.** Features Planned.

## Stack

Expo SDK 58, React Native 0.88, Expo Router with typed routes, HeroUI Native, Uniwind, Reanimated, Gesture Handler, TanStack Query, Lucide. Add expo-image, FlashList, React Hook Form, expo-secure-store, expo-notifications and react-native-appwrite when a feature needs them.

## Navigation

```text
/                     Sign-in or mode choice (temporary chooser today)
/customer/            Home, Explore, Post, Inbox, Profile
/provider/            Dashboard, Leads, Portfolio, Inbox, Profile
```

The tabs use folders, not route groups. Both segments have `inbox` and `profile`, and groups would make the URLs collide.

A person with both profiles switches modes from Profile (D-01). **Mode is a display choice only.** The server decides what each request may do.

## Folder rules

- `src/app`: route files only; each renders a feature screen.
- `src/features/<segment>/<feature>`: screens, hooks, components for that feature.
- `src/lib`: API client, Appwrite client, environment, query keys.

## Data

- All business data comes from `/api/v1` with TanStack Query.
- API client responsibilities: attach a fresh JWT, parse with `@asta/contracts`, map errors by `code`, retry once on 401 with a new JWT.
- Cache a new JWT in memory for up to its 15-minute life. Never persist it. Appwrite manages the session itself.

## Screen requirements

Every data screen handles loading, empty, error and offline states. Respect safe areas and the keyboard. Use FlashList for long lists and expo-image with Appwrite preview sizes for images. Minimum touch target is 48 points.

## Environment

Only `EXPO_PUBLIC_*` values reach the app, and they ship inside the binary, so they must never be secret. `readMobileEnv()` runs at launch and fails with variable names if one is missing.

## Builds

Push notifications and native modules need a development build, not Expo Go. Use EAS Build; see [Deployment](../operations/DEPLOYMENT.md).

## Known gaps

- HeroUI's built-in `Text` does not use Manrope until the provider's text props are set. Screens currently use React Native `Text` with `font-manrope` classes.
- The open source Uniwind build needs safe-area insets forwarded with `SafeAreaListener` before `pt-safe` style classes work.
- `splash-icon.png` and app icons are generator defaults. Replace them with brand assets.
