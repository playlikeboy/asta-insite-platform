# Coding Standards

Prettier and ESLint enforce formatting. These rules cover what tools do not.

## TypeScript

- `strict` on, from `packages/config/tsconfig.base.json`. No `any`; use `unknown` and parse it. No non-null `!` without a reason.
- Infer types from Zod schemas and Drizzle tables rather than repeating them.
- Named exports, except where Next.js and Expo Router require a default.

## Structure

- Files 200 to 400 lines; 800 maximum. Functions under 50 lines. Nesting four levels at most.
- Organize by feature: `server/requirements/{routes,service,repository,schemas}`.
- Dependency direction: routes, then services, then repositories. Never backward.
- Shared code moves to a package only when a second consumer exists ([ADR-016](../architecture/ARCHITECTURE_DECISIONS.md#adr-016-packages-created-only-when-used)).

## Immutability

Create new objects; do not mutate inputs. The exception is local accumulators inside a function, where a mutable approach is clearer.

## Errors

Throw typed domain errors. Routes convert them to the envelope. See [Error handling](ERROR_HANDLING.md).

## Comments

Explain why, not what. A known limit uses `shortcut: <the limit>, <when to upgrade>`. Don't commit commented-out code.

## Naming

| Thing                | Style                                                                |
| -------------------- | -------------------------------------------------------------------- |
| Files                | `kebab-case.ts`; Expo and Next route names as the framework requires |
| Components           | `PascalCase`                                                         |
| Functions, variables | `camelCase`, with verbs for functions                                |
| Constants            | `UPPER_SNAKE_CASE` for true constants                                |
| DB tables, columns   | `snake_case`, plural tables                                          |
| Money fields         | `...Paise`                                                           |
| Dates                | `...At`, `...On`                                                     |

## React

- Server data lives in TanStack Query on mobile; never copy it to local state.
- Server Components by default on web; `'use client'` only where needed.
- Avoid `useEffect` for derived data.
- Build from HeroUI Native or shadcn before writing a primitive.

## Forbidden

`console.log` in source (use the logger); hardcoded secrets or URLs; raw hex colors in components; string-built SQL; business rules in UI or route handlers; direct PostgreSQL access from mobile; vendor SDK imports outside integration modules; a new dependency without a reason in the commit message.

More rules for agents: `.claude/rules/`.
