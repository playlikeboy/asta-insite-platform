# Authorization

**Status:** Planned for M2. Roles are derived from database rows and never accepted from a client. Details: [Auth architecture](../architecture/AUTH_ARCHITECTURE.md).

## Roles

| Role        | Source                                                          |
| ----------- | --------------------------------------------------------------- |
| Customer    | `customer_profiles` row exists                                  |
| Provider    | `provider_profiles` row exists                                  |
| Lead access | Active account, `approved`, subscription active by date (BR-13) |
| Admin       | `admin_users` row, with a sub-role                              |

## Permission matrix

O = own records only. P = party to the record. Yes = any. Blank = denied.

| Action                         | Customer | Provider | Lead access | Operations | Finance | Moderator | Super admin |
| ------------------------------ | -------- | -------- | ----------- | ---------- | ------- | --------- | ----------- |
| Create requirement             | Yes      |          |             |            |         |           |             |
| Read full requirement          | O        |          |             | Yes        |         |           | Yes         |
| Read lead summary              |          |          | Yes         | Yes        |         |           | Yes         |
| Show Interest                  |          |          | Yes         |            |         |           |             |
| Accept interest                | O        |          |             |            |         |           |             |
| Read chat                      | P        | P        | P           |            |         |           |             |
| Create portfolio or post       |          | Approved | Approved    |            |         |           |             |
| Remove content                 | O        | O        | O           |            |         | Yes       | Yes         |
| Read verification documents    |          | O        | O           | Yes        |         |           | Yes         |
| Approve provider               |          |          |             | Yes        |         |           | Yes         |
| Suspend user                   |          |          |             | Yes        |         | Yes       | Yes         |
| Read payments                  |          | O        | O           |            | Yes     |           | Yes         |
| Refund                         |          |          |             |            | Yes     |           | Yes         |
| Manage plans                   |          |          |             |            | Yes     |           | Yes         |
| Manage categories, banners     |          |          |             | Yes        |         |           | Yes         |
| Read audit logs, manage admins |          |          |             |            |         |           | Yes         |

Admins do not read chat by default. Investigating a reported conversation needs a decision under D-15 and a logged reason.

## Enforcement

1. Route handler: authenticate, validate.
2. Service: role and ownership. **This is the rule's single home.**
3. Repository: queries filter by owner, so the wrong row is not found.

Conceal existence: another user's private record returns 404.

## Tests

For every protected endpoint, test: anonymous 401, wrong role 403, another user's record 404, correct user success, suspended user denied.

## Appwrite permissions

Appwrite's permission system does not apply to Native PostgreSQL. It applies only to Storage, TablesDB and Realtime. Set these per [File security](FILE_SECURITY.md) and [Realtime](../architecture/REALTIME_ARCHITECTURE.md).
