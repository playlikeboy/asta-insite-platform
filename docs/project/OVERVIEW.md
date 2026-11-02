# Overview

**Source of truth for what Asta Insite is.**

Asta Insite is a mobile marketplace connecting people who need home-related work with professionals across architecture, interior design, construction, civil contracting, painting, plumbing, home automation and similar trades. Customers post what they need. Subscribed professionals browse those requirements and show interest. When interest is mutual, the two can talk inside the app.

## Who uses it

| User                                           | Goal                                                           | Surface                  |
| ---------------------------------------------- | -------------------------------------------------------------- | ------------------------ |
| **Customer** (homeowner)                       | Find and talk to the right professional; get inspiration       | Mobile app, customer tab |
| **Service provider** (professional or company) | Find leads, show work, build a reputation                      | Mobile app, provider tab |
| **Administrator**                              | Approve providers, moderate content, manage plans and payments | Web dashboard            |

The app targets **iOS and Android** as one application with two segments (Confirmed: client proposal).

## How money flows

Providers pay Asta Insite a platform subscription through a payment gateway to activate their account (Confirmed). Nothing in the proposal has customers paying through the platform. Customer-to-provider payment, booking and commission are [open decisions](OPEN_DECISIONS.md), not features.

## Names

| Item                          | Name                      |
| ----------------------------- | ------------------------- |
| Public product and mobile app | Asta Insite               |
| Internal codename             | Asta One                  |
| Repository                    | `asta-insite-platform`    |
| Admin dashboard               | Asta Insite Admin         |
| Backend                       | Asta Core                 |
| Database                      | Asta Database             |
| API                           | Asta API                  |
| Documentation                 | Asta Engineering Handbook |

Alternative names floated in the blueprint (Asta Connect, Asta Habitat, Asta Build, Asta Pro) were never checked for domain or trademark availability.

## Sources

- **Client proposal:** "Asta Insite Mobile Application Proposal", 4 pages. Not stored here because the repository is public. Its content is captured in [Product requirements](PRODUCT_REQUIREMENTS.md).
- **Project blueprint:** an internal recommendation covering stack, schema, screens and costs. Its content was merged into this handbook. Where research contradicted it, the [ADRs](../architecture/ARCHITECTURE_DECISIONS.md) explain why.

## Delivery commitments in the proposal

- Estimated **100 to 110 working days**, across six phases: planning, UI/UX design, React Native development, backend integration, testing and QA, launch and deployment.
- **12 months** of post-launch maintenance and technical support, including performance updates and bug fixes.
- Advanced encryption and data protection "in line with global privacy standards".
- The client pays for any third-party APIs required during development.

The section titled "Timeline, and Commercial Terms" states no project price or payment schedule. See [D-18 and D-19](OPEN_DECISIONS.md).
