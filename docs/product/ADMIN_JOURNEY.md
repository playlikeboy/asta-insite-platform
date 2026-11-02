# Admin Journey

Status: Shell Implemented; tools Planned for M9. Screens: [Admin screens](../design/ADMIN_SCREENS.md).

| Daily task               | Goal                         | Screen                            | Safeguard                                         |
| ------------------------ | ---------------------------- | --------------------------------- | ------------------------------------------------- |
| Review providers         | Clear the approval queue     | Provider Approvals                | Reason required on rejection; audit log           |
| Moderate content         | Remove what breaks rules     | Content Moderation                | Reason recorded; provider notified                |
| Handle a problem account | Suspend or restore           | Customers, Service Providers      | Confirmation; audit log; immediate effect         |
| Check money              | Reconcile                    | Payments, Subscriptions, Invoices | Read-only by default; refunds need `finance` role |
| Watch the marketplace    | Spot unanswered requirements | Overview, Requirements, Leads     |                                                   |
| Maintain catalog         | Categories and questions     | Service Categories                | Editing questions creates a new version           |
| Communicate              | Announcements                | Notifications                     | Preview and confirmation before a mass send       |
| Manage team              | Least privilege              | Admin Users                       | `super_admin` only                                |
| Investigate              | Who did what                 | Audit Logs                        | Cannot be edited                                  |

## Admin roles (Proposed)

| Capability                         | super_admin | operations  | finance     | moderator   |
| ---------------------------------- | ----------- | ----------- | ----------- | ----------- |
| View users                         | Yes         | Yes         | Limited     | Limited     |
| Approve providers, suspend users   | Yes         | Yes         | No          | No          |
| Moderate content                   | Yes         | Yes         | No          | Yes         |
| Categories, banners, notifications | Yes         | Yes         | No          | No          |
| Plans, refunds, invoices           | Yes         | No          | Yes         | No          |
| Admin users, settings              | Yes         | No          | No          | No          |
| Audit logs                         | Yes         | Own actions | Own actions | Own actions |
