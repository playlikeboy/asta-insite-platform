# Razorpay

**Status:** Planned for M4 and M10. Whether it runs inside the iOS and Android apps depends on **D-05**. Design for both.

## What it does

Plans, subscriptions, UPI AutoPay, e-mandates. The Subscriptions overview page does not cover React Native, so the integration path (hosted link or a native SDK) needs a spike at M4.

## Flow

See [Payment flow](../architecture/diagrams/PAYMENT_FLOW.mmd) and [Payment endpoints](../api/PAYMENT_ENDPOINTS.md).

1. Plans exist both in `subscription_plans` and in Razorpay. `provider_product_ids` stores the mapping.
2. Server creates the subscription and returns public checkout fields.
3. Provider pays. The client's success callback changes nothing.
4. A signed webhook activates the subscription. A reconcile job catches missed events.

## Webhook rules (verified against vendor docs)

- Signature: `X-Razorpay-Signature`, HMAC-SHA256 of the raw body using the webhook secret.
- Vendor warning: "Do not parse or cast the webhook request body."
- Events can repeat and arrive out of order. Deduplicate on `x-razorpay-event-id`.
- After rotating the secret, retried older requests need checking against the old secret, so keep both during the changeover.

## Credentials

| Name                      | Secret                 | Where  |
| ------------------------- | ---------------------- | ------ |
| `RAZORPAY_KEY_ID`         | No, though server-held | Server |
| `RAZORPAY_KEY_SECRET`     | Yes                    | Server |
| `RAZORPAY_WEBHOOK_SECRET` | Yes                    | Server |

Separate test and live credentials. Live credentials go to production only.

## When it is down

Checkout shows "Payments are temporarily unavailable." Existing subscriptions continue, since access is computed from `current_period_end` in our database. A renewal grace period applies only if D-04 sets one (see [Subscription model](../product/SUBSCRIPTION_MODEL.md)).

## Testing

Use test mode and its test cards and UPI handles, plus automated tests with signed fixture payloads: valid, invalid signature, duplicate, out of order. No real money in tests.

## Fees

Not verified. Get them from the client's Razorpay agreement.
