# Acceptance Criteria

The 18 workflows in [User flows](../product/USER_FLOWS.md) are the test scenarios. A feature is complete only when its tests pass, its status is updated, and it has been used on a real device or browser.

## Definition of done (every feature)

- [ ] Meets its requirement ID
- [ ] Unit and integration tests pass; coverage at or above 80%
- [ ] Authorization negative tests pass
- [ ] Loading, empty, error and offline states work
- [ ] Accessibility checks pass
- [ ] Docs, OpenAPI and status updated
- [ ] Used on real iOS and Android, or a browser for admin

## By workflow

| Flow                    | Pass condition                                                                                            | Milestone |
| ----------------------- | --------------------------------------------------------------------------------------------------------- | --------- |
| 1 Customer registration | New number signs up by OTP; reinstall restores account without duplicate; wrong code rejected and limited | M2, M3    |
| 2 Provider registration | Incomplete profile cannot submit; rejected provider sees the reason                                       | M4        |
| 3 Subscription          | Only a verified event activates; client success alone does nothing; duplicate has no effect               | M4        |
| 4 Requirement           | Missing required answers rejected by the server; draft survives closing the app                           | M5        |
| 5 Dynamic forms         | Publishing a new version leaves existing requirements readable                                            | M5        |
| 6 Lead discovery        | Unapproved, unsubscribed or expired provider sees nothing; contacts absent from API responses             | M6        |
| 7 Show Interest         | Duplicate returns the same interest; limit enforced; customer notified                                    | M6        |
| 8 Connection            | Two simultaneous accepts create one connection                                                            | M6        |
| 9 Conversation          | Exists only after connection; no public create route                                                      | M6, M8    |
| 10 Chat                 | Non-member gets 404; retry doesn't duplicate; reconnect fetches missed messages                           | M8        |
| 11 Media                | Wrong type or size rejected; another user's file cannot be completed; orphans cleaned                     | M3        |
| 12 Content              | Removed post disappears from feeds; author told why                                                       | M7        |
| 13 Reviews              | One per connection; average correct; rules per D-13                                                       | M8        |
| 14 Approval             | Only Operations or Super admin can decide; reason required; audit row exists                              | M4, M9    |
| 15 Expiry               | Lead access ends at the correct date even if a webhook is missed                                          | M4        |
| 16 Refund               | Finance only; repeat does not double refund; webhook finalizes                                            | M10       |
| 17 Account deletion     | Available in-app; hidden at once; purged after grace; financial records kept                              | M11       |
| 18 Push                 | Arrives on real devices; deep link authorized; failure leaves the in-app record                           | M8        |

## Non-functional

| Requirement                                   | Check               |
| --------------------------------------------- | ------------------- |
| API p95 under 300 ms from Ranchi              | S-02, M11 load test |
| Chat signal p95 under 2 s                     | S-03                |
| WCAG 2.2 AA on admin; same criteria on mobile | M11                 |
| Restore tested                                | M11                 |
| No high or critical audit findings            | CI                  |

## Client acceptance

Client sign-off by milestone is not yet agreed. Propose: a staging demo per milestone with written approval within 5 working days. Tie this to D-18 and D-19.
