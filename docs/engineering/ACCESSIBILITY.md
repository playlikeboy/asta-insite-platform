# Accessibility (Engineering)

Design rules: [Design accessibility](../design/ACCESSIBILITY.md). Implemented: contrast tests on tokens; shadcn/Radix keyboard and ARIA behavior; `minTouchTarget` token.

## Web

- Semantic HTML, one `h1`, landmarks, labels tied to inputs.
- Keyboard: all actions reachable, visible focus, focus trapped in dialogs and returned after.
- Tables use real `th` and `scope`.
- Add `@axe-core/playwright` to E2E when the first real admin page ships at M9.

## React Native

```tsx
<Pressable
  accessibilityRole="button"
  accessibilityLabel="Save project"
  accessibilityState={{ disabled }}
  hitSlop={8}
/>
```

- Label icon buttons and images. Mark decorative items hidden.
- Set `accessibilityRole` for headers, buttons, links and tabs.
- Announce results with `AccessibilityInfo.announceForAccessibility`, for example on form errors.
- Use `textContentType="oneTimeCode"` and `autoComplete="sms-otp"` for OTP.
- Check `useReducedMotion`. Do not disable font scaling.

## Definition of done for a screen

- [ ] VoiceOver and TalkBack read it in order, with useful labels
- [ ] 200% text scale doesn't clip
- [ ] Targets at least 48
- [ ] Errors announced
- [ ] Keyboard usable (web)
- [ ] Automated checks pass (web)

**Not yet done:** no screen-reader test has been run. There are no real screens to test.
