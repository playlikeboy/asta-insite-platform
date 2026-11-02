# Architecture Decisions

**Source of truth for accepted technical decisions.** Add a new ADR before changing any of these. Mark replaced ADRs "Superseded by ADR-XXX" and keep them. Vendor facts are in [Official references](../technical/OFFICIAL_REFERENCES.md).

## ADR-001: TypeScript monorepo with pnpm and Turborepo

**Status:** Accepted. **Context:** One developer maintains web, mobile and shared rules. **Decision:** One repository using pnpm workspaces and Turborepo, with internal packages shipped as TypeScript source. **Consequences:** Contracts change atomically across apps. No package build step. Metro and Next.js compile the source (`transpilePackages` on web). **Rejected:** Separate repositories, because they add version coordination with no benefit for one developer.

## ADR-002: Modular monolith on Next.js Route Handlers

**Status:** Accepted. **Decision:** Admin UI and API share one Next.js app. Business logic lives in framework-free services. **Consequences:** One deployment. Long-running work must go to jobs. **Rejected:** Microservices (operations cost); a separate Node API (a second host) unless Sites limits force it; Next.js Server Actions for the public API, because mobile needs plain HTTP.

## ADR-003: PostgreSQL with Drizzle and node-postgres

**Status:** Accepted. **Decision:** Appwrite Native PostgreSQL is the system of record. Drizzle defines schema and generates SQL migrations. Runtime uses the pooled URL through `pg`; migrations use the direct URL. **Why `pg`:** It only prepares named statements, so it works in transaction-mode pooling without extra flags. **Rejected:** TablesDB as the main database, because the domain needs joins and transactions.

## ADR-004: Messages live in PostgreSQL, with TablesDB as a realtime signal

**Status:** Accepted, pending spike S-03. **Context:** The blueprint proposed storing chat in TablesDB. Appwrite Realtime covers TablesDB rows but not Native PostgreSQL, and the two have no shared transactions.

| Criterion                        | A. Chat in TablesDB                   | B. PostgreSQL + own WebSocket server                      | **C. PostgreSQL + TablesDB signal**             |
| -------------------------------- | ------------------------------------- | --------------------------------------------------------- | ----------------------------------------------- |
| Connection + conversation atomic | No, two systems                       | Yes                                                       | Yes                                             |
| Business rules on send           | Only if all writes go through the API | Yes                                                       | Yes                                             |
| Admin moderation and joins       | Across two stores                     | One store                                                 | One store                                       |
| Account deletion and backup      | Two procedures                        | One                                                       | One                                             |
| Extra infrastructure             | None                                  | A long-running server; Sites does not document WebSockets | None                                            |
| Failure effect                   | Lost write means lost message         | Socket down means polling                                 | Lost signal means slight delay, never lost data |
| Cost                             | Reads and writes per message          | Another host                                              | One row write per recipient per message         |

**Decision:** Option C. PostgreSQL holds conversations, members, messages and attachments. TablesDB holds one table, `user_signals`, with one row per user, readable only by that user and written only by the server. A signal contains a timestamp and a conversation ID, never message text. The app refetches through the API on signal, foreground and reconnect.

**Consequences:** One source of truth and no ambiguous split. Each message adds one network hop. Typing indicators and read receipts stay out unless added through presences. **Fallback if S-03 fails:** Poll while the chat is open, or move to option B with a new ADR.

## ADR-005: Appwrite Auth for identity, PostgreSQL for roles

**Status:** Accepted. **Decision:** Appwrite owns credentials and sessions. `users.appwrite_user_id` links identity to business data. Roles come from `customer_profiles`, `provider_profiles` and `admin_users`. Mobile sends a short-lived JWT; admin web uses an httpOnly session cookie. **Rejected:** Appwrite labels as the source of roles, because a second role store can drift from business state.

## ADR-006: Appwrite Storage with server-registered media

**Status:** Accepted. **Decision:** Clients upload to Appwrite Storage, then register the file through the API, which checks type and size and creates `media_assets`. Public media and private documents use separate buckets. **Consequences:** Orphan uploads need a cleanup job. Files over 20 MB cannot be encrypted or compressed, so documents stay under that limit. Video transcoding is not provided; see [Storage architecture](STORAGE_ARCHITECTURE.md).

## ADR-007: UI libraries

**Status:** Accepted. Requested explicitly: "use the best lib for UI/UX".

**Web: shadcn/ui on Radix with Tailwind v4.** Code is owned in the repo, accessible primitives, and a good fit for dense admin tables with TanStack Table and charts with Recharts.

**Mobile: HeroUI Native on Uniwind (Tailwind v4).**

| Option                       | Finding                                                                                         | Verdict    |
| ---------------------------- | ----------------------------------------------------------------------------------------------- | ---------- |
| **HeroUI Native + Uniwind**  | Stable 1.x, Apache-2.0, maintained, accessible components, Tailwind v4                          | **Chosen** |
| NativeWind                   | Latest stable is v4; v5 still release candidate, so no stable path to shared Tailwind v4 tokens | Rejected   |
| React Native Reusables       | shadcn-style, owned code; more to maintain alone                                                | Fallback   |
| Tamagui, gluestack, RN Paper | Own styling systems, so tokens cannot be shared with the web CSS                                | Rejected   |

**Shared:** One token file (`@asta/design-tokens/tokens.css`) feeds Tailwind on both platforms. Lucide icons on both. **Consequences:** No shared component package, because web and native components differ. HeroUI's rule against changing its designs applies to upstream contributions, not to theming here. **Risk:** Uniwind and HeroUI are young. Vendor performance claims were not relied on. The app has been bundled but not yet run on a device.

**Approved for use when a milestone needs them, not installed yet:** expo-image, @shopify/flash-list, react-hook-form with @hookform/resolvers, expo-secure-store, expo-notifications, @tanstack/react-table, recharts, sonner.

## ADR-008: Jobs through an outbox and scheduled Functions

**Status:** Accepted, pending spike S-06. **Decision:** Side effects are written to `outbox_events` in the business transaction. A cron Function calls an internal, secret-protected API route that processes a batch with `FOR UPDATE SKIP LOCKED` inside a transaction. The route holds the logic, so jobs reuse services. **Rejected:** Pooled `LISTEN/NOTIFY`, which is unavailable in transaction mode; a queue vendor, for now.

## ADR-009: Pluggable billing, Razorpay first

**Status:** Accepted for structure; mechanism pending D-05. **Decision:** `subscriptions.billing_provider` records who charges. Razorpay is implemented first. Store billing can be added without a schema redesign. Subscription state changes only on verified server events, never on a client claim.

## ADR-010: API conventions

**Status:** Accepted. **Decision:** Versioned `/api/v1`, because old app versions stay installed. Same envelope everywhere (`@asta/contracts`). Cursor pagination. `/api/health` and webhooks sit outside the version prefix. **Rejected:** tRPC or GraphQL, because REST plus Zod is enough and is easy to hand over.

## ADR-011: Rate limiting in PostgreSQL

**Status:** Accepted. **Decision:** Atomic upsert counters in `rate_limits`, on top of Appwrite's own limits. **Why:** Serverless processes share nothing, and no Redis exists in the stack. **Upgrade trigger:** Rate limit writes becoming a measurable share of database load.

## ADR-012: Native push tokens through Appwrite Messaging

**Status:** Accepted, pending spike S-05. **Decision:** `expo-notifications` obtains the native FCM or APNs token, registered with `account.createPushTarget`. **Why:** Appwrite lists FCM and APNs, not Expo's push service. **Consequence:** Needs a development build; `device_tokens` from the original list is removed because Appwrite stores targets.

## ADR-013: Test tooling

**Status:** Accepted. **Decision:** Vitest for unit and integration tests, real PostgreSQL for database tests, Playwright for admin E2E, Maestro planned for mobile flows from M3.

## ADR-014: Toolchain versions

**Status:** Accepted. **Decision:** TypeScript 6.0, not 7, because typescript-eslint requires `<6.1.0`. ESLint 9, as both framework generators scaffold it. Node 22 in CI and `.nvmrc`, because Appwrite's listed LTS Function runtime is `node-22` and Expo needs 22.13 or later. **Upgrade trigger:** typescript-eslint supports TypeScript 7; Appwrite lists a newer LTS runtime.

## ADR-015: Region

**Status:** Accepted provisionally. **Decision:** Singapore (`sgp`), which is what the existing Appwrite project uses. A database cannot change region independently of its project. **Pending:** D-07.

## ADR-016: Packages created only when used

**Status:** Accepted. **Decision:** `packages/domain` arrives with its first service in M2. `validation` merges into `contracts`. The blueprint's `ui` becomes `design-tokens`. `appwrite` helpers stay in each app, because client and server SDKs differ. **Why:** Empty packages add noise and imply work that does not exist.
