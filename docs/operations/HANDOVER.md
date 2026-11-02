# Handover

**Status:** Planned for M12. The maintenance period (12 months) begins after launch.

## Client receives

| Item          | Detail                                                                                                                            |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| Source code   | GitHub repository under client's control                                                                                          |
| Accounts      | Appwrite, Razorpay, Apple, Google, Firebase, Resend, domain: all in client's name, with the developer removed or scoped afterward |
| Credentials   | Through a password manager, never email or chat                                                                                   |
| Documentation | This handbook                                                                                                                     |
| Apps          | Published store listings                                                                                                          |
| Training      | Admin dashboard walkthrough, recorded                                                                                             |

## Checklist

- [ ] All vendor accounts owned by the client
- [ ] MFA on every account, with recovery codes stored by the client
- [ ] Secrets rotated after transfer
- [ ] Developer access reviewed
- [ ] First super admin created
- [ ] Support contact, grievance officer and legal pages named
- [ ] Backups verified with a test restore
- [ ] Monitoring alerts go to agreed people
- [ ] Open issues listed
- [ ] [Project status](../delivery/PROJECT_STATUS.md) accurate
- [ ] Maintenance terms signed: scope, hours, response times

## For a new developer or agent

Start with [docs/README](../README.md), then [CLAUDE.md](../../CLAUDE.md), then [Development setup](../engineering/DEVELOPMENT_SETUP.md). The `understand-project` skill walks through this.
