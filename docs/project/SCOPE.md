# Scope

## In scope (Confirmed)

- One React Native app for iOS and Android with customer and provider segments
- Web admin panel
- Requirement posting with dynamic per-category questions
- Show Interest and mutual-interest connection
- In-app chat, document sharing
- Provider profiles, portfolios, galleries, blogs, status updates
- Customer content discovery and saving
- Provider subscriptions through a payment gateway
- Profile visit analytics, ratings and feedback
- Admin management, reporting and notifications
- 12 months of post-launch maintenance

## Added by this handbook because the product cannot ship or stay safe without it

Each still needs client awareness because it adds work.

| Item                                                         | Why                                          |
| ------------------------------------------------------------ | -------------------------------------------- |
| In-app account deletion                                      | Apple guideline 5.1.1(v)                     |
| Sign in with Apple or equivalent, if social login is offered | Apple guideline 4.8                          |
| Content reporting and moderation                             | User-generated content needs a takedown path |
| Audit logs, admin MFA, rate limiting                         | Baseline security                            |
| DLT registration work for SMS                                | Indian telecom rules                         |

## Out of scope unless the client decides otherwise

- Customers paying providers through the platform, escrow, payouts (D-02)
- Project booking and job management (D-02)
- Commission (D-03)
- In-app voice or video calling (D-06)
- Web or desktop versions of the customer and provider experiences
- Languages other than English (Assumption A-07)
- Offline editing beyond clear offline states
- Native tablet layouts

## How scope changes

A scope change gets a row in [Open decisions](OPEN_DECISIONS.md), then client approval, then updates to [requirements](PRODUCT_REQUIREMENTS.md), [features](../product/FEATURE_CATALOG.md) and the [roadmap](../delivery/IMPLEMENTATION_ROADMAP.md).
