# Asta Engineering Handbook

The long-term memory of the Asta Insite platform (internal codename **Asta One**). Written so a person or agent with no prior context can continue the work.

## Read in this order

1. [Root CLAUDE.md](../CLAUDE.md): working rules
2. [Overview](project/OVERVIEW.md): what the product is
3. [Open decisions](project/OPEN_DECISIONS.md): what the client must still decide
4. [System overview](architecture/SYSTEM_OVERVIEW.md): how it is built
5. [Project status](delivery/PROJECT_STATUS.md): what actually exists today

## Status words

Every document uses these words with these meanings. A feature is never complete just because it is documented.

| Word            | Meaning                                                                         |
| --------------- | ------------------------------------------------------------------------------- |
| **Confirmed**   | Stated in the client proposal                                                   |
| **Proposed**    | Added by the project blueprint or this handbook; the client has not approved it |
| **Implemented** | Exists in code and passes its checks                                            |
| **Planned**     | Designed but not built                                                          |
| **Assumption**  | Treated as true for now; listed in [Assumptions](project/ASSUMPTIONS.md)        |
| **Open**        | Needs a decision; listed in [Open decisions](project/OPEN_DECISIONS.md)         |

## Sources of truth

| Question                                | Document                                                                         |
| --------------------------------------- | -------------------------------------------------------------------------------- |
| What is Asta Insite?                    | [project/OVERVIEW.md](project/OVERVIEW.md)                                       |
| How is it built?                        | [architecture/SYSTEM_OVERVIEW.md](architecture/SYSTEM_OVERVIEW.md)               |
| What is pending with the client?        | [project/OPEN_DECISIONS.md](project/OPEN_DECISIONS.md)                           |
| What is actually built?                 | [delivery/PROJECT_STATUS.md](delivery/PROJECT_STATUS.md)                         |
| Which technical decisions are accepted? | [architecture/ARCHITECTURE_DECISIONS.md](architecture/ARCHITECTURE_DECISIONS.md) |

No approved SRS exists yet. Until the client signs one, [project/PRODUCT_REQUIREMENTS.md](project/PRODUCT_REQUIREMENTS.md) is the working draft. When documents conflict, accepted ADRs and client-confirmed requirements win. Flag the contradiction in Open decisions.

## Map

| Folder                                           | Contents                                                                                          |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| [project/](project/OVERVIEW.md)                  | Overview, business model, requirements, scope, assumptions, decisions, glossary, repository audit |
| [product/](product/FEATURE_CATALOG.md)           | Journeys, the 18 workflows, features, rules, subscriptions, leads, content, notifications         |
| [architecture/](architecture/SYSTEM_OVERVIEW.md) | System design, ADRs, monorepo layout, per-layer architecture, Mermaid diagrams                    |
| [database/](database/ERD.md)                     | ER diagram, schema, relationships, migrations, indexes, retention, seeds                          |
| [api/](api/API_STANDARDS.md)                     | Standards, endpoint references, [OpenAPI spec](api/openapi.yaml)                                  |
| [integrations/](integrations/OVERVIEW.md)        | Appwrite, Razorpay, OTP, email, push, storage, costs                                              |
| [design/](design/DESIGN_SYSTEM.md)               | Design system, tokens, typography, components, screen inventories, accessibility                  |
| [security/](security/SECURITY_OVERVIEW.md)       | Threat model, authorization, API, file and payment security, privacy, incidents                   |
| [engineering/](engineering/DEVELOPMENT_SETUP.md) | Setup, standards, testing, errors, logging, performance, review, git, release                     |
| [operations/](operations/ENVIRONMENTS.md)        | Environments, variables, deployment, backups, monitoring, costs, handover, maintenance            |
| [delivery/](delivery/IMPLEMENTATION_ROADMAP.md)  | Roadmap, milestones, acceptance criteria, release checklist, status                               |
| [technical/](technical/OFFICIAL_REFERENCES.md)   | Verified vendor facts with sources and dates                                                      |
