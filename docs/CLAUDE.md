# docs

The Asta Engineering Handbook. Index: [README](README.md).

- Each file is substantive, or names what is unresolved and who decides. No empty placeholders.
- Use the status words in the README. Never describe planned work as done. [Project status](delivery/PROJECT_STATUS.md) alone says what exists.
- Vendor facts need a source and date in [Official references](technical/OFFICIAL_REFERENCES.md). Unverified means say so.
- Open items go in [Open decisions](project/OPEN_DECISIONS.md) or [Assumptions](project/ASSUMPTIONS.md). Accepted technical choices go in [ADRs](architecture/ARCHITECTURE_DECISIONS.md).
- Update, don't duplicate. Link to the owning document.
- Run `pnpm docs:check` and `pnpm exec prettier --write docs`. Lint the API spec: `pnpm dlx --package=@redocly/cli redocly lint docs/api/openapi.yaml`.
