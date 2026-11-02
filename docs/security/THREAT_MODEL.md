# Threat Model

Status of mitigations: **Planned**, built with the listed milestone. Assets: customer data, chat, verification documents, payment records, lead value, admin access.

## Actors

Anonymous internet user, signed-in customer or provider acting maliciously, unsubscribed provider wanting free leads, compromised admin, compromised dependency, attacker holding a stolen phone or token.

## Threats

| #    | Threat                                                                       | Impact        | Mitigation                                                                                    | Milestone |
| ---- | ---------------------------------------------------------------------------- | ------------- | --------------------------------------------------------------------------------------------- | --------- |
| T-01 | Reading another user's requirement, chat or invoice by changing an ID (BOLA) | High          | Ownership checks in services; 404 response; negative tests per endpoint                       | M2+       |
| T-02 | Provider reads leads without paying                                          | High, revenue | Lead access computed on the server each request; leads hide contacts                          | M6        |
| T-03 | Scraping provider contacts or leads                                          | Medium        | No contact data in APIs before connection; rate limits; cursors; lead view monitoring         | M6        |
| T-04 | Forged payment webhook activates a subscription                              | High          | HMAC verification over raw body; constant-time compare                                        | M4        |
| T-05 | Replayed webhook or duplicate event                                          | Medium        | Unique `payment_events` key                                                                   | M4        |
| T-06 | Client claims payment success                                                | High          | Client success never changes state                                                            | M4        |
| T-07 | OTP brute force                                                              | High          | Appwrite limits plus lockout; monitor                                                         | M2        |
| T-08 | SMS pumping runs up the bill                                                 | Medium        | Per-IP and per-number limits; budget alert; alert on spikes                                   | M2        |
| T-09 | Malicious upload (script as image, oversized file)                           | Medium        | Extension and size enforced by bucket and API; server-confirmed metadata; no user HTML served | M3        |
| T-10 | Private files leaked by a guessed URL                                        | High          | Private buckets; short-lived tokens after permission check                                    | M3        |
| T-11 | Stored XSS through posts or chat in admin                                    | High          | Plain text rendering; React escaping; no raw HTML; CSP                                        | M7, M9    |
| T-12 | Stolen admin credentials                                                     | Critical      | MFA; short sessions; roles; audit log; login rate limit                                       | M2, M9    |
| T-13 | Malicious admin                                                              | High          | Role separation; reason required; insert-only audit log                                       | M9        |
| T-14 | Leaked server API key or database URL                                        | Critical      | Environment-only secrets; scoped keys; rotation runbook                                       | M1        |
| T-15 | Secret bundled in mobile app                                                 | Critical      | Only `EXPO_PUBLIC_*` read in client; review rule                                              | M1        |
| T-16 | SQL injection                                                                | High          | Drizzle parameterized queries; `sql` templates only with bound values                         | M2        |
| T-17 | Internal job endpoint called by outsiders                                    | Medium        | Secret header, constant-time compare; idempotent jobs                                         | M4        |
| T-18 | Harassment or spam in chat                                                   | Medium        | Chat only after mutual acceptance; reports; suspension                                        | M8        |
| T-19 | Fake providers                                                               | High, trust   | Admin approval; credential review; reviews tied to real connections                           | M4, M9    |
| T-20 | Fake reviews                                                                 | Medium        | One review per connection                                                                     | M8        |
| T-21 | Compromised dependency                                                       | High          | Lockfile; pnpm release-age delay; audit in CI; build scripts allowlist                        | M0        |
| T-22 | Realtime signal leaks data                                                   | Medium        | Signals contain only IDs; row permissions; proven by S-03                                     | M8        |
| T-23 | Deep link or push opens another user's data                                  | Medium        | API authorizes on open                                                                        | M8        |
| T-24 | Data lost by migration or deletion                                           | High          | Backups; expand-then-contract; soft delete; rehearsal                                         | M2, M11   |
| T-25 | Stolen phone with an open session                                            | Medium        | Secure storage; session list and revocation if time allows                                    | M2        |

## Residual risks accepted for now

- Single vendor for hosting, auth and data (A-04).
- Chat messages are readable by the platform; no end-to-end encryption. Say so in the privacy policy.
- PostgreSQL reachable publicly with credentials, unless an allowlist proves possible.
- Stored data encryption is the vendor's responsibility; confirm details in S-08.

## Review

Update this at every milestone that adds a data flow, and before launch. Use the [security audit skill](../../.claude/skills/security-audit/SKILL.md).
