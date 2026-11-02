# Backend Architecture

**Status:** `/api/health` Implemented. Everything else Planned.

## Request path

```text
Route Handler -> authenticate -> validate with Zod -> service -> repository -> PostgreSQL
                                                         \-> outbox (same transaction)
```

A route handler has one job per step and stays short:

```ts
export const POST = withAuth(async (request, actor) => {
  const input = createRequirementBody.parse(await request.json());
  const requirement = await requirements.create(actor, input);
  return created(requirement);
});
```

This example shows intent; `withAuth` and `created` arrive in M2.

## Modules (`packages/domain`, from M2)

| Module        | Owns                                                  |
| ------------- | ----------------------------------------------------- |
| identity      | Users, profiles, roles, account deletion              |
| providers     | Provider profile, categories, service areas, approval |
| requirements  | Requirements, dynamic questions, answers              |
| leads         | Matching, interests, shortlists, connections          |
| content       | Portfolios, posts, media, saved content, moderation   |
| messaging     | Conversations, messages, signals                      |
| billing       | Plans, subscriptions, payments, invoices, refunds     |
| notifications | In-app notifications, push and email dispatch         |
| admin         | Audit logs, analytics                                 |

Modules call each other's public functions, never each other's tables.

## Service rules

- First argument is the `actor`, resolved by the server.
- Check permission inside the service, so web and mobile cannot diverge.
- Use one transaction for writes that must succeed together.
- Throw typed domain errors; a single handler maps them to API error codes.
- No framework imports. Services must be testable without Next.js.

## Background work

Scheduled Functions call `POST /api/internal/jobs/<name>` with a secret header.

| Job                    | Schedule     | Work                                            |
| ---------------------- | ------------ | ----------------------------------------------- |
| process-outbox         | Every minute | Send push, email and signals                    |
| expire-subscriptions   | Hourly       | Move lapsed subscriptions; stop lead access     |
| reconcile-payments     | Daily        | Compare gateway records with `payments`         |
| clean-orphan-media     | Daily        | Remove unregistered uploads older than 24 hours |
| purge-deleted-accounts | Daily        | Finish account deletion after the grace period  |
| prune-rate-limits      | Hourly       | Delete expired counters                         |

Every job is idempotent and safe to run twice, because a schedule can overlap or retry.

## Webhooks

`POST /api/webhooks/razorpay` reads the **raw** body, verifies the signature with a constant-time compare, records `x-razorpay-event-id` in `payment_events` (unique), and returns 200 for duplicates. See [Payment security](../security/PAYMENT_SECURITY.md).

## Concurrency hot spots

| Case                 | Protection                                                       |
| -------------------- | ---------------------------------------------------------------- |
| Double Show Interest | Unique `(requirement_id, provider_id)`                           |
| Double accept        | Unique `connections(interest_id)`, one transaction               |
| Duplicate webhook    | Unique event ID                                                  |
| Duplicate checkout   | Idempotency key plus partial unique index on active subscription |
| Two job runners      | `FOR UPDATE SKIP LOCKED`                                         |
| Review twice         | Unique `reviews(connection_id)`                                  |
