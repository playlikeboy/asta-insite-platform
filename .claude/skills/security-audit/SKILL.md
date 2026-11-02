---
description: Audit the codebase or a change for security problems. Use before commits touching auth, input, files, payments or personal data, and before releases.
---

# Security Audit

Scope is the diff, or the whole repository before a release. Delegate to the `security-reviewer` agent when asked to use agents.

## Check

1. **Secrets.** Search tracked files by pattern, and report only the file and line, never the value:

   ```bash
   git grep -nEl "(api[_-]?key|secret|password|token)[\"' ]*[:=][\"' ]*[A-Za-z0-9_\-]{16,}"
   git ls-files | grep -E '(^|/)\.env($|\.)' | grep -v example
   git grep -n "EXPO_PUBLIC_" -- ':!docs' ':!*.example'
   ```

2. **Authorization.** Each route authenticates; each service checks role and ownership; tests cover another user's record. Compare to `docs/security/AUTHORIZATION.md`.
3. **Input.** A schema validates all input. No client-set `approvalStatus`, amounts or roles.
4. **Injection and XSS.** SQL parameterized; no raw HTML.
5. **Files.** Rules in `docs/security/FILE_SECURITY.md`.
6. **Payments.** Rules in `docs/security/PAYMENT_SECURITY.md`.
7. **Logs and errors.** Nothing sensitive, per `docs/engineering/LOGGING.md`.
8. **Dependencies.** `pnpm audit --prod --audit-level high`.
9. **Threat model.** Update `docs/security/THREAT_MODEL.md` for new flows.

## Report

Rank by severity. For each: file, line, concrete failure scenario, fix. State what wasn't checked. For an exposed secret, stop and follow `docs/security/INCIDENT_RESPONSE.md`: rotate first.
