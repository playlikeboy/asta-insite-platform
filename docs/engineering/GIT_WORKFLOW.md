# Git Workflow

Repository: `playlikeboy/asta-insite-platform`. Default branch: `main`. Currently **public** (D-17).

## Current practice

Work happens on `main` while the foundation is laid, with small commits. Once production exists, use short-lived branches and pull requests with CI passing, and protect `main`.

## Commits

Conventional format: `<type>: <description>`, with types `feat`, `fix`, `refactor`, `docs`, `test`, `chore`, `perf`, `ci`. Imperative mood, one logical change, explain the why in the body.

## Before a commit

```bash
pnpm format:check && pnpm lint && pnpm typecheck && pnpm test
git diff --staged    # Read it. Look for secrets.
```

## Never

- Force-push `main`, or reset or discard others' work.
- Commit `.env` files, keys, client PDFs or real user data.
- Skip hooks or CI to get past a failure.
- Bundle unrelated changes.

## If a secret is committed

Rotate it first. See [Incident response](../security/INCIDENT_RESPONSE.md#secret-exposure). History rewriting needs explicit authorization and does not undo exposure.

## Releases

Tag `web-vX.Y.Z` and `mobile-vX.Y.Z`. See [Release process](RELEASE_PROCESS.md).

## Known limitation

The active GitHub account on the development machine lacks push permission, so `git push` returns 403. Commits are safe locally until an account with write access pushes them. Check `gh auth status`.
