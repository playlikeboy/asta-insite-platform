# Push Notifications

**Status:** Planned for M8. Decision: [ADR-012](../architecture/ARCHITECTURE_DECISIONS.md#adr-012-native-push-tokens-through-appwrite-messaging). Spike S-05 must prove it first.

## Chain

```
expo-notifications getDevicePushTokenAsync()  (native FCM or APNs token, not an Expo token)
  -> account.createPushTarget(...)            (registered with Appwrite)
  -> outbox job calls Messaging               (server, with API key)
  -> FCM (Android) or APNs (iOS)
```

Appwrite's docs do not mention React Native or Expo for Messaging, which is why S-05 exists. **Fallback if it fails:** Expo Push Service, storing tokens in a new `device_tokens` table.

## Setup

| Platform | Needs                                                          | From                             |
| -------- | -------------------------------------------------------------- | -------------------------------- |
| Android  | Firebase project, service account JSON, `google-services.json` | Client's Firebase                |
| iOS      | APNs key (`.p8`), key ID, team ID, bundle ID                   | Client's Apple Developer account |

These go in the Appwrite console, not the repository. A development build is required, since push does not work in Expo Go.

## Rules

- Ask for permission at a useful moment. Never at first launch.
- Register on sign-in, remove on sign-out. Refresh when the token changes.
- Lock screen text is generic. Never include message content.
- Each push carries a deep link. Authorization runs again when opened.
- Respect digest, quiet hours and marketing opt-out in [Notifications](../product/NOTIFICATIONS.md).

## When it is down

In-app notifications are unaffected. Failed sends retry through the outbox and then stop. Push is never the only record of an event.
