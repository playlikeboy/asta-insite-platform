# Implementation Roadmap

Supersedes the blueprint's 8 milestones and 10 phases. Day counts are rough solo-developer estimates, not commitments; totals are discussed in [Milestones](MILESTONES.md). Exit tests: [Acceptance criteria](ACCEPTANCE_CRITERIA.md). Live status: [Project status](PROJECT_STATUS.md).

## M0: Foundation

- **Status:** Complete locally. Not pushed; CI not run on GitHub.
- **Objective:** A verified monorepo and handbook.
- **Features:** Web admin shell, mobile tab shells, tokens, contracts, identity schema, health route, CI, docs, agent system.
- **Dependencies:** None.
- **DB:** `users`, `customer_profiles`, `provider_profiles`, `admin_users`, `service_categories`.
- **API:** `GET /api/health`.
- **UI:** Admin shell, Overview placeholder, 10 mobile placeholders.
- **Tests:** Unit, integration, E2E 2, bundle.
- **Acceptance:** All local checks pass.
- **Docs:** Everything in `docs/`.

## M1: Environments and spikes

- **Status:** Not started. Blocked on repository write access and a paid Appwrite project.
- **Objective:** Prove the hosting plan before building on it.
- **Features:** Push; CI green; create Appwrite projects; deploy `apps/web` to Sites; first migration on hosted database.
- **Dependencies:** Appwrite credentials and authorization; D-17, D-18, D-19.
- **DB:** No changes; apply `0000` to dev.
- **API:** None; `/api/health` live.
- **UI:** None.
- **Tests:** CI, S-01, S-08.
- **Acceptance:** Deployed health check returns 200 from Sites.
- **Docs:** Update references, costs, deployment.
- **Estimate:** 3 days.

## M2: Authentication and roles

- **Status:** Not started.
- **Objective:** Real users sign in; roles come from the database.
- **Features:** Phone OTP; JWT verification; `users` created on first call; session restore; admin sign-in with MFA; role guards; domain error and logger foundations; settings shell.
- **Dependencies:** D-01, D-07, D-11, D-12, D-16; S-02, S-04.
- **DB:** Seed categories; add `rate_limits`, `admin_audit_logs`.
- **API:** `GET /me`, admin session routes, categories.
- **UI:** Splash, sign in, OTP, admin sign-in.
- **Tests:** Auth negative cases; E2E sign-in with mock numbers.
- **Acceptance:** Changing a client value cannot grant a role.
- **Docs:** Auth architecture status; `packages/domain` created when a rule needs sharing.
- **Estimate:** 10 days.

## M3: Customer profile and discovery

- **Status:** Not started.
- **Objective:** Customer can register and browse providers.
- **Features:** Profile, category interests, home, provider search and filter, provider profile, media upload pipeline, Maestro setup.
- **Dependencies:** M2, D-21 (design approval).
- **DB:** `customer_categories`, `media_assets`, `provider_categories`, `service_areas`.
- **API:** Customer profile, `GET /providers`, media routes.
- **UI:** Category selection, Home, Search, Professional profile.
- **Tests:** Filters, upload failures, states.
- **Acceptance:** Flow 1 and 11 pass on real devices.
- **Docs:** Screen status.
- **Estimate:** 10 days.

## M4: Provider onboarding and subscription

- **Status:** Not started. **Blocked on D-04, D-05, D-10.**
- **Objective:** Provider registers, gets approved and subscribed.
- **Features:** Onboarding wizard, credentials, minimal admin approval queue, plans, checkout, signed webhook, activation, expiry job, outbox.
- **Dependencies:** M2, M3 media; Razorpay test account; S-06.
- **DB:** `provider_credentials`, `subscription_plans`, `subscriptions`, `payments`, `payment_events`, `outbox_events`.
- **API:** Provider profile routes, plans, checkout, webhook, approval, internal jobs.
- **UI:** Provider onboarding, Plans, Payment, Status, Dashboard; admin Provider Approvals.
- **Tests:** All webhook cases; lead access computation.
- **Acceptance:** Flows 2, 3, 14, 15 pass in test mode.
- **Docs:** Razorpay, D-05 outcome.
- **Estimate:** 12 days.

## M5: Requirements

- **Status:** Not started. D-02 confirms scope.
- **Objective:** Customer posts a structured requirement.
- **Features:** Question versions, wizard, drafts, photos, my requirements, edit, close, expiry job.
- **Dependencies:** M3.
- **DB:** `category_questions`, `requirements`, `requirement_answers`, `requirement_media`.
- **API:** Requirement endpoints; category questions.
- **UI:** Wizard, details, My requirements.
- **Tests:** Dynamic validation; version conflict.
- **Acceptance:** Flows 4 and 5 pass.
- **Docs:** Question configuration guide.
- **Estimate:** 8 days.

## M6: Leads and connections

- **Status:** Not started. **Needs D-08.**
- **Objective:** Marketplace core works.
- **Features:** Lead feed, matching, Show Interest, accept and decline, shortlist, connection, conversation record, digest notifications through outbox as in-app rows.
- **Dependencies:** M4, M5.
- **DB:** `provider_interests`, `shortlists`, `connections`, `conversations`, `conversation_members`, `notifications`.
- **API:** Leads, interest, accept, shortlist.
- **UI:** Lead feed, details, Show Interest, Interested professionals, Shortlist, Connections.
- **Tests:** Unsubscribed provider denied; concurrency on accept; contacts hidden.
- **Acceptance:** Flows 6, 7, 8 pass.
- **Docs:** Lead generation.
- **Estimate:** 8 days.

## M7: Content and portfolio

- **Status:** Not started. D-15 affects moderation.
- **Objective:** Discovery feed and provider portfolios.
- **Features:** Portfolios, posts, feed, gallery, video, saved items, reports, banners.
- **Dependencies:** M3, M4; S-07.
- **DB:** `portfolios`, `portfolio_items`, `content_posts`, `content_post_media`, `saved_content`, `content_reports`, `banners`.
- **API:** Content endpoints, portfolio routes.
- **UI:** Feed, gallery, portfolio, create post, Saved.
- **Tests:** Report flow; removed content hidden.
- **Acceptance:** Flow 12 passes; video plays on both platforms.
- **Docs:** Content system; S-07 results.
- **Estimate:** 10 days.

## M8: Chat, push, reviews, analytics

- **Status:** Not started. **Needs D-06, D-13; S-03, S-05.**
- **Objective:** Connected users communicate; providers see results.
- **Features:** Messages, attachments, realtime signals, push, email, notification center, reviews, profile analytics.
- **Dependencies:** M6; Firebase, Apple, Resend accounts.
- **DB:** `messages`, `message_attachments`, `reviews`, `provider_profile_views`; provider rating columns.
- **API:** Chat, notifications, reviews, analytics.
- **UI:** Inbox, Chat, Notifications, Reviews, Analytics.
- **Tests:** Non-member denied; idempotent send; reconnection; push on real devices.
- **Acceptance:** Flows 9, 10, 13, 18 pass.
- **Docs:** Realtime, push.
- **Estimate:** 12 days.

## M9: Admin dashboard

- **Status:** Shell only.
- **Objective:** Operators run the platform.
- **Features:** All sidebar pages except finance; roles, audit log viewer, categories, moderation, campaigns, analytics.
- **Dependencies:** M4 to M8.
- **DB:** No new tables expected.
- **API:** Admin endpoints.
- **UI:** [Admin screens](../design/ADMIN_SCREENS.md).
- **Tests:** Role matrix; audit rows; `axe` checks; Playwright flows.
- **Acceptance:** Each [Authorization](../security/AUTHORIZATION.md) cell is tested.
- **Docs:** Admin guide.
- **Estimate:** 12 days.

## M10: Billing completion

- **Status:** Not started. **Needs D-03, D-09, D-14.**
- **Objective:** Finance operations.
- **Features:** Renewal, cancellation, grace, invoices, refunds, reconciliation, admin finance pages; store billing if D-05 selects it.
- **Dependencies:** M4, M9.
- **DB:** `invoices`, `refunds`.
- **API:** Invoices, refunds, admin finance.
- **UI:** Subscription management; admin Subscriptions, Payments, Invoices.
- **Tests:** Refund idempotency; reconciliation; invoice numbering.
- **Acceptance:** Flow 16 passes; accountant approves invoice.
- **Docs:** Payment docs.
- **Estimate:** 6 days.

## M11: Hardening

- **Status:** Not started. **Needs D-20.**
- **Objective:** Production readiness.
- **Features:** Account deletion job, security review, penetration test if budgeted, load test, accessibility pass, monitoring, restore test, legal pages, min-version check.
- **Dependencies:** All features.
- **DB:** Retention jobs.
- **API:** Deletion routes, app version.
- **UI:** Settings, force update, policies.
- **Tests:** Full regression; load; restore.
- **Acceptance:** [Release checklist](RELEASE_CHECKLIST.md) passes on staging. Flow 17 passes.
- **Docs:** Runbooks, status.
- **Estimate:** 10 days.

## M12: Launch and handover

- **Status:** Not started. **Needs D-16.**
- **Objective:** Public apps; client owns everything.
- **Features:** Production setup, store submissions, staged rollout, training, handover.
- **Dependencies:** M11; client accounts; authorization to deploy.
- **DB:** Production migration, seed.
- **API:** Production.
- **UI:** Store assets.
- **Tests:** Production smoke test.
- **Acceptance:** Live in both stores; [Handover](../operations/HANDOVER.md) complete.
- **Docs:** Final status.
- **Estimate:** 5 days, plus store review time.
