# Incident Response

**Status:** Runbook ready. Contacts are unassigned until [handover](../operations/HANDOVER.md).

## Severity

| Level | Example                                                             | Respond within |
| ----- | ------------------------------------------------------------------- | -------------- |
| SEV-1 | Data breach, leaked secret in use, production down                  | 1 hour         |
| SEV-2 | Payments failing, sign-in failing, private data exposed to one user | 4 hours        |
| SEV-3 | One feature down, workaround exists                                 | 1 business day |
| SEV-4 | Minor defect                                                        | Next release   |

## Steps

1. **Detect and record.** Open a private incident note: time, who, what is seen. Use UTC and IST.
2. **Contain.** Rotate the secret, suspend the account, disable the feature, block the route. Preserve logs before changing anything that could erase them.
3. **Assess.** What data, whose, since when? Use audit logs, access logs and vendor logs.
4. **Fix** the root cause, with a regression test.
5. **Recover.** Restore data if needed ([Backup and restore](../operations/BACKUP_AND_RESTORE.md)). Verify with `/api/health` and the critical flows.
6. **Notify.** The client decides, with legal advice, on notifying affected people and the Data Protection Board under DPDP. Secondary sources disagree on timelines, so confirm them before launch. CERT-In reporting duties may also apply; confirm with counsel.
7. **Review** within 5 business days: timeline, cause, what changes. No blame.

## Secret exposure

| Secret                       | Action                                                                                           |
| ---------------------------- | ------------------------------------------------------------------------------------------------ |
| Appwrite API key             | Revoke and create a new key; update environments; redeploy; review logs                          |
| `DATABASE_URL`, `DIRECT_URL` | Change the password; update environments; check connections                                      |
| `RAZORPAY_KEY_SECRET`        | Regenerate; update; check dashboard activity                                                     |
| `RAZORPAY_WEBHOOK_SECRET`    | Rotate; accept the old secret for retries during changeover                                      |
| `INTERNAL_JOB_SECRET`        | Rotate in Sites and Functions together                                                           |
| Committed to Git             | Rotate **first**. Removing from history does not make it safe, especially in a public repository |

## Common scenarios

| Scenario                 | First move                                                             |
| ------------------------ | ---------------------------------------------------------------------- |
| Compromised admin        | Remove `admin_users` row, revoke sessions, read that admin's audit log |
| Forged webhooks          | Confirm signature check; rotate secret; reconcile with gateway         |
| SMS bill spike           | Tighten limits; disable phone sign-up briefly                          |
| Illegal content reported | Remove at once; preserve evidence; get legal advice                    |
| Bad migration            | Stop deploys; assess; forward-fix or restore                           |

## Contacts

| Role                              | Person                                                   |
| --------------------------------- | -------------------------------------------------------- |
| Technical lead                    | Developer during the project; to be named after handover |
| Business and legal decision-maker | Client to name                                           |
| Grievance officer                 | Client to name                                           |
| Vendor support                    | Appwrite, Razorpay consoles                              |
