# Accessibility (Design)

Target: **WCAG 2.2 AA** for admin; the same criteria applied to mobile. Implementation checks: [Engineering accessibility](../engineering/ACCESSIBILITY.md).

| Area           | Rule                                                                                                    |
| -------------- | ------------------------------------------------------------------------------------------------------- |
| Contrast       | Use tested pairs in [Color tokens](COLOR_TOKENS.md). Terracotta 500 and sage 500 are not for small text |
| Color          | Never the only signal                                                                                   |
| Touch          | 48 by 48 minimum, with space between targets                                                            |
| Text scale     | Layouts survive 200%                                                                                    |
| Structure      | Each screen has one title, logical reading order and focus order                                        |
| Names          | Every icon button and image has a label. Portfolio photos get provider captions or a sensible default   |
| Forms          | Visible labels; errors in words, linked to fields                                                       |
| Motion         | Honor reduced motion; nothing flashes                                                                   |
| Time           | OTP resend and session expiry warn and allow more time where possible                                   |
| Video          | Controls; no autoplay with sound                                                                        |
| Language       | Plain language for non-technical users                                                                  |
| Authentication | WCAG 2.2 accessible authentication: allow paste and SMS autofill of OTP; no puzzles                     |
| Dragging       | Reordering media has a non-drag alternative                                                             |

Include real users, including older homeowners, in usability sessions before launch, if the client can arrange them. Not yet planned.
