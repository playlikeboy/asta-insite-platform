# Frontend Architecture (Admin Web)

**Status:** Shell Implemented. Everything else Planned for M9.

## Stack

Next.js 16 App Router, React 19, Tailwind v4, shadcn/ui on Radix, Lucide, Manrope through `next/font`. Add TanStack Table, Recharts, React Hook Form and sonner when a screen needs them.

## Rules

- Server Components by default. Add `'use client'` only for interaction.
- `page.tsx` renders. It calls service functions; it never holds SQL or workflows.
- Check authorization on the server in every admin layout, page and route. Hiding a link is not security.
- URL holds table state (filter, sort, cursor), so links are shareable and back works.
- Use Server Actions only for admin form mutations, calling the same services as the API. Mobile always uses Route Handlers.
- TanStack Query only where client-side server state is truly needed, such as live moderation queues.

## Routes (Planned)

```text
(auth)/sign-in, /mfa
(admin)/                overview
(admin)/customers, /providers, /providers/approvals, /categories
(admin)/requirements, /leads, /moderation
(admin)/subscriptions, /payments, /invoices, /analytics
(admin)/notifications, /admins, /settings, /audit-logs
api/health              Implemented
api/v1/**               Planned
api/webhooks/razorpay   Planned
api/internal/jobs/**    Planned
```

The full sidebar order is in [Admin screens](../design/ADMIN_SCREENS.md).

## Rendering and caching

Admin data changes constantly and is private, so routes stay dynamic. `cacheComponents` was removed from the generated config. Do not cache anything keyed by user without a review.

## Deployment note

Appwrite's guide recommends `output: 'standalone'` to reduce cold starts. It is not enabled yet because spike S-01 must prove it works with this pnpm workspace.
