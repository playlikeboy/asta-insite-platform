# Design System

**Status:** Tokens Implemented in `packages/design-tokens`, `apps/web/src/app/globals.css` and `apps/mobile/global.css`. Admin shell Implemented. **No Figma file exists and no design is client-approved (D-21).** Screens beyond the shell are Planned.

## How it fits together

```
packages/design-tokens  (values, tested for contrast)
  -> apps/web     Tailwind v4 + shadcn/ui
  -> apps/mobile  Uniwind (Tailwind v4) + HeroUI Native
```

No shared UI component package exists, because web and native primitives differ ([ADR-016](../architecture/ARCHITECTURE_DECISIONS.md#adr-016-packages-created-only-when-used)). Shared: tokens only.

## Documents

| Topic                 | Document                                |
| --------------------- | --------------------------------------- |
| Visual identity       | [Brand guidelines](BRAND_GUIDELINES.md) |
| Color                 | [Color tokens](COLOR_TOKENS.md)         |
| Type                  | [Typography](TYPOGRAPHY.md)             |
| Components and states | [Components](COMPONENTS.md)             |
| App screens           | [Mobile screens](MOBILE_SCREENS.md)     |
| Dashboard screens     | [Admin screens](ADMIN_SCREENS.md)       |
| Inclusive design      | [Accessibility](ACCESSIBILITY.md)       |

## Spacing

4 px base scale: 4, 8, 12, 16, 24, 32, 48, 64. Mobile screen gutter 16 to 20. Cards pad 16 to 24.

## Radius

Cards 16 px. Buttons and inputs 10 px. Values in `radius` token. The blueprint's range: cards 12 to 16, medium-rounded buttons.

## Elevation

Mostly flat. Separate with a 1 px `gray300` border or a change of background. Use soft shadow only on overlays such as sheets and menus.

## Motion

Short and purposeful: 150 to 250 ms. No decorative animation. Respect reduced motion settings.

## Icons

Lucide on both platforms: `lucide-react` on web, `lucide-react-native` on mobile. 20 to 24 px. Icon-only buttons need an accessible label.

## Process before UI is built

The blueprint's process, not yet started:

1. Figma project `Asta Insite — Product Design`.
2. Sitemap, then low-fidelity wireframes.
3. Foundations: color, type, spacing, components.
4. High-fidelity screens, reusing components.
5. Clickable prototype.
6. Client approval (D-21).

Developers should not invent final UI for approved screens. Until approval, build from these documents and treat visuals as changeable.
