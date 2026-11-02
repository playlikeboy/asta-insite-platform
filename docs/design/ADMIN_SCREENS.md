# Admin Screens

**Status:** Shell, sidebar and Overview placeholder Implemented in `apps/web/src/app/(admin)` and `src/components/admin-nav.ts`. Pages Planned for M9 and M10. Desktop-first, responsive for tablets. Information-dense, in contrast to the mobile app. Not indexed by search engines.

## Navigation

| Sidebar            | Route                 | Purpose                                     | Role        | Milestone |
| ------------------ | --------------------- | ------------------------------------------- | ----------- | --------- |
| Overview           | `/`                   | Totals, queues, activity                    | All         | M9        |
| Customers          | `/customers`          | Search, view, suspend                       | Operations  | M9        |
| Service Providers  | `/providers`          | Search, view, deactivate                    | Operations  | M9        |
| Provider Approvals | `/provider-approvals` | Review queue                                | Operations  | M9        |
| Service Categories | `/categories`         | Categories, question versions               | Operations  | M9        |
| Requirements       | `/requirements`       | Monitor                                     | Operations  | M9        |
| Leads              | `/leads`              | Interest and connection activity            | Operations  | M9        |
| Content Moderation | `/moderation`         | Reports, remove, restore, featured, banners | Moderator   | M9        |
| Subscriptions      | `/subscriptions`      | Plans, provider status                      | Finance     | M10       |
| Payments           | `/payments`           | Payments, refunds                           | Finance     | M10       |
| Invoices           | `/invoices`           | Search, download                            | Finance     | M10       |
| Analytics          | `/analytics`          | Top categories, active users                | Operations  | M9        |
| Notifications      | `/notifications`      | Campaigns                                   | Operations  | M9        |
| Admin Users        | `/admins`             | Accounts, roles                             | Super admin | M9        |
| Settings           | `/settings`           | Platform settings                           | Super admin | M9        |
| Audit Logs         | `/audit-logs`         | Read-only history                           | Super admin | M9        |

Hide items the role cannot use. The server still enforces every rule.

## Page patterns

| Pattern            | Rule                                                                                     |
| ------------------ | ---------------------------------------------------------------------------------------- |
| List               | Filters in the URL, sortable table, cursor pagination, CSV export where finance needs it |
| Detail             | Header with status and actions, tabs, audit history                                      |
| Destructive action | Dialog with consequence; reason required; logged                                         |
| Approval queue     | Oldest first; next item after a decision                                                 |

## Responsive

| Width       | Layout                                          |
| ----------- | ----------------------------------------------- |
| 1280+       | Full sidebar and table                          |
| 768 to 1279 | Collapsible sidebar; hide lower-value columns   |
| Under 768   | Sheet menu; usable for checks, not primary work |

## Sign-in

Email and password with mandatory MFA. No self-registration. Inactivity logout. Failed attempts rate-limited.
