# Privacy

Not legal advice. **A lawyer must review this before launch.** India's Digital Personal Data Protection Act 2023 and Rules 2025 apply. Obligations reportedly phase in by around May 2027; secondary sources differ on dates, so confirm them.

## Data collected

| Data                               | Purpose                | Stored in                                | Visible to                                                                      |
| ---------------------------------- | ---------------------- | ---------------------------------------- | ------------------------------------------------------------------------------- |
| Phone, optional email              | Sign-in, receipts      | Appwrite                                 | User; admins as needed                                                          |
| Name, city                         | Profile                | PostgreSQL                               | User; connected party                                                           |
| Requirement details, exact address | Getting quotes         | PostgreSQL                               | Owner; summary to lead-access providers; address only after connection per D-08 |
| Chat and attachments               | Communication          | PostgreSQL, Storage                      | Members                                                                         |
| Provider business data, portfolio  | Public listing         | PostgreSQL, Storage                      | Public to signed-in users                                                       |
| Verification documents             | Approval               | Private Storage                          | Owner, Operations admins                                                        |
| Payment records                    | Billing and tax        | PostgreSQL; card and UPI data at gateway | Owner, Finance admins                                                           |
| Device push token                  | Notifications          | Appwrite                                 | System                                                                          |
| Usage logs, profile views          | Reliability, analytics | Logs, PostgreSQL                         | Admins; provider sees totals only                                               |

## Commitments

- **Notice and consent:** clear notice at sign-up; separate opt-in for marketing.
- **Rights:** access, correction and erasure through settings and a support channel.
- **Minimization:** no contacts access, no location tracking, no ad identifiers planned. Exact address is optional.
- **Children:** the product is for adults. Age position needs legal input.
- **Security and breach notice:** see [Incident response](INCIDENT_RESPONSE.md).
- **Grievance contact:** the client must name one.
- **Retention:** [Data retention](../database/DATA_RETENTION.md), pending D-20.

## Data location

Hosted in Singapore. Cross-border transfers appear permitted unless the government restricts a country, per secondary sources. **D-07** decides whether this is acceptable. Sub-processors: Appwrite, Razorpay, Google (FCM), Apple (APNs), Resend, and MSG91 if used.

## App stores

- **Account deletion in the app** is required by Apple guideline 5.1.1(v). Planned: [Data retention](../database/DATA_RETENTION.md#account-deletion-steps).
- Apple privacy nutrition labels and Google Data safety forms must match this table.
- A public privacy policy URL is required. The client provides the legal text.

## Actions for the client

Appoint a contact; get the policy and terms drafted; decide D-07 and D-20; decide how chat is handled on reports.
