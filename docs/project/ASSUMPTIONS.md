# Assumptions

Each is treated as true until disproved. If one proves false, update the linked documents and remove it.

| ID   | Assumption                                                                | If false                                                                                                |
| ---- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| A-01 | Launch market is India; users have +91 numbers and pay in INR             | Razorpay, DLT and pricing work changes                                                                  |
| A-02 | One developer builds this                                                 | Roadmap durations and review process change                                                             |
| A-03 | Early scale is thousands of users, not millions                           | The modular monolith and PostgreSQL-based rate limiting still hold; revisit job and realtime throughput |
| A-04 | Appwrite Cloud remains acceptable to the client as the single main vendor | Hosting, auth and storage docs change                                                                   |
| A-05 | Singapore hosting is acceptable until the client says otherwise           | Blocked on D-07; Appwrite lists Bangalore as "coming soon"                                              |
| A-06 | Sites can reach the PostgreSQL pooler over TCP with acceptable latency    | Spike S-02; fallback is a different host for Next.js                                                    |
| A-07 | The app launches in English only                                          | Add i18n before M3 screens multiply                                                                     |
| A-08 | A person may hold both customer and provider profiles                     | The schema allows both; a rule can restrict it (D-01)                                                   |
| A-09 | Provider must be approved **and** subscribed before receiving leads       | Lead access checks change (D-10)                                                                        |
| A-10 | Admin dashboard needs light theme only; mobile starts light only          | Add a dark token set                                                                                    |
| A-11 | Customer contact details stay hidden until mutual connection              | Lead and chat permission rules change (D-08)                                                            |

## Technical spikes that turn assumptions into facts

These need a real Appwrite project. None has been run.

| ID   | Question                                                                           | Pass condition                                                                  | Due       |
| ---- | ---------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- | --------- |
| S-01 | Can Sites build this pnpm monorepo?                                                | Deploys `apps/web` from `main` with workspace packages                          | M1 exit   |
| S-02 | Is Sites to PostgreSQL latency acceptable, given SSR runs at edge locations?       | `/api/health` p95 under 300 ms from Ranchi                                      | M2        |
| S-03 | Does a TablesDB row update reach React Native through Realtime, permission-scoped? | Second user receives nothing; p95 send-to-signal under 2 s                      | Before M8 |
| S-04 | Does Appwrite phone OTP deliver to Indian numbers?                                 | 20 of 20 test SMS across Jio, Airtel and Vi within 30 s                         | M2        |
| S-05 | Do `expo-notifications` native tokens work as Appwrite push targets?               | Push arrives on a real iOS and Android device                                   | M8        |
| S-06 | Can a cron Function call an internal API route reliably?                           | Runs every minute for 24 hours without gaps                                     | M4        |
| S-07 | What video size and format limits work on Storage in practice?                     | Documented limits; playback on both platforms                                   | M7        |
| S-08 | What does Appwrite actually cost for this usage?                                   | Numbers replace the gaps in [Cost estimates](../integrations/COST_ESTIMATES.md) | M1        |
