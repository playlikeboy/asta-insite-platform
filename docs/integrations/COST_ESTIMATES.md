# Cost Estimates

**These are incomplete on purpose.** Only figures read from vendor pages on 2026-11-02 appear as numbers. Spike S-08 fills the gaps. Do not quote these to the client as a budget. The proposal contains no running cost figure.

## Verified

| Item                                   | Figure                        | Source                |
| -------------------------------------- | ----------------------------- | --------------------- |
| Database Starter (1 core, 1 GB)        | $10 per month                 | Appwrite pricing      |
| Database Standard (2 cores, 2 GB)      | $20 per month                 | Appwrite pricing      |
| Database Standard Plus (2 cores, 4 GB) | $49 per month                 | Appwrite pricing      |
| Database Professional (4 cores, 8 GB)  | $85 per month                 | Appwrite pricing      |
| Database compute credit                | $10 per month                 | Appwrite pricing      |
| HA replica                             | Full tier price again         | Appwrite pricing      |
| Point-in-time recovery                 | Adds 20%                      | Appwrite pricing      |
| Appwrite SMS to +91                    | $0.003 per SMS, may fluctuate | Appwrite billing docs |
| EAS Free                               | 15 Android and 15 iOS builds  | Expo pricing          |
| EAS Starter                            | $19 per month                 | Expo pricing          |
| EAS Production                         | $199 per month                | Expo pricing          |

## Not verified

| Item                                                 | Note                                                                    |
| ---------------------------------------------------- | ----------------------------------------------------------------------- |
| Appwrite Pro plan                                    | The blueprint's "$25 per month" is unconfirmed. Included limits unknown |
| Bandwidth, storage and execution overage             | Read from pricing page in S-08                                          |
| Whether each environment needs its own paid database | Likely yes; confirm                                                     |
| Razorpay fees                                        | Client's agreement                                                      |
| MSG91, Resend                                        | Vendor pricing not checked                                              |
| Apple Developer, Google Play fees                    | Check vendor pages before quoting                                       |
| Store commission                                     | Depends on D-05                                                         |
| Domain                                               | Registrar                                                               |

## Usage model

Fill this in with real measurements during S-08.

| Driver    | Formula                                                 |
| --------- | ------------------------------------------------------- |
| SMS       | Sign-ins per month x $0.003, plus failed-attempt margin |
| Storage   | Providers x photos x average size, plus video           |
| Bandwidth | Monthly active users x images viewed x thumbnail size   |
| Database  | Start on Starter; step up on CPU or connection pressure |

SMS example, using only the verified rate: 10,000 sign-ins per month is about $30. The volume is an illustration, not a forecast.

## Who pays

Vendors bill the client directly on the client's accounts. Appwrite cannot consolidate every vendor. See [Cost management](../operations/COST_MANAGEMENT.md).
