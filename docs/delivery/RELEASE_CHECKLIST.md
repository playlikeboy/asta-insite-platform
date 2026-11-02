# Release Checklist

Use for each production release. All boxes are unchecked because nothing has been released.

## Code

- [ ] CI green on the release commit
- [ ] `pnpm audit --prod --audit-level high` clean
- [ ] No open Critical or High defects
- [ ] Versions and changelog updated

## Database

- [ ] Migration rehearsed on a database branch
- [ ] Compatible with the previous version
- [ ] Backup taken

## Security

- [ ] [Security audit skill](../../.claude/skills/security-audit/SKILL.md) run
- [ ] Production secrets set; none shared with staging
- [ ] Admin MFA enforced
- [ ] Webhook verification tested on staging

## Function

- [ ] 18 workflows in [Acceptance criteria](ACCEPTANCE_CRITERIA.md) pass on staging
- [ ] Real iOS and Android devices tested, including a mid-range Android on 4G
- [ ] Push, SMS and email delivered
- [ ] Payment in test mode, then a small real transaction for first launch

## First launch only

- [ ] D-04, D-05, D-16 resolved; other blocking decisions closed
- [ ] Final bundle ID and package
- [ ] Privacy policy, terms and support URL live
- [ ] Apple privacy labels, Google Data safety forms complete
- [ ] Account deletion works in the app
- [ ] Reviewer demo account and notes ready
- [ ] Content moderation and report functions work
- [ ] DLT registered if MSG91 is used
- [ ] Monitoring alerts tested
- [ ] Restore tested
- [ ] Budget cap set
- [ ] Explicit client authorization to deploy

## After

- [ ] `/api/health` and smoke test pass
- [ ] Watch errors, crashes and payments for 24 hours
- [ ] Tag release
- [ ] Update [Project status](PROJECT_STATUS.md)
