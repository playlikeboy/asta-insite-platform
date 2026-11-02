# Monitoring

**Status:** Only `/api/health` exists. No monitoring is configured. Tools are proposals, chosen at M11; no vendor has been verified.

## Watch

| Signal               | Source                                 | Alert when                                                   |
| -------------------- | -------------------------------------- | ------------------------------------------------------------ |
| Availability         | External uptime check on `/api/health` | 2 failures in a row                                          |
| API error rate       | Logs                                   | Over 1% of requests in 5 minutes                             |
| API latency          | Logs                                   | p95 over 1 s for 10 minutes                                  |
| Database             | Appwrite console                       | CPU over 80%, connections near limit, storage over 80%       |
| Outbox               | Query                                  | Oldest pending event over 10 minutes; any permanently failed |
| Webhooks             | `payment_events`, logs                 | Signature failures; unprocessed events                       |
| Reconcile job        | Job result                             | Differences found                                            |
| Scheduled jobs       | Last run                               | Missed 2 runs                                                |
| SMS volume           | Appwrite usage                         | 3 times the normal day                                       |
| Costs                | Appwrite budget cap                    | 80% of budget                                                |
| Mobile crashes       | Sentry or similar, chosen at M11       | Crash-free sessions under 99%                                |
| Certificates, domain | Calendar                               | 30 days before expiry                                        |
| Backups              | Appwrite                               | Any failure                                                  |

## Business health

Weekly: new sign-ups, requirements posted, interests sent, acceptance rate, active subscriptions, approval queue age, reports open. A broken marketplace can look healthy on technical metrics.

## On-call

One person is on call by default (A-02). Severity and steps: [Incident response](../security/INCIDENT_RESPONSE.md). The client must agree on response hours in the maintenance terms.

## Privacy

Monitoring tools receive no message bodies, tokens or contact data. Configure scrubbing before enabling crash reporting. Add any such vendor to [Privacy](../security/PRIVACY.md).
