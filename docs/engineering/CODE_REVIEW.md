# Code Review

The project assumes one developer (A-02), so review means a self-review against this list or a review agent, plus CI. If a second developer joins, require one approval on PRs.

## Order of concern

1. **Correct:** does it meet the acceptance criteria? Are edge cases handled?
2. **Secure:** authorization, validation, secrets. See below.
3. **Tested:** do tests prove the behavior, including failures?
4. **Consistent:** do docs and code agree?
5. **Simple:** could it be smaller? Is every dependency needed?

## Checklist

- [ ] Authorization is in the service, with a test for another user's record
- [ ] Input validated by a shared schema
- [ ] No secrets, real personal data or client documents
- [ ] Errors reveal nothing internal
- [ ] Migration reviewed; expand-then-contract if breaking
- [ ] No N+1 query; list endpoints paginate
- [ ] Mobile screen has loading, empty, error and offline states
- [ ] Accessibility: labels, targets, contrast
- [ ] No `console.log`, commented-out code or unused exports
- [ ] [API docs](../api/API_REFERENCE.md), OpenAPI and [Project status](../delivery/PROJECT_STATUS.md) updated
- [ ] New architecture has an ADR

## Severity

| Level          | Rule                       |
| -------------- | -------------------------- |
| Critical, High | Must fix before merge      |
| Medium         | Fix, or record a follow-up |
| Low            | Optional                   |

Claude agents: `security-reviewer`, `qa-engineer` in `.claude/agents/`.
