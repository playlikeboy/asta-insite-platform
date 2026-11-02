# Deployment

**Status: Nothing is deployed.** No production system may be configured without client credentials and explicit authorization. These are the intended steps; S-01 must prove step 5. Design: [Deployment architecture](../architecture/DEPLOYMENT_ARCHITECTURE.md).

## First-time

1. **GitHub.** Push the monorepo to `asta-insite-platform`. Confirm CI passes.
2. **Appwrite organization.** Client-owned. Create dev, staging, production projects in Singapore.
3. **PostgreSQL.** Create databases. Run `pnpm db:migrate` with `DIRECT_URL`, on dev first.
4. **Appwrite.** Auth methods, buckets, `user_signals` table, messaging providers, functions. See [Appwrite](../integrations/APPWRITE.md).
5. **Next.js.** Connect GitHub to Appwrite Sites. Root `apps/web`. Set variables. Deploy. Verify `/api/health`.
6. **Mobile.** Set identifiers; add `eas.json`; configure Appwrite platforms; build with EAS.
7. **External services.** Razorpay, SMS, email, push.
8. **Test and release.** Full customer-to-provider flow, payments, security, notifications, store submissions.

## Sites settings (to verify in S-01)

| Setting  | Proposed value                                           |
| -------- | -------------------------------------------------------- |
| Install  | `corepack enable && pnpm install --frozen-lockfile`      |
| Build    | `pnpm turbo run build --filter=web`                      |
| Output   | `apps/web/.next`, or standalone if required              |
| Node     | 22, subject to what Sites offers                         |
| Branches | `main` to staging at first; production promoted manually |

## Routine

See [Release process](../engineering/RELEASE_PROCESS.md).

## Functions

Scheduled Functions are thin: each calls `POST /api/internal/jobs/<name>` with the secret. Node runtime `node-22`. Schedules:

| Job                      | Schedule (proposed) |
| ------------------------ | ------------------- |
| `process-outbox`         | Every minute        |
| `expire-subscriptions`   | Hourly              |
| `reconcile-payments`     | Hourly              |
| `clean-orphan-media`     | Daily               |
| `purge-deleted-accounts` | Daily               |
| `prune-rate-limits`      | Hourly              |

## Rollback

Redeploy the previous Sites deployment. Migrations are forward-only and must stay compatible with the previous version. Mobile cannot be rolled back; ship a fix, and use a phased rollout to limit exposure.

## If Sites fails S-01 or S-02

Next.js is portable. Host `apps/web` elsewhere, keep the rest on Appwrite, and record an ADR.
