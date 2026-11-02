---
description: Bring documentation in line with a completed change. Use at the end of each task or milestone, before committing.
---

# Update Project Context

Review `git diff` and update only what changed:

| Change                 | Update                                                        |
| ---------------------- | ------------------------------------------------------------- |
| Anything verified      | `docs/delivery/PROJECT_STATUS.md`, with real results and date |
| Milestone progress     | `docs/delivery/IMPLEMENTATION_ROADMAP.md`, `MILESTONES.md`    |
| Endpoint               | `docs/api/*`, `openapi.yaml` including `x-status`             |
| Schema                 | `docs/database/*`                                             |
| Screen                 | `docs/design/MOBILE_SCREENS.md` or `ADMIN_SCREENS.md`         |
| Architecture choice    | New ADR, then `docs/architecture/*`                           |
| Environment variable   | `docs/operations/ENVIRONMENT_VARIABLES.md`, templates         |
| Vendor fact            | `docs/technical/OFFICIAL_REFERENCES.md`, with date            |
| Decision made or found | `docs/project/OPEN_DECISIONS.md` or `ASSUMPTIONS.md`          |
| Command or rule        | The relevant `CLAUDE.md` or `.claude/rules/`                  |

Check that a planned item newly built now reads Implemented, and that nothing unbuilt does. Look for contradictions and flag them.

```bash
pnpm exec prettier --write docs
pnpm docs:check
```
