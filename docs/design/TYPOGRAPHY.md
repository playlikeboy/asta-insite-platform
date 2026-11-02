# Typography

**Font:** Manrope, chosen from the blueprint's "Manrope or Inter". **Implemented** on web via `next/font` in `apps/web/src/app/layout.tsx`. **Planned** on mobile: bundle with `expo-font`. It is a free Google font, licensed under the SIL Open Font License.

## Scale

Sizes in px. Mobile uses density-independent points. Proposed.

| Style      | Size / line height | Weight | Use                          |
| ---------- | ------------------ | ------ | ---------------------------- |
| Display    | 32 / 40            | 700    | Hero headings                |
| H1         | 28 / 36            | 700    | Screen titles                |
| H2         | 22 / 30            | 600    | Sections                     |
| H3         | 18 / 26            | 600    | Card titles                  |
| Body       | 16 / 24            | 400    | Default text                 |
| Body small | 14 / 20            | 400    | Secondary text; admin tables |
| Caption    | 12 / 16            | 500    | Labels, timestamps           |

## Rules

- 16 is the mobile body size. Never go below 12.
- Support Dynamic Type and Android font scaling up to 200%. Do not set fixed heights on text containers.
- Sentence case. Avoid all caps, apart from short tags.
- Line length 45 to 75 characters on wide screens.
- Use tabular numerals for money and tables in admin.
- Money: Indian formatting with `Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' })`, for example ₹1,25,000.
- Dates: `2 Nov 2026`, in IST on display, UTC in storage.

## Loading

Web: `next/font` self-hosts the font and prevents layout shift. Mobile: hold the splash screen until fonts load.
