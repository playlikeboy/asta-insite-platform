# Security Overview

## Status

| Control                                                          | Status                             |
| ---------------------------------------------------------------- | ---------------------------------- |
| No secrets in the repository; `.env` ignored; templates only     | Implemented                        |
| Environment validation that names variables, never values        | Implemented                        |
| Non-public admin pages excluded from indexing                    | Implemented                        |
| CI dependency audit at high level                                | Implemented, not yet run on GitHub |
| Authentication, authorization, rate limits, webhooks, audit logs | Planned M2 onward                  |

## Principles

1. **The server decides.** Mobile and web only display. Every rule is enforced in the API, regardless of what the UI shows.
2. **Mobile never touches PostgreSQL.** It talks to the API, plus Appwrite for sign-in, uploads and signals.
3. **Least privilege.** Scoped API keys, separate environments, admin roles.
4. **Default deny.** New buckets, endpoints and table permissions begin closed.
5. **Verify external events.** Only signed webhooks change payment state.
6. **Record admin actions.** Insert-only audit log.
7. **Collect less.** Appwrite holds phone and email. Our tables don't repeat them.

## Documents

| Topic                   | Document                                  |
| ----------------------- | ----------------------------------------- |
| Threats and mitigations | [Threat model](THREAT_MODEL.md)           |
| Who can do what         | [Authorization](AUTHORIZATION.md)         |
| API controls            | [API security](API_SECURITY.md)           |
| Uploads and access      | [File security](FILE_SECURITY.md)         |
| Money                   | [Payment security](PAYMENT_SECURITY.md)   |
| Personal data           | [Privacy](PRIVACY.md)                     |
| When things go wrong    | [Incident response](INCIDENT_RESPONSE.md) |

## Known current exposures

| Item                                                                                             | Status                                                         |
| ------------------------------------------------------------------------------------------------ | -------------------------------------------------------------- |
| Repository is public                                                                             | D-17. No secrets are committed, but business rules are visible |
| An Appwrite API key was pasted into a chat tool during setup                                     | It was not stored or used. The key owner must rotate it        |
| Pre-launch dependency audit: 3 advisories (1 low, 2 moderate), none high, at the time of writing | Recheck on each release                                        |
| PostgreSQL reachable from the public internet with credentials                                   | Set an allowlist if Sites can offer static egress              |

## Before any commit

- No secrets, tokens, real phone numbers or client documents.
- User input validated by a schema.
- Authorization tested, including the "other user's record" case.
- Errors reveal nothing internal.
