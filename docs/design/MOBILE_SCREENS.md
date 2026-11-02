# Mobile Screens

**Status:** Tab shells Implemented as `PlannedScreen` placeholders in `apps/mobile/src/app/`. All screen content Planned. Audience: non-technical homeowners first, so visual and simple.

## Navigation

```
Root stack
├── Auth: Splash, Sign in, OTP, Role and category setup
├── Customer tabs: Home | Explore | Post | Inbox | Profile
├── Provider tabs: Dashboard | Leads | Portfolio | Inbox | Profile
└── Pushed screens: details, wizard, chat, settings
```

`app/index.tsx` is a temporary role chooser. It goes away when auth arrives at M2. The account's role decides the tab set; if D-01 allows both, Profile offers a switch.

## Customer

| Screen                   | Route (proposed)               | Purpose                                  | Milestone |
| ------------------------ | ------------------------------ | ---------------------------------------- | --------- |
| Splash                   | `/`                            | Restore session                          | M2        |
| Login and registration   | `/auth/sign-in`                | Phone entry, social per D-11             | M2        |
| OTP verification         | `/auth/otp`                    | Six-digit code, resend timer             | M2        |
| Category selection       | `/onboarding/categories`       | Interests                                | M3        |
| Customer home            | `/customer/home`               | Categories, inspiration, active projects | M3        |
| Search services          | `/customer/search`             | Filter by budget, location, expertise    | M3        |
| Inspiration feed         | `/customer/explore`            | Posts, tips, articles                    | M7        |
| Video and photo gallery  | `/media/[id]`                  | Full-screen viewer                       | M7        |
| Post requirement wizard  | `/customer/post`               | Dynamic questions, photos, budget        | M5        |
| Requirement details      | `/requirements/[id]`           | Status, edit, close                      | M5        |
| Interested professionals | `/requirements/[id]/interests` | Compare, accept, decline                 | M6        |
| Professional profile     | `/providers/[id]`              | About, portfolio, reviews                | M3        |
| Portfolio gallery        | `/providers/[id]/portfolio`    | Projects                                 | M7        |
| Shortlist                | `/requirements/[id]/shortlist` | Saved professionals                      | M6        |
| Chat                     | `/inbox/[id]`                  | Messages, attachments                    | M8        |
| My requirements          | `/customer/requirements`       | Own requests                             | M5        |
| Saved content            | `/customer/saved`              | Saved items                              | M7        |
| Notifications            | `/notifications`               | History                                  | M8        |
| Account settings         | `/settings`                    | Profile, privacy, delete account         | M2, M11   |

## Provider

| Screen                     | Route (proposed)                    | Purpose                        | Milestone |
| -------------------------- | ----------------------------------- | ------------------------------ | --------- |
| Provider registration      | `/provider/onboarding/start`        | Begin                          | M4        |
| Business information       | `/provider/onboarding/business`     | Name, description              | M4        |
| Service category selection | `/provider/onboarding/categories`   | Expertise                      | M4        |
| Location and experience    | `/provider/onboarding/location`     | Areas, years                   | M4        |
| Verification details       | `/provider/onboarding/verification` | Certifications, licenses       | M4        |
| Subscription plans         | `/provider/plans`                   | Compare; depends on D-04, D-05 | M4        |
| Payment                    | `/provider/checkout`                | Depends on D-05                | M4        |
| Provider status            | `/provider/status`                  | Pending, approved, rejected    | M4        |
| Provider dashboard         | `/provider/dashboard`               | Status, leads, views           | M4        |
| Lead feed                  | `/provider/leads`                   | Matching requests              | M6        |
| Lead details               | `/provider/leads/[id]`              | Scope, no contact details      | M6        |
| Show Interest              | Sheet on lead details               | Optional note, confirm         | M6        |
| Customer connections       | `/provider/connections`             | Accepted                       | M6        |
| Portfolio management       | `/provider/portfolio`               | Projects                       | M7        |
| Create project post        | `/provider/posts/new`               | Text and media                 | M7        |
| Upload photo or video      | Sheet                               | Picker, progress               | M3, M7    |
| Chat                       | `/inbox/[id]`                       | Shared with customer           | M8        |
| Profile analytics          | `/provider/analytics`               | Visits                         | M8        |
| Reviews and ratings        | `/provider/reviews`                 | Feedback                       | M8        |
| Subscription management    | `/provider/subscription`            | Plan, renew, invoices          | M4, M10   |
| Settings                   | `/settings`                         | Shared                         | M2        |

## Layout rules

- Phones only; portrait first. No native tablet layouts (out of scope).
- Bottom tabs, with safe-area insets forwarded manually, since Uniwind's open source version requires it.
- Large images. One primary action per screen.
- Android back and iOS swipe always work. Deep links land correctly after sign-in.
- Offline: see [Components](COMPONENTS.md#required-states).
