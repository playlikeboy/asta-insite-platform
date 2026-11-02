# Color Tokens

**Implemented.** Source: `packages/design-tokens/src/index.ts`, mirrored in `src/tokens.css`. A test fails if they drift.

| Token           | Value     | Use                                                    |
| --------------- | --------- | ------------------------------------------------------ |
| `navy`          | `#182B3B` | Primary text, headers, admin sidebar                   |
| `ivory`         | `#F5F2EA` | App background                                         |
| `white`         | `#FFFFFF` | Cards, inputs                                          |
| `terracotta500` | `#B87555` | Brand accent: decorative fills, large text, UI borders |
| `terracotta700` | `#8F5338` | Primary buttons, links, small accent text              |
| `sage500`       | `#6D8272` | Decorative, icons                                      |
| `sage700`       | `#4F6354` | Success text, verified badge                           |
| `gray100`       | `#ECEAE4` | Subtle fills, hover, skeletons                         |
| `gray300`       | `#CFCCC4` | Decorative borders, dividers                           |
| `gray500`       | `#6F6E69` | Secondary text                                         |
| `gray700`       | `#45443F` | Body text on white                                     |
| `critical`      | `#A4312A` | Errors, destructive actions                            |

## Contrast (WCAG 2.2)

AA needs 4.5:1 for body text, 3:1 for large text and UI parts. Computed from the token values; key pairs are enforced by `packages/design-tokens/src/tokens.test.ts`.

| Pair                    | Ratio | Use for                                                              |
| ----------------------- | ----- | -------------------------------------------------------------------- |
| Navy on ivory           | 12.97 | All text                                                             |
| Navy on white           | 14.51 | All text                                                             |
| Gray 700 on white       | 9.76  | All text                                                             |
| Gray 700 on ivory       | 8.72  | All text                                                             |
| White on terracotta 700 | 6.07  | Buttons                                                              |
| Terracotta 700 on ivory | 5.42  | Links, text                                                          |
| White on sage 700       | 6.47  | Badges                                                               |
| Sage 700 on ivory       | 5.78  | Text                                                                 |
| Critical on ivory       | 6.15  | Error text                                                           |
| Gray 500 on white       | 5.11  | Secondary text                                                       |
| Gray 500 on ivory       | 4.57  | Secondary text, barely passes; never reduce                          |
| Terracotta 500 on white | 3.68  | **Large text and UI only**                                           |
| Sage 500 on ivory       | 3.69  | **Large text and UI only**                                           |
| Terracotta 500 on ivory | 3.29  | **Large text and UI only**                                           |
| Gray 300 on white       | 1.60  | **Decorative only.** Inputs need a stronger border, such as gray 500 |

## Rules

- Do not use raw hex values in components. Use Tailwind classes, and import tokens only where a class cannot reach.
- Do not rely on color alone. Pair status colors with an icon or word.
- New color: add to `index.ts` and `tokens.css`, add a contrast test, update this table.

## Status mapping

| Status                    | Color                |
| ------------------------- | -------------------- |
| Approved, active, success | Sage 700             |
| Pending                   | Gray 700 on gray 100 |
| Rejected, failed, expired | Critical             |
| Featured, highlight       | Terracotta 700       |

Dark theme is not planned (Assumption A-10).
