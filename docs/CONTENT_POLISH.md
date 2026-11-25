# Homepage content consolidation

The approved design, illustrations, three-stage journey, official logo, fonts and motion remain in place. This refinement gives each section one purpose and removes development wording from the public page. Authentic Android captures are optional future enhancements, not a blocker for the illustrated website.

## What changed

- `landing.tsx`: shorter product introduction; a problem statement without a second feature list; a concise post-hold sequence; detailed carrier, permission, storage and response limitations grouped in the privacy section. Installation security instructions remain visible.
- `site.ts`: capability descriptions no longer repeat the whole SOS sequence or every limitation. All six capabilities remain, including session recovery and all-clear attempts. All seven FAQs remain; the answers preserve carrier costs, location limits, optional audio, account-free SOS and Android installation safety.
- `product-artwork.tsx`: the person illustration supports a conversation with trusted people. The map explains conditional location follow-up. Removed the promise of future screenshots and retained a discreet “Illustrative overview” label. The component and local image assets remain extensible.
- `release-panel.tsx`: a single availability explanation replaces repeated notices and five empty metadata rows. The disabled button remains. Verified releases still display version/build, compatibility/ABIs, size, publication date and SHA-256. The release configuration and validation function are unchanged.
- `globals.css`: homepage section padding is 80px on desktop and 56px on mobile; the illustrations retain their dimensions. Removed the redundant problem-section icon strip and its styles, one section divider, and obsolete release-caption styles. Footer links have 44px minimum height and a two-column mobile layout. The footer introduction is shorter.
- README, validation index and launch checklist now distinguish optional app captures from genuine launch dependencies.

No dependencies, routes, SEO metadata, legal drafts, Android code or motion logic changed. No APK was built or published; no download was enabled.

## Before and after copy

| Area               | Before                                                                                                                           | After                                                                                                                                         |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| Hero               | “LIMBUZZ is an Android personal safety app. Hold SOS for 3 seconds to start SMS alerts and a call to your primary contact.”      | “An Android personal safety app that helps you alert and call the people you trust.” The branded visual still explains the three-second hold. |
| SMS feature        | “LIMBUZZ attempts an SMS from your phone to each emergency contact. Cellular service is required; delivery is not guaranteed.”   | “Attempts an emergency SMS to each contact you’ve chosen.” Connectivity and delivery limitations remain in the privacy section and FAQs.      |
| Call feature       | “After SMS dispatch begins, LIMBUZZ initiates a call to your primary contact. Whether they answer is outside the app’s control.” | “Starts a call to your chosen primary contact.” Ordering is explained after the setup journey; response limits are grouped below.             |
| Human story        | “Prepare your contacts and permissions ahead of time…”                                                                           | “Choose who you would turn to, before you need help.” Caption: “Let them know what an alert from you would mean.”                             |
| Artwork disclosure | “Verified LIMBUZZ app captures will replace this artwork when available.”                                                        | “Illustrative overview.” No development status remains on the homepage.                                                                       |
| Release panel      | Repeated “coming soon” notices and five metadata rows containing pending values.                                                 | “LIMBUZZ for Android,” a “Coming soon” tag, one verification explanation, a short note about future metadata, and a disabled download button. |

## Measured reduction

These measurements use the same local Chrome viewport height (1000px), loaded fonts and reduced-motion preference before and after. Visible main-content word count excludes collapsed FAQ answers; those answers remain accessible by expanding each question.

| Viewport | Page height before | Page height after |      Reduction |
| -------- | -----------------: | ----------------: | -------------: |
| 1440px   |            6,992px |           6,746px |          246px |
| 768px    |            7,078px |           6,596px |          482px |
| 390px    |           10,458px |           9,577px |   881px (8.4%) |
| 320px    |           11,473px |          10,374px | 1,099px (9.6%) |

Visible homepage text fell from 866 to 726 words, about 16%. Safety limitations were retained, with notification and location-permission context grouped in the privacy section.

## Verification

- Formatting, ESLint, TypeScript and all 7 existing release/motion tests pass.
- Production build passes; all existing routes prerender. An initial Windows log-file lock was resolved by moving the background server logs outside `.next` and rebuilding.
- Local headless Chrome reviewed 1440, 768, 390 and 320px: no horizontal overflow; all images loaded; seven FAQs present; no APK links; download disabled; no public screenshot-development notes.
- Keyboard Enter opens the mobile menu; Escape closes it and restores trigger focus. Selecting How it works updates the anchor and closes the menu. Keyboard Enter opens and closes the native FAQ control.
- Normal-motion content remains visible; reduced-motion emulation leaves zero active animations. Existing tests cover live preference changes and cleanup. No motion was added.
- `/download` retains all three installation steps and its disabled gate. Homepage, download, privacy, terms, releases, support, robots and sitemap return HTTP 200. No browser runtime exceptions were observed.
- Accessibility review used the installed [Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md): captioned illustrations, meaningful alternative text, keyboard controls, visible existing focus styles and unchanged brand contrast. No new guideline defects identified in the edited components.
- No Lighthouse score, physical-device validation, or live SMS/call delivery is claimed.

Browser evidence: [before metrics](polish/before-checks.json), [after metrics](polish/after-checks.json), [interaction checks](polish/interactions.json).

## Screenshots

| View                      | Before                                | After                                                                        |
| ------------------------- | ------------------------------------- | ---------------------------------------------------------------------------- |
| Desktop full page, 1440px | [Before](polish/before-full-1440.jpg) | [After](polish/after-full-1440.jpg)                                          |
| Mobile full page, 390px   | [Before](polish/before-full-390.jpg)  | [After](polish/after-full-390.jpg)                                           |
| Tablet, 768px             | —                                     | [After](polish/after-full-768.jpg)                                           |
| Narrow mobile, 320px      | —                                     | [After](polish/after-full-320.jpg)                                           |
| Illustration story        | —                                     | [Desktop](polish/app-preview-1440.jpg), [mobile](polish/app-preview-390.jpg) |
| Download and installation | —                                     | [Desktop](polish/download-1440.jpg), [mobile](polish/download-390.jpg)       |

## Remaining launch requirements

Public APK downloads still require an owner-verified release-signed artifact, physical Android validation, verified metadata/checksum, and stable approved hosting. Existing internal debug builds remain excluded.

Public website launch still requires the support contact, legal/entity/privacy review, final HTTPS domain and hosting decisions, final product/asset approval, and explicit authorization to publish. Those requirements are tracked in `LAUNCH_CHECKLIST.md`. Missing app screenshots do not block this refinement or the current illustrated presentation.

Skills used: frontend-design (including its content guidance), vercel-react-best-practices, web-design-guidelines and verification. There is no separate installed copywriting skill. Re-read all eight brand-guide pages and the mobile architecture at the pinned source revision recorded in `SOURCES.md`. The GitHub connector required an unavailable link context, so the authenticated GitHub CLI read that document without modifying the repository.

The production-mode preview is running locally at http://127.0.0.1:3000. Logs are in the user's temporary directory outside the build output.
