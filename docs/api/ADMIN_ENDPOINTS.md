# Admin Endpoints

Status: Planned for M4 (provider approvals), M9 and M10. Session cookie, completed MFA, a row in `admin_users`, and the role listed. Admin pages may call services directly; these routes are for client interactions and exports. Every write adds an audit log row.

| Method                   | Path                                                                | Role        | Purpose                              |
| ------------------------ | ------------------------------------------------------------------- | ----------- | ------------------------------------ |
| GET                      | `/api/v1/admin/users`                                               | All         | Search customers and providers       |
| POST                     | `/api/v1/admin/users/:id/suspend`                                   | operations  | Requires reason                      |
| POST                     | `/api/v1/admin/users/:id/restore`                                   | operations  |                                      |
| GET                      | `/api/v1/admin/provider-approvals`                                  | operations  | Queue                                |
| POST                     | `/api/v1/admin/providers/:id/approve`                               | operations  |                                      |
| POST                     | `/api/v1/admin/providers/:id/reject`                                | operations  | Requires reason                      |
| POST                     | `/api/v1/admin/providers/:id/deactivate`                            | operations  | Requires reason                      |
| GET, POST                | `/api/v1/admin/service-categories`                                  | operations  |                                      |
| PATCH                    | `/api/v1/admin/service-categories/:id`                              | operations  |                                      |
| POST                     | `/api/v1/admin/service-categories/:id/questions/publish`            | operations  | New version                          |
| GET                      | `/api/v1/admin/requirements`, `/admin/leads`                        | operations  | Monitor                              |
| GET                      | `/api/v1/admin/moderation/reports`                                  | moderator   | Queue                                |
| POST                     | `/api/v1/admin/moderation/posts/:id/remove`                         | moderator   | Requires reason                      |
| POST                     | `/api/v1/admin/moderation/posts/:id/restore`                        | moderator   |                                      |
| GET, POST, PATCH         | `/api/v1/admin/subscription-plans`                                  | finance     | New row for changed terms            |
| GET                      | `/api/v1/admin/subscriptions`, `/admin/payments`, `/admin/invoices` | finance     |                                      |
| POST                     | `/api/v1/admin/payments/:id/refund`                                 | finance     | `Idempotency-Key`, reason            |
| GET, POST, PATCH         | `/api/v1/admin/banners`                                             | operations  |                                      |
| GET, POST                | `/api/v1/admin/notification-campaigns`                              | operations  | Preview, then send                   |
| GET                      | `/api/v1/admin/analytics/summary`                                   | operations  | Totals, top categories, active users |
| GET, POST, PATCH, DELETE | `/api/v1/admin/admins`                                              | super_admin | Cannot remove the last super admin   |
| GET                      | `/api/v1/admin/audit-logs`                                          | super_admin | Read only                            |

`super_admin` may do everything. Role checks live in services, not in the UI.
