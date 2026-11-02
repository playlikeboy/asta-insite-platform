---
paths:
  - 'apps/**'
  - 'packages/**'
  - '.github/**'
  - '.env*'
---

# Security

- The repository is public. No secrets, personal data or client documents. Templates hold placeholders only.
- Validate all input with shared schemas. Reject unknown fields.
- Authenticate, then authorize in the service. Test the other-user case.
- Errors and logs never reveal tokens, OTPs, connection strings, phone numbers or message bodies.
- Webhooks: verify the raw body first; deduplicate by event ID.
- A found vulnerability stops the task: report it, fix critical issues first, and rotate exposed secrets. See [Incident response](../../docs/security/INCIDENT_RESPONSE.md).
