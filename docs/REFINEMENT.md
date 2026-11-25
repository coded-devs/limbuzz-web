# LIMBUZZ visual storytelling and motion refinement

23 November 2026. Focused changes to the existing site; the headline, official logo, brand palette, fonts, routes, SEO, draft legal pages and release configuration are preserved.

## Design changes

- **Hero:** retained the labeled communication diagram because no authentic app screenshot exists in the mobile source. Reduced mobile padding, tightened action spacing and limited the radar illustration to 300px. At a 390px viewport the hero decreased from approximately 1038px to 938px. Text and service requirements remain readable; there is no interactive SOS control.
- **How it works:** replaced the plain three-column text sequence with matching vector diagrams for trusted contacts, required/optional permissions and the static 3-second hold reference. A light dotted route connects the stages on desktop. They stack on mobile. The illustrations are visibly labeled as diagrams, not app screens or interactive controls. “What happens after the hold?” remains intact.
- **Visual rhythm:** replaced a repeated introductory paragraph with a compact SMS/call/conditional-location strip. Reduced the screenshot placeholder and replaced its repeated benefit list with a short outcome/history explanation. The privacy section now pairs a navy local-recording diagram with the cellular-service and emergency-service limitations. The waveform is static, not a recording indicator.
- The illustrated setup journey makes the overall mobile page longer despite the shorter hero. The additional space explains the three preparation stages rather than repeating the same text lists.

## Assets and product facts

Rechecked `onerandomd3v/limbuzz` on `dev`, revision `47e52a13f27e2d8a4a13f139b4fec99c82a39743`, through read-only GitHub access. Read the mobile README and architecture documentation. Its image tree still contains launcher/brand icons only, with no verified app screenshots.

Added original code-native graphics in `src/components/journey-graphic.tsx`: a contact-circle diagram, permission grouping, static SOS hold reference, and local-audio diagram. These use the existing outline icon language and brand colors. No human-character artwork, fabricated names, production UI captures, testimonials or statistics were introduced. The imagegen skill was reviewed; its guidance favors SVG/HTML for these simple repo-native diagrams, so no bitmap generation or new asset dependency was needed.

Preserved the actual product rules: hold for 3 seconds; release early to abort; device-originated SMS starts before the primary call; cellular service is necessary; location depends on a current fix; recording is local and permission dependent; attempts do not guarantee delivery, answered calls, response or safety.

## Motion

`src/components/motion-enhancements.tsx` is a small client enhancement mounted only on the home page. Content and graphics remain server rendered.

- IntersectionObserver starts a **single 300ms** opacity/12px translation reveal for selected below-fold groups. Already visible hero content is not revealed again.
- Buttons use **150ms** feedback. Connector routes, radar, SOS and audio waveform stay static. No continuous motion, flash, carousel, parallax or animation dependency was added.
- Content is visible by default. JavaScript or API failure does not hide it or reserve later-arriving layout space.
- `prefers-reduced-motion: reduce` skips reveals. Switching the preference while a reveal runs cancels it immediately. Cleanup disconnects the observer and cancels active motion on route departure. Existing CSS also removes transitions and smooth scrolling for reduced motion.
- Three tests execute the actual motion effect with browser boundaries supplied by a harness: initially reduced preference, preference change while animating, and cleanup. This tests the policy and cancellation behavior; it is not an OS-level browser emulation test. The browser inspection interface exposed viewport control but no media-preference override.

## Verification

| Check                         | Result                                                                                                         |
| ----------------------------- | -------------------------------------------------------------------------------------------------------------- |
| Formatting                    | Passed                                                                                                         |
| ESLint                        | Passed after renaming a test harness variable reserved by the Next.js lint rule                                |
| TypeScript                    | Passed                                                                                                         |
| Tests                         | 7 passed: 4 release-gate tests and 3 motion tests                                                              |
| Production build              | Passed; existing routes statically prerendered                                                                 |
| Responsive browser inspection | 1440, 768, 390 and 320px; no document overflow or clipping in journey/permission/radar labels                  |
| Navigation                    | Mobile menu opening, Escape/focus return, release-status navigation and skip-link focus passed                 |
| Assets and release state      | Brand images loaded; no APK links; download remains disabled on home and /download                             |
| Route smoke checks            | Home, download, privacy, terms, releases, support, robots and sitemap returned 200; unknown route returned 404 |
| Production browser console    | No errors or warnings observed in the inspection session                                                       |

Illustration heights are reserved in CSS and logo dimensions are explicit. No visible loading shift was observed. This is not a measured CLS or Lighthouse certification. No new runtime packages, external image requests, analytics or APIs were introduced. Physical-device, real OS reduced-motion and throttled-network checks remain part of launch validation.

## Before and after evidence

All files below are website QA captures, not app screenshots. They are in `docs/refinement/`.

- `journey-comparison.jpg`: before/after How It Works.
- `hero-mobile-comparison.jpg`: before/after 390px hero.
- `after-full-1440.jpg` and `after-full-390.jpg`: complete refined pages.
- `after-hero-1440.jpg` and `after-hero-390.jpg`: focused hero views.
- `after-journey-1440.jpg`, `after-journey-390.jpg`, `after-journey-768.jpg`: focused setup journey.
- `after-privacy-1440.jpg` and `after-privacy-390.jpg`: the alternating local-recording story.
- `browser-checks.json`: measured viewport/overflow/asset/release checks.

Complete pages are assembled from overlapping viewport captures because this browser's direct tall-page capture can time out. Raw frames and manifests are retained. Sticky-header duplicates are excluded; small stitch/scrollbar seams can appear. Browser screenshot exports can exclude scrollbars or scale content, so raster width differs from the requested CSS viewport. Before captures come from the preceding audited implementation.

## Remaining launch blockers

Owner-approved real Android screenshots, a verified release-signed APK and metadata, final HTTPS domain, legal approval and support contact are still required. Public APK availability remains disabled. No Android code, Git branches/worktrees, pushes, publishing or deployment were part of this refinement. The local server is left running for review at http://127.0.0.1:3000.

Skills applied: frontend-design, vercel-react-best-practices, web-design-guidelines, verification, and PDF reading guidance; imagegen asset guidance reviewed for the code-native vector decision. Browser verification used the installed cua_repl interface. No separate named UI-design or browser-testing skill was assumed.
