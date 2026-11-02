# Glossary

| Term                    | Meaning                                                                                            |
| ----------------------- | -------------------------------------------------------------------------------------------------- |
| **Asta One**            | Internal codename for the platform powering Asta Insite                                            |
| **Customer**            | Person posting requirements. Also "homeowner" in the proposal                                      |
| **Provider**            | Professional or company offering services. Also "service provider" or "professional"               |
| **Requirement**         | A customer's posted service need, with category, location, budget, timeline and answers            |
| **Lead**                | A requirement as seen by a matching provider. Not a separate table                                 |
| **Interest**            | A provider's Show Interest action on a requirement (`provider_interests`)                          |
| **Connection**          | Mutual interest: the customer accepted a provider's interest. Unlocks chat                         |
| **Shortlist**           | A customer's private list of providers for a requirement. Grants no access                         |
| **Conversation**        | A chat thread created for a connection                                                             |
| **Signal**              | A contentless TablesDB row update telling an app to refetch. Holds no message data                 |
| **Portfolio**           | A provider's collection of past projects                                                           |
| **Content post**        | A blog, status update or video shown in discovery                                                  |
| **Plan / Subscription** | A sellable offer / one provider's purchase of it                                                   |
| **Billing provider**    | The system charging a subscription: Razorpay, Apple or Google                                      |
| **Outbox**              | PostgreSQL table of side effects committed with business data, processed by a job                  |
| **Pooled URL**          | PostgreSQL connection through the pooler on port 6432, used at runtime                             |
| **Direct URL**          | PostgreSQL connection on port 5432, used for migrations                                            |
| **Appwrite Sites**      | Appwrite's web hosting, used for Next.js                                                           |
| **Appwrite Functions**  | Appwrite's serverless functions, used for scheduled jobs                                           |
| **TablesDB**            | Appwrite's own database product with row permissions and Realtime. Separate from Native PostgreSQL |
| **Native PostgreSQL**   | Appwrite's hosted, standard PostgreSQL. No Appwrite permissions or Realtime                        |
| **DLT**                 | Distributed Ledger Technology registration required by Indian telecom rules for commercial SMS     |
| **DPDP Act**            | India's Digital Personal Data Protection Act, 2023                                                 |
| **EAS**                 | Expo Application Services, for mobile builds and store submission                                  |
| **ADR**                 | Architecture Decision Record                                                                       |
| **SRS**                 | Software Requirements Specification. None is approved yet                                          |

## Sources

| Term      | Meaning                                                                                                                                                                                                                                                    |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Proposal  | The client's revised proposal PDF. Kept outside the repository, because the repository is public                                                                                                                                                           |
| Blueprint | The developer's planning document (`PRD.md`). Deleted on 2026-11-02 after its content was carried into this handbook. It is no longer an authority; where this handbook says "from the blueprint", the statement is Proposed unless the client confirms it |
