---
paths:
  - 'docs/**'
  - '**/CLAUDE.md'
  - 'README.md'
---

# Documentation

- Use the status words in [docs/README](../../docs/README.md). Never present plans as facts.
- No placeholder files. Name what is unresolved and who decides.
- Cite vendor facts in [Official references](../../docs/technical/OFFICIAL_REFERENCES.md) with a date.
- Link to the owning document instead of copying. Keep IDs stable (D-, A-, S-, BR-, ADR-, C-, P-).
- Run `pnpm docs:check` before committing.
