---
paths:
  - 'apps/**'
  - 'packages/**'
---

# Architecture

- Follow [the ADRs](../../docs/architecture/ARCHITECTURE_DECISIONS.md). A new pattern, vendor, package or infrastructure piece needs an accepted ADR first.
- Dependencies point one way: apps use packages; packages never import apps. `contracts` imports only `zod`. `design-tokens` imports nothing.
- Modular monolith. No microservices or queues beyond the outbox.
- Create a package only when a second consumer exists. `packages/domain` starts at M2 when a rule needs sharing. No `ui`, `validation` or `appwrite` packages.
- Mobile never reaches PostgreSQL. Chat is stored in PostgreSQL; TablesDB carries only signals.
- Vendor SDKs stay in integration modules.
