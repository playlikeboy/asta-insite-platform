---
paths:
  - '**/*.ts'
  - '**/*.tsx'
---

# TypeScript

- Strict mode. No `any`, and no `as` casts on external data; parse with Zod.
- Infer types from Zod and Drizzle instead of restating them.
- Create new objects instead of mutating inputs.
- Functions under 50 lines, files under 800, nesting four levels at most.
- No `console.log`. Comment why, not what.
- Validate env at access through the app's env module, never raw `process.env` elsewhere.
- Stay on TypeScript 6.0 until typescript-eslint supports 7 (ADR-014).
