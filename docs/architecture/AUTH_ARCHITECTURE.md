# Auth Architecture

**Status:** Planned for M2. See [ADR-005](ARCHITECTURE_DECISIONS.md#adr-005-appwrite-auth-for-identity-postgresql-for-roles) and [AUTH_FLOW](diagrams/AUTH_FLOW.mmd).

## Methods

| User     | Methods                               | Status                    |
| -------- | ------------------------------------- | ------------------------- |
| Customer | Phone OTP, email OTP, social login    | Confirmed; providers D-11 |
| Provider | Phone OTP, email OTP                  | Confirmed                 |
| Admin    | Email and password with mandatory MFA | Proposed; invite only     |

## Mobile

1. Sign in through `react-native-appwrite`. Appwrite creates the session.
2. `account.createJWT()` returns a token valid for 15 minutes.
3. Send `Authorization: Bearer <jwt>` to the API.
4. The API builds a per-request Appwrite client with `setJWT`, then calls `account.get()`.
5. The API finds or creates the `users` row, then loads profiles.

Spike needed: `account.get()` on every request adds a network call. Measure it in M2. If it is too slow, cache the verified result in the process for up to 60 seconds, keyed by a hash of the token. A suspended account is checked in PostgreSQL on every request regardless.

## Admin web

1. The browser posts credentials to a server action.
2. The server creates the session with `createEmailPasswordSession` using an API key limited to `sessions.write`.
3. The server sets `a_session_<PROJECT_ID>` with `httpOnly`, `secure`, `sameSite: strict`.
4. Each request builds a session client, calls `account.get()`, requires a row in `admin_users`, and requires MFA to be complete.

## Roles

Roles are derived and never accepted from a client.

| Role                      | Source                                                                                 |
| ------------------------- | -------------------------------------------------------------------------------------- |
| customer                  | Row in `customer_profiles`                                                             |
| provider                  | Row in `provider_profiles`                                                             |
| provider with lead access | `approval_status = approved`, active subscription, account active                      |
| admin                     | Row in `admin_users`, with `role`: `super_admin`, `operations`, `finance`, `moderator` |

A person cannot become an admin through any API request from the mobile app. The first super admin is created by a documented operational script.

## OAuth on mobile

Follow Appwrite's OAuth guide and verify the redirect with `state`. Add the `astainsite://` scheme and test it on a real device. Deep-link details were not on the quick-start page and must be checked in M2.

## Sign-out and revocation

Delete the Appwrite session. JWTs die with their session. A suspended user is blocked by `users.status`, even with a valid JWT.
