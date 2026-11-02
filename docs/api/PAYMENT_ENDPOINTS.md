# Payment Endpoints

Status: Planned for M4 and M10. Mechanism depends on D-05. [Payment security](../security/PAYMENT_SECURITY.md).

| Method | Path                                   | Requires                             | Purpose                   |
| ------ | -------------------------------------- | ------------------------------------ | ------------------------- |
| GET    | `/api/v1/subscription-plans`           | Signed in                            | Active plans              |
| POST   | `/api/v1/subscriptions/checkout`       | Approved provider, `Idempotency-Key` | Start checkout            |
| GET    | `/api/v1/subscriptions/current`        | Provider                             | Current status and period |
| POST   | `/api/v1/subscriptions/current/cancel` | Provider                             | Cancel at period end      |
| GET    | `/api/v1/me/invoices`                  | Provider                             | Invoices                  |
| GET    | `/api/v1/me/invoices/:id/download`     | Owner                                | Short-lived link          |
| POST   | `/api/webhooks/razorpay`               | Signature                            | Gateway events            |

## Checkout

Request: `{ "planId": "uuid" }`. Response: fields the gateway's checkout needs. Secrets are never included. Activation does not happen here.

| Status | When                            |
| ------ | ------------------------------- |
| 403    | Provider not approved           |
| 409    | Already has a live subscription |

## Razorpay webhook

1. Read the raw body; do not parse first.
2. Verify `X-Razorpay-Signature`, HMAC-SHA256 with the webhook secret, using a constant-time compare.
3. Invalid: 400, log, no processing.
4. Insert `x-razorpay-event-id` in `payment_events`. Duplicate: 200, no change.
5. Process in a transaction. Handle out-of-order events by comparing state and timestamps, because `payment.captured` can arrive before `payment.authorized`.
6. Return 200 quickly.

Store billing endpoints for Apple and Google are added only if D-05 chooses them.
