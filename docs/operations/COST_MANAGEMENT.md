# Cost Management

Figures: [Cost estimates](../integrations/COST_ESTIMATES.md). The list price of the Pro plan is unverified.

## Who pays what

The client holds and pays all vendor accounts. The developer's fee is separate. Appwrite consolidates hosting, auth, storage and database, but cannot combine Razorpay, telecom delivery or store fees.

| Bill                         | Basis                                             |
| ---------------------------- | ------------------------------------------------- |
| Appwrite                     | Plan, database compute, usage                     |
| SMS                          | Per message (through Appwrite, or MSG91 per D-12) |
| Resend                       | Plan or usage                                     |
| Razorpay                     | Transaction fee                                   |
| Store commission             | Per D-05                                          |
| EAS                          | Free plan first                                   |
| Apple Developer, Google Play | Membership fees                                   |
| Domain                       | Annual                                            |

FCM and APNs require configuration; vendor pricing wasn't checked.

## Controls

- Set an Appwrite budget cap. On Pro, projects otherwise keep running and overage applies.
- Use the smallest database that passes load tests; step up on evidence.
- Keep dev and staging as small as possible; pause what isn't in use.
- Compress images and video before upload; serve thumbnails.
- Rate-limit SMS and alert on spikes.
- Use mock numbers in tests.
- Delete orphan media.
- Review costs monthly against [Monitoring](MONITORING.md).

## Biggest risks

| Risk                          | Control                             |
| ----------------------------- | ----------------------------------- |
| Video storage and bandwidth   | Limits, compression, S-07           |
| SMS pumping                   | Limits, alerts                      |
| Store commission              | D-05 decision                       |
| HA replica at full tier price | Add only if uptime needs justify it |
