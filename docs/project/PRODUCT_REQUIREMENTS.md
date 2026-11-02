# Product Requirements

**Status: working draft, not an approved SRS.** IDs are stable, so tests and code can cite them. "Confirmed" means stated in the client proposal. "Proposed" means added later and awaiting client approval.

## Customer

| ID   | Requirement                                                               | Status                                                                                              |
| ---- | ------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- |
| C-01 | Register with mobile number and OTP, email, or social login               | Confirmed                                                                                           |
| C-02 | Choose service categories of interest during onboarding                   | Confirmed                                                                                           |
| C-03 | Fill in basic profile and preferences                                     | Confirmed                                                                                           |
| C-04 | Post a requirement by choosing a category                                 | Confirmed                                                                                           |
| C-05 | Answer dynamic questions per category (location, timeline, budget, scope) | Confirmed                                                                                           |
| C-06 | Submit a requirement so providers can see it                              | Confirmed                                                                                           |
| C-07 | Upload photos and attachments to a requirement                            | Proposed                                                                                            |
| C-08 | Explore short videos and photo galleries of real projects                 | Confirmed                                                                                           |
| C-09 | See educational and inspirational content curated per category            | Confirmed                                                                                           |
| C-10 | Save content for later                                                    | Confirmed                                                                                           |
| C-11 | See the providers who showed interest in a requirement                    | Confirmed                                                                                           |
| C-12 | Browse provider portfolios, ratings, galleries and intro videos           | Confirmed                                                                                           |
| C-13 | Filter providers by budget, location and expertise                        | Confirmed                                                                                           |
| C-14 | Shortlist providers                                                       | Confirmed (screen named in proposal section title)                                                  |
| C-15 | On mutual interest, chat with the provider in the app                     | Confirmed                                                                                           |
| C-16 | On mutual interest, call the provider or send in-app messages             | Confirmed; call method Open (D-06)                                                                  |
| C-17 | Share documents and site details and schedule discussions                 | Confirmed                                                                                           |
| C-18 | Track current and past requirements                                       | Confirmed                                                                                           |
| C-19 | See communication status and shortlisted professionals                    | Confirmed                                                                                           |
| C-20 | Modify or close a requirement                                             | Confirmed                                                                                           |
| C-21 | Discover providers independently of a requirement                         | Proposed                                                                                            |
| C-22 | Rate and review a provider                                                | Confirmed in part: "Ratings and feedback from customers (optional based on project closure)" (D-13) |
| C-23 | Delete their account from inside the app                                  | Proposed; required by Apple guideline 5.1.1(v)                                                      |

## Provider

| ID   | Requirement                                                                                            | Status                                         |
| ---- | ------------------------------------------------------------------------------------------------------ | ---------------------------------------------- |
| P-01 | Register with email or mobile number (OTP)                                                             | Confirmed                                      |
| P-02 | Select one or more service categories                                                                  | Confirmed                                      |
| P-03 | Provide name or company name, service area and reach, years of experience, certifications and licenses | Confirmed                                      |
| P-04 | Pay a platform subscription through a payment gateway to activate the account                          | Confirmed; mechanism Open (D-05)               |
| P-05 | Add company profile, description, key services, experience, awards, licenses                           | Confirmed                                      |
| P-06 | Toggle an "available for leads" status                                                                 | Confirmed                                      |
| P-07 | Upload categorized project photos                                                                      | Confirmed                                      |
| P-08 | Add short process or walkthrough videos                                                                | Confirmed                                      |
| P-09 | Create custom galleries by project type                                                                | Confirmed                                      |
| P-10 | Add timelines, materials and optional budget range to projects                                         | Confirmed                                      |
| P-11 | Share daily write-ups or blogs and status updates with media                                           | Confirmed                                      |
| P-12 | Organize content with hashtags, tags and categories                                                    | Confirmed                                      |
| P-13 | Posts appear in the customer inspiration section                                                       | Confirmed                                      |
| P-14 | See requirements matching selected categories                                                          | Confirmed                                      |
| P-15 | Filter requirements by location, budget and deadline                                                   | Confirmed                                      |
| P-16 | Show interest, which sends a request to the customer                                                   | Confirmed                                      |
| P-17 | Receive chat requests or calls from interested customers                                               | Confirmed                                      |
| P-18 | Chat securely in-app                                                                                   | Confirmed                                      |
| P-19 | Send proposals, quotes or schedules through chat or email                                              | Confirmed                                      |
| P-20 | See how many customers visited the profile                                                             | Confirmed                                      |
| P-21 | See ratings and feedback                                                                               | Confirmed                                      |
| P-22 | Access platform videos, tutorials and process showcases                                                | Confirmed                                      |
| P-23 | Manage subscription status                                                                             | Proposed                                       |
| P-24 | Delete their account from inside the app                                                               | Proposed; required by Apple guideline 5.1.1(v) |

## Administrator (web)

| ID   | Requirement                                                  | Status    |
| ---- | ------------------------------------------------------------ | --------- |
| A-01 | View and manage all customers and providers                  | Confirmed |
| A-02 | Approve or deactivate provider profiles                      | Confirmed |
| A-03 | Control subscription plans, invoices and payment reports     | Confirmed |
| A-04 | Moderate banners and service categories                      | Confirmed |
| A-05 | See total requirements, top categories and most active users | Confirmed |
| A-06 | Manage in-app update and promotional push notifications      | Confirmed |
| A-07 | Moderate uploaded content                                    | Proposed  |
| A-08 | Monitor requirements and leads                               | Proposed  |
| A-09 | Manage administrator permissions                             | Proposed  |
| A-10 | Review sensitive administrative activity (audit log)         | Proposed  |
| A-11 | Require MFA for administrators                               | Proposed  |

## Non-functional

| ID   | Requirement                                                                 | Status                                                              |
| ---- | --------------------------------------------------------------------------- | ------------------------------------------------------------------- |
| N-01 | iOS and Android from one app                                                | Confirmed                                                           |
| N-02 | Encryption and data protection aligned with global privacy standards        | Confirmed (wording is broad; see [Privacy](../security/PRIVACY.md)) |
| N-03 | Screens work on small phones and for non-technical users                    | Proposed                                                            |
| N-04 | WCAG 2.2 AA for admin; equivalent contrast and touch target rules on mobile | Proposed                                                            |
| N-05 | India-focused launch; primary region Singapore                              | Proposed; Open (D-07)                                               |

## Stories from the proposal

**Customer (homeowner).** I install the app and sign up with my mobile number. I choose "Interior Designer". I answer simple questions (home size, style, budget) and submit. I start receiving interest and check portfolios and ratings. I chat with a designer, exchange ideas and schedule a consultation. Later I explore video galleries and post another requirement.

**Provider (contractor).** I register and choose "Civil Contractor" and "Painting". I pay my subscription to activate my listing. I build my profile and upload photos from my recent villa work. I see a wall painting requirement in my area and click Show Interest. The customer responds and we connect through in-app chat. I share a video of a previous project and confirm a site visit. Over time I receive more leads and build trust through ratings and media.

Detailed behavior is in [User flows](../product/USER_FLOWS.md).
