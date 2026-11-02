# Backup and Restore

**Status:** Planned. No hosted database exists, and **no restore has been tested**. A backup that has never been restored is only a hope.

## What is backed up

| Data                    | Mechanism                                    | Retention                                               |
| ----------------------- | -------------------------------------------- | ------------------------------------------------------- |
| PostgreSQL              | Appwrite backups, plus PITR                  | 7 days on Pro; PITR window 1 to 35 days (adds 20% cost) |
| Extra safety            | `pg_dump` to separate, encrypted storage     | Proposed: weekly, 4 copies; client decides              |
| Storage files           | **Not stated in docs read**; confirm in S-08 | Unknown                                                 |
| Appwrite users          | Project-level; **confirm export options**    | Unknown                                                 |
| TablesDB `user_signals` | None; disposable                             |                                                         |
| Code, migrations        | Git                                          |                                                         |
| Secrets                 | Password manager, not backups                |                                                         |

Recommendation: enable PITR on production at launch. Recovery targets below assume this.

## Proposed targets

| Target               | Value              |
| -------------------- | ------------------ |
| Recovery point (RPO) | Minutes, with PITR |
| Recovery time (RTO)  | 4 hours            |

The client must accept these.

## Restore procedure

1. Declare an incident, and stop deploys and jobs.
2. Choose the point in time, before the damage.
3. Restore to a **new** database. Don't overwrite the original; it is evidence.
4. Verify: row counts, recent records, `/api/health` against a staging app.
5. Point production `DATABASE_URL` and `DIRECT_URL` to it. Redeploy.
6. Re-run reconciliation for payments since the restore point. Razorpay holds the truth.
7. Rebuild `user_signals` lazily.
8. Record what was lost and notify if required.

## Restore test

Before launch (M11), then quarterly: restore to a temporary database and verify. Log the date and duration here.

| Date           | Result | Duration |
| -------------- | ------ | -------- |
| Not yet tested |        |          |

## Limits

Deleted user data remains in backups until they expire. State this in the privacy policy.
