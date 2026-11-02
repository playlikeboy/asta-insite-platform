# Data Retention

**All periods are proposals awaiting client and legal approval (D-20).** India's DPDP Act requires erasure when the purpose ends, unless law requires retention. Get legal review.

| Data                                              | Keep                                                                 | Then                                                      |
| ------------------------------------------------- | -------------------------------------------------------------------- | --------------------------------------------------------- |
| Active account data                               | While active                                                         |                                                           |
| Deleted account: profile, avatar, personal fields | 30-day grace                                                         | Delete                                                    |
| Deleted account: requirements                     | 30-day grace                                                         | Anonymize; keep for statistics                            |
| Messages                                          | While either party's account exists; deleted user's name replaced    | Delete with the conversation after both accounts are gone |
| Chat attachments                                  | Same as messages                                                     | Delete files                                              |
| Provider verification documents                   | While provider is active; 90 days after rejection or deletion        | Delete files                                              |
| Payments, invoices, refunds                       | 8 years (Assumption for Indian tax records; confirm with accountant) | Delete or anonymize                                       |
| Payment webhook payloads                          | 1 year                                                               | Delete                                                    |
| Admin audit logs                                  | 3 years                                                              | Delete                                                    |
| Moderated content                                 | 1 year after removal                                                 | Delete                                                    |
| Notifications                                     | 180 days                                                             | Delete                                                    |
| Outbox, rate limits                               | 30 days, 1 day                                                       | Delete                                                    |
| Application logs                                  | Vendor default: 7 days on Pro for Function logs                      | Expire                                                    |
| Backups                                           | 7 days on Pro                                                        | Expire                                                    |

## Account deletion steps

1. Set `users.status = deleted`, `deleted_at = now()`. Revoke sessions. Hide from feeds.
2. Cancel gateway subscriptions. Tell store subscribers to cancel with the store.
3. After 30 days, the job deletes personal fields and owned media, anonymizes history, and deletes the Appwrite user.
4. Keep financial records linked to an anonymized user.

Deleted data can remain in backups until they expire.

## Soft delete

Only `users`, `requirements`, `content_posts` and `messages` use `deleted_at`. Queries must exclude them; repository functions handle it, so callers cannot forget.
