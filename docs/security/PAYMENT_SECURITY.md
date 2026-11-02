# Payment Security

**Status:** Planned for M4 and M10. Mechanism on mobile depends on D-05. Webhook facts verified against Razorpay docs.

## Principles

1. **No card data touches this system.** The gateway collects it. This reduces PCI scope; confirm the applicable SAQ with Razorpay.
2. **Only a verified billing event changes subscription state.** A client callback, a redirect or a return value changes nothing.
3. **Access is computed from dates.** `current_period_end` decides lead access, so a missed webhook cannot extend access forever.
4. **Money is integer paise.** Never floats.
5. **Webhook first, then reconcile.** A scheduled job asks the gateway about anything uncertain.

## Webhook processing

See [Payment endpoints](../api/PAYMENT_ENDPOINTS.md#razorpay-webhook).

- Read the raw body. Verify `X-Razorpay-Signature` by HMAC-SHA256, in constant time, before parsing.
- Insert into `payment_events` with the unique event ID. Duplicate means no action.
- All state changes occur in one transaction.
- Handle events arriving out of order.
- Never log the full payload in application logs.

## Checkout

- Plan and price come from the server. A client-sent amount is never accepted.
- `Idempotency-Key` prevents two subscriptions from a double tap. The partial unique index backs this up.

## Refunds

Finance or Super admin only. Requires a reason and an `Idempotency-Key`. Audit logged. Webhook confirms the final state. Policy is D-09.

## Secrets

Live keys only in production's server environment. Rotate on staff change or suspected exposure, and handle old-secret retries as in [Razorpay](../integrations/RAZORPAY.md). Two-factor on the gateway dashboard, with as few users as possible.

## Monitoring

Alert on webhook signature failures, unprocessed events, reconcile differences and refund spikes. See [Monitoring](../operations/MONITORING.md).

## Tests required before M4 exits

Valid event, bad signature, modified body, duplicate, out-of-order events, unknown event, activation race with double checkout, expiry, grace period.

## Store billing

If D-05 selects Apple or Google billing, add server-side validation of store receipts and notifications under the same "verified event only" rule.
