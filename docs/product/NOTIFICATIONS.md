# Notifications

**Status:** Planned for M8. Delivery details: flow 18 in [User flows](USER_FLOWS.md). Vendors: [Push](../integrations/PUSH_NOTIFICATIONS.md), [Email](../integrations/EMAIL.md).

## Catalog

| Event                                | Recipient      | Push | In-app       | Email    | Deep link                |
| ------------------------------------ | -------------- | ---- | ------------ | -------- | ------------------------ |
| New matching lead (digest)           | Provider       | Yes  | Yes          | No       | Leads                    |
| Provider showed interest             | Customer       | Yes  | Yes          | No       | Interested professionals |
| Interest accepted                    | Provider       | Yes  | Yes          | No       | Chat                     |
| Interest declined                    | Provider       | No   | Yes          | No       | Connections              |
| New message                          | Other member   | Yes  | Unread badge | No       | Chat                     |
| Provider approved or rejected        | Provider       | Yes  | Yes          | Yes      | Provider status          |
| Subscription activated               | Provider       | Yes  | Yes          | Yes      | Subscription             |
| Renewal failed                       | Provider       | Yes  | Yes          | Yes      | Subscription             |
| Subscription expiring (7 and 1 days) | Provider       | Yes  | Yes          | Yes      | Subscription             |
| New review                           | Provider       | Yes  | Yes          | No       | Reviews                  |
| Content removed                      | Provider       | Yes  | Yes          | Yes      | Post                     |
| Account deletion confirmed           | User           | No   | No           | Yes      | None                     |
| Admin announcement                   | Chosen segment | Yes  | Yes          | Optional | Chosen screen            |

## Rules

- **Consent:** ask for push permission at a useful moment, such as after posting a requirement. Never ask on first launch.
- **Privacy:** lock screen text is generic: "New message from a professional", not the message.
- **Frequency:** combine lead notifications into a digest; default at most 3 per day per provider (Assumption).
- **Quiet hours:** 9 PM to 8 AM IST for non-urgent notifications (Assumption).
- **Marketing:** separate opt-out; transactional messages stay on.
- **Reliability:** written to the outbox in the business transaction, sent by a job, safe to retry.
