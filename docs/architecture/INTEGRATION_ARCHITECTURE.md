# Integration Architecture

All third-party calls go through a small adapter in the owning domain module, so a vendor can change without touching business rules. Adapters arrive with the milestone that needs them. Details are in [Integrations](../integrations/OVERVIEW.md).

| Service               | Direction                    | Trigger                   | On failure                                     |
| --------------------- | ---------------------------- | ------------------------- | ---------------------------------------------- |
| Appwrite Auth         | App and API to Appwrite      | Sign-in, each API request | 401 or 503; never fall back to unauthenticated |
| Appwrite Storage      | App to Appwrite; API checks  | Upload, serve             | Upload retry in the app; registration refused  |
| Appwrite TablesDB     | API to Appwrite              | After a message           | Logged; outbox retries; app polls              |
| Appwrite Messaging    | Job to Appwrite              | Outbox                    | Retry with backoff, then dead-letter status    |
| Razorpay              | API to gateway; webhook back | Checkout, events          | Webhook is authoritative; daily reconciliation |
| Resend or MSG91       | Through Appwrite Messaging   | Outbox                    | Same as Messaging                              |
| Apple, Google billing | Open                         | D-05                      | Not designed yet                               |

## Rules

- Set a timeout on every outbound call.
- Keep external calls out of database transactions. Commit first, or use the outbox.
- Verify every inbound webhook before parsing.
- Store the vendor's ID on our row so records can be reconciled.
- Log vendor failures with request IDs and without personal data.
