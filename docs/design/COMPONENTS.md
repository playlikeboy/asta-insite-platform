# Components

**Web Implemented:** Badge, Button, Input, Separator, Sheet, Sidebar, Skeleton, Tooltip (shadcn/ui). **Mobile:** HeroUI Native installed; only `PlannedScreen` exists. All others Planned. Add a component only when a screen needs it.

## Shared patterns

| Component     | Mobile | Web                        | Notes                                                                                                          |
| ------------- | ------ | -------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Button        | HeroUI | shadcn                     | Primary terracotta 700; secondary outline; destructive critical. Min height 48 on mobile. One primary per view |
| Text input    | HeroUI | shadcn                     | Label above, never placeholder-only. Error below                                                               |
| Select, chips | HeroUI | shadcn (add)               | Chips for categories                                                                                           |
| Card          | Custom | shadcn (add)               | 16 px radius, white on ivory                                                                                   |
| Sheet         | HeroUI | Implemented                | Filters, actions                                                                                               |
| Status badge  | Custom | Implemented                | Color plus word                                                                                                |
| Skeleton      | HeroUI | Implemented                | Matches final layout                                                                                           |
| Toast         | HeroUI | sonner when needed         | Non-critical confirmation only                                                                                 |
| Data table    | No     | TanStack Table when needed | Admin only                                                                                                     |

## Product components

| Component         | Where            | Contents                                                             |
| ----------------- | ---------------- | -------------------------------------------------------------------- |
| `ProviderCard`    | Search, feeds    | Photo, business, category, city, rating, verified mark               |
| `LeadCard`        | Provider feed    | Category, city, budget range, deadline, age, interest count per D-08 |
| `RequirementCard` | My requirements  | Title, status, interested count                                      |
| `PortfolioGrid`   | Profile          | 2-column images; opens viewer                                        |
| `MediaViewer`     | Gallery          | Swipe, pinch, video                                                  |
| `WizardStep`      | Post requirement | Progress, one topic per step, back, draft save                       |
| `DynamicQuestion` | Wizard           | Renders by question kind: text, number, single, multi, date          |
| `ChatBubble`      | Chat             | Sender side, time, delivery state, attachment                        |
| `UploadTile`      | Forms            | Progress, retry, remove                                              |
| `EmptyState`      | Everywhere       | Message and next action                                              |
| `ErrorState`      | Everywhere       | Plain cause and retry                                                |

## Required states

Every data screen handles all of these. Reviewers should check.

| State     | Behavior                                                                             |
| --------- | ------------------------------------------------------------------------------------ |
| Loading   | Skeleton of the final layout. Spinner only for actions under a few seconds           |
| Empty     | Explain and offer the next step: "No project requests yet. Post your first project." |
| Error     | Plain words and Retry. Keep what the user typed                                      |
| Offline   | Banner; show cached data; disable sending                                            |
| Partial   | Lists show loaded items and a retry row                                              |
| Forbidden | Explain and offer the fix, such as "Subscribe to see project requests"               |
| Pending   | Button shows progress and is disabled, preventing a double tap                       |

## Forms

- Validate with the same Zod schema as the API. Show errors on blur and submit, and map API `fields` onto inputs.
- Move focus to the first error and announce it.
- Use correct keyboard types: phone, number, email.
- Save long forms as drafts; warn before discarding.
- Do not clear input after an error.

## Touch

Targets at least 48 by 48 (`minTouchTarget`). WCAG 2.2 AA minimum is 24 px; 48 is this project's stricter rule.
