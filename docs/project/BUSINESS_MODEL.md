# Business Model

## Confirmed

- Customers post requirements and browse content. The proposal states no customer charge.
- Providers pay a **platform subscription** through a payment gateway to activate their account.
- The admin panel controls subscription plans, invoices and payment reports.

## Value exchange

| Party       | Gives                                         | Gets                                                                      |
| ----------- | --------------------------------------------- | ------------------------------------------------------------------------- |
| Customer    | Requirement details, contact consent, reviews | Interested professionals, portfolios, inspiration, a single place to talk |
| Provider    | Subscription fee, portfolio content           | Qualified leads, a business presence, ratings                             |
| Asta Insite | Platform, moderation, trust                   | Subscription revenue                                                      |

## Revenue risks

1. **App store billing (D-05, high impact).** A subscription that unlocks leads inside the app may have to use Apple In-App Purchase and Google Play Billing rather than Razorpay. Store fees would then apply, and the subscription price and margin change. See [Subscription model](../product/SUBSCRIPTION_MODEL.md).
2. **Marketplace liquidity.** Providers pay only if leads exist, and customers stay only if providers respond. The proposal has no launch plan for either side. This is a business question for the client, not an engineering one.
3. **Lead quality.** If one requirement goes to too many providers, each lead is worth less. The distribution rules are unresolved (D-08).

## Not in the business model unless the client decides otherwise

- Customers paying providers through the platform (D-02)
- Commission on provider jobs (D-03)
- Booking and escrow (D-02)
- Paid promotion or lead credits

The schema and API must not assume any of these. Do not add them silently.
