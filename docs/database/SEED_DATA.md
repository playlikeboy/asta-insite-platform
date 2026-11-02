# Seed Data

**Status:** Planned for M2. No seed script exists yet.

## Reference data (all environments)

Idempotent, using `ON CONFLICT (slug) DO UPDATE`.

| Slug                | Name               | Source           |
| ------------------- | ------------------ | ---------------- |
| `architect`         | Architects         | Proposal         |
| `interior-designer` | Interior Designers | Proposal         |
| `civil-contractor`  | Civil Contractors  | Proposal         |
| `painting`          | Painting           | Proposal         |
| `plumbing`          | Plumbing           | Proposal         |
| `home-automation`   | Home Automation    | Proposal         |
| `construction`      | Construction       | Proposal context |

The client confirms the final list and each category's questions. Examples from the proposal: location, timeline, budget and scope for all; home size and style for interior design.

## Development and staging only

Fake customers, providers, requirements and content for manual testing, using obviously fake names and reserved test numbers. A guard must refuse to run when the environment is production.

## Tests

Tests create their own data and do not depend on seeds. Use Appwrite mock phone numbers for OTP tests.

## First admin

Created by an operational script with a super admin's existing Appwrite user ID. Never through the public API. Logged in the audit log.

## Rule

Never copy production data to dev or staging.
