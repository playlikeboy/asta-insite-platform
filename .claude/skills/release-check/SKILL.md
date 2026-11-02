---
description: Verify release readiness against the checklist. Use when asked to check whether a milestone or release is ready.
disable-model-invocation: true
---

# Release Check

Read `docs/delivery/RELEASE_CHECKLIST.md`, `docs/delivery/ACCEPTANCE_CRITERIA.md` and `docs/delivery/PROJECT_STATUS.md`. Then run, and record actual results:

```bash
git status --short
pnpm install --frozen-lockfile
pnpm format:check && pnpm docs:check
pnpm lint && pnpm typecheck
pnpm test:coverage
pnpm build && pnpm test:e2e
pnpm --filter mobile bundle:check
pnpm audit --prod --audit-level high
pnpm db:generate
```

Run the `security-audit` skill. Review the status of blocking decisions and spikes.

Report per checklist line as **Pass**, **Fail** or **Not checked**, with evidence. Items that need people, devices or accounts are Not checked unless someone confirms them. Conclude Ready or Not ready, with blockers.

Read-only: **never deploy, submit or migrate.** Those require explicit authorization.
