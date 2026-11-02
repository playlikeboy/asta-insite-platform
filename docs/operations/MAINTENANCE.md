# Maintenance

The proposal includes 12 months of post-launch maintenance. Terms are not defined; agree on them at handover. The list below is a proposal.

## Schedule

| Frequency  | Task                                                                                                                                              |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Daily      | Glance at alerts, approval queue                                                                                                                  |
| Weekly     | Business health, failed jobs, `pnpm audit`                                                                                                        |
| Monthly    | Cost review; patch dependencies; review admin accounts                                                                                            |
| Quarterly  | Restore test; rotate `INTERNAL_JOB_SECRET` and API keys; review unused indexes; update [Official references](../technical/OFFICIAL_REFERENCES.md) |
| Yearly     | Apple and Google agreements, membership renewal, domain; security review                                                                          |
| On release | Expo SDK and OS target requirements                                                                                                               |

## Dependency updates

- Patch updates monthly, security fixes promptly. Use the release-age delay.
- One major upgrade at a time, with its own test run and commit.
- Expo SDK upgrades roughly follow their release cycle. Stores enforce target SDK rules, so this cannot wait forever.
- Known holds: TypeScript 7 awaits typescript-eslint support; ESLint 10 awaits framework configs. Node 22 maintenance ends 2027-04-30, so move to a newer LTS before then.

## Definition of maintenance vs new work

| Maintenance                                                       | New work                                    |
| ----------------------------------------------------------------- | ------------------------------------------- |
| Bug fixes, security patches, OS compatibility, dependency updates | New features, redesigns, added integrations |

Get the client to confirm this split in writing.
