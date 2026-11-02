# Release Process

**Status:** Planned. Nothing has been released. Checklist: [Release checklist](../delivery/RELEASE_CHECKLIST.md). Deployment: [Deployment](../operations/DEPLOYMENT.md).

## Versions

- **Web and API:** deploy from `main`; tag `web-vX.Y.Z`.
- **Mobile:** semantic version in `app.json`; EAS manages build numbers; tag `mobile-vX.Y.Z`.

## Web and API

1. Merge to `main`, CI passes.
2. Deploy to staging. Migrate staging. Smoke test.
3. Rehearse risky migrations on a database branch of production.
4. Back up production for risky changes. Migrate production. Deploy.
5. Check `/api/health`, logs, critical flows.
6. Rollback: redeploy the previous Sites deployment. Schema is forward-only, so migrations must remain compatible with the previous code.

## Mobile

1. Update the version and test on real iOS and Android devices.
2. EAS Build with the staging profile. Internal distribution, TestFlight or Play internal testing.
3. Production build. Submit for review.
4. Staged rollout on Play; phased release on the App Store.
5. Monitor crash reports and API errors.

## Compatibility

Old apps stay installed for months. So:

- The API must support the previous supported app versions.
- Breaking changes follow [expand then contract](../database/MIGRATION_GUIDE.md#expand-then-contract).
- Plan a minimum version check at M11, with a forced update screen.

## Over-the-air updates

EAS Update can ship JavaScript fixes, within store rules. Decide at M11. Native changes always need a store release.

## Store review risks

Payments (D-05), account deletion (5.1.1(v)), login options (4.8), user content moderation and reporting. Build these before submission.
