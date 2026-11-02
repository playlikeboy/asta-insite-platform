# Environments

**Status:** Only local development exists. No Appwrite project has been configured by this code. The user created `.env` values for a project, but they have not been tested against it.

| Environment | Appwrite project           | Database             | Purpose                    | Data |
| ----------- | -------------------------- | -------------------- | -------------------------- | ---- |
| Local       | `asta-insite-dev`, or none | Local PostgreSQL     | Development                | Fake |
| Development | `asta-insite-dev`          | Hosted, small        | Integration with Appwrite  | Fake |
| Staging     | `asta-insite-staging`      | Hosted               | Pre-release, client review | Fake |
| Production  | `asta-insite-prod`         | Hosted, with backups | Real users                 | Real |

## Rules

- **Never test migrations in production.**
- Never copy production data elsewhere.
- Each environment has its own credentials, API keys, webhook secrets and buckets.
- Razorpay is in test mode outside production.
- SMS uses mock numbers outside production, to save money and avoid messaging strangers.
- Production access is limited to named people with MFA on the account.

## Region

Singapore for all, pending D-07. Measure latency from Ranchi (S-02).

## Separate apps

| Variant     | Bundle ID (placeholder)      | Points to   |
| ----------- | ---------------------------- | ----------- |
| Development | `com.astainsite.app.dev`     | Development |
| Staging     | `com.astainsite.app.staging` | Staging     |
| Production  | `com.astainsite.app`         | Production  |

The real identifier is pending D-16. Only the production placeholder exists in `app.json`. EAS profiles will be added in M2. There is no `.env.production.example`, on purpose: production values live only in the hosting console and EAS secrets.
