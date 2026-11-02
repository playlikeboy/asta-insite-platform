---
description: Implement a feature or fix on the Asta Insite platform, from requirement to verified change. Use for any code task larger than a trivial edit.
---

# Implement a Feature

## Before

1. Find the requirement ID, workflow in `docs/product/USER_FLOWS.md` and milestone in `docs/delivery/IMPLEMENTATION_ROADMAP.md`.
2. Check `docs/project/OPEN_DECISIONS.md`. If a blocking decision is open, stop and ask. If proceeding on a default, record the default.
3. Read the code it touches, and list callers, tests and configuration affected.
4. Prefer what exists: this codebase, then the platform, then installed packages. A new dependency needs a reason.
5. New architecture needs an ADR first. Write a short plan.

## During

1. Write a failing test. Include failure and authorization cases.
2. Implement in order: contract, schema (`database-migration` skill), repository, service, route, UI.
3. Keep rules in services. Handle loading, empty, error and offline states.

## After

```bash
pnpm format:check && pnpm lint && pnpm typecheck
pnpm test:coverage
pnpm build && pnpm test:e2e
pnpm --filter mobile bundle:check
pnpm docs:check
```

Use the app on a device or browser when the change has UI. Read `git diff`. Run the `security-audit` skill if the change touches auth, input, files, payments or personal data. Then run `update-project-context`. Commit with a conventional message.

Report what was and wasn't verified. Paste no secrets.
