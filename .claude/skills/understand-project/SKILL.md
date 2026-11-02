---
description: Onboard to the Asta Insite codebase before any work. Use at the start of a session or when context about the product, architecture or status is missing.
---

# Understand the Project

Read, in order, and do not skip:

1. `CLAUDE.md`
2. `docs/README.md`
3. `docs/project/OVERVIEW.md`
4. `docs/project/OPEN_DECISIONS.md`
5. `docs/architecture/SYSTEM_OVERVIEW.md`
6. `docs/delivery/PROJECT_STATUS.md`
7. The `CLAUDE.md` in each folder relevant to the task

Then look at reality:

```bash
git status --short && git log --oneline -n 10
pnpm typecheck && pnpm test
```

Report briefly: what exists; what the current milestone is; which open decisions affect the task; any conflict between docs and code. Do not assume a documented feature exists; find it in the code.
