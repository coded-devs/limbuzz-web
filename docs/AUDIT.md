# LIMBUZZ website launch audit

23 November 2026. Scope: the existing local website, official brand guide, product copy, responsive presentation, interactions, accessibility fundamentals, and release availability. The visual direction is coherent and worth retaining. Public launch remains blocked by release, asset, legal, and owner information requirements below.

## Critical launch blockers

| Priority | Finding                                                                                                                                         | Required input or action                                                                                                                                                                                                                                      |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P0       | No verified public release-signed APK. The shipping config is unverified, with no URL or release metadata.                                      | Owner supplies signature verification, physical-device evidence, stable public host, version/build, Android/ABI requirements, bytes, checksum, publication date, and release notes in a separately authorized release task. Public download remains disabled. |
| P0       | Privacy and terms remain explicitly pending legal review; support has no verified contact.                                                      | Approve legal entity, privacy/terms, retention/deletion practices, jurisdiction, and support channel. Keep pending labels until approved.                                                                                                                     |
| P1       | No authentic app screenshots are available in the inspected mobile source. The showcase is an obvious placeholder rather than product evidence. | Supply approved captures of Home, emergency progress, contacts, and history with personal information removed. Replace the placeholder before launch.                                                                                                         |
| P1       | Final public origin is unset. Local canonical/social URLs use localhost, robots disallows indexing, and sitemap is empty.                       | Confirm the owner-approved HTTPS domain and set SITE_URL during an authorized launch task, then rebuild and smoke-test metadata and indexing.                                                                                                                 |

These are public-launch blockers, not broken local frontend behavior. Nothing was deployed, pushed, built for Android, or changed in the mobile app. No download was enabled.

## Significant UX issues fixed

| Priority | Location                                                              | Observed issue                                                                                                                                                                    | Change and verification                                                                                                                                                                                                                                 |
| -------- | --------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P1       | src/components/landing.tsx:26                                         | Hero copy said only “share critical information,” leaving the actual app behavior to the diagram and lower sections. Availability was not stated next to the CTA.                 | Hero now identifies an Android personal safety app, the 3-second SOS hold, SMS alerts and the primary-contact call. A configuration-derived coming-soon message appears beside the action. Cellular requirements remain visible.                        |
| P1       | src/app/download/page.tsx:24 and src/components/landing.tsx:293       | On mobile, visitors read the installation guide before reaching the release status. The landing-page release card began about 785px after its section start.                      | Release panel now comes first in DOM and mobile layout, with installation instructions following. Desktop retains guide-left/status-right layout. The dedicated mobile download page exposes the card at about 441px, before its guide at about 1136px. |
| P1       | src/content/site.ts:9                                                 | “Your people, alerted” could imply a confirmed outcome despite the following delivery caveat.                                                                                     | Changed to “Reach your emergency contacts.” Body copy continues to describe SMS attempts, not guaranteed delivery.                                                                                                                                      |
| P2       | src/components/header.tsx:73                                          | Closed menu referenced an element absent from the DOM. An open menu could reopen when returning from desktop to mobile, and remain expanded after keyboard focus left the header. | Controlled nav now remains present but hidden when closed. It closes on desktop breakpoint changes and focus departure. Tested opening, Escape/focus return, navigation selection, resizing, and hidden-state reference.                                |
| P2       | src/components/release-panel.tsx:32                                   | Release card used H3 despite being a distinct sibling section on the download page.                                                                                               | Uses H2; dedicated download headings now progress H1 → H2 → H3 appropriately.                                                                                                                                                                           |
| P2       | src/app/globals.css:125 and src/components/communication-visual.tsx:6 | Several explanatory/safety notes used small text; screen readers received only a generic illustration label.                                                                      | Supporting notes now use 16px, hero service requirements 14px. Figure label describes the SMS/call/location flow. Touch-action is explicit on buttons and links.                                                                                        |

## Section review

Reviewed the landing page at 1440px desktop, 768px tablet, and 390px mobile. Also checked 320px reflow. No horizontal overflow was observed at these widths.

| Section           | Assessment                                                                                                                                                                                                                                             |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Header/navigation | Official logo, restrained wordmark and clear desktop CTA. Mobile disclosure is keyboard operable. Sticky header leaves anchor content visible.                                                                                                         |
| Hero              | Strong problem-first heading and restrained radar graphic. Revised copy names the product and core action. Blue CTA is correctly a release-status link, not a fake download. Diagram is explicitly illustrative and is not an interactive SOS control. |
| Benefits          | Clear explanation of the communication problem. Whitespace supports scanning rather than introducing decorative cards or unverified statistics.                                                                                                        |
| Features          | Six verified functions. All primary explanations use 16px Inter. At mobile width they become readable single-column rows. Location is conditional; SMS precedes calling; audio is local; recovery and all-clear remain qualified.                      |
| How it works      | Numbering encodes an actual setup sequence. Permissions and 3-second activation are explained. The following paragraph distinguishes attempts from delivery and answered calls.                                                                        |
| App showcase      | Truthful placeholder and no fabricated UI. Visual credibility is limited until real captures arrive. No invented testimonials, ratings, partnerships or adoption numbers.                                                                              |
| Trust/limitations | Clearly distinguishes internet independence from cellular dependence. Explains permission-dependent location/audio, carrier charges, and emergency-service limits.                                                                                     |
| Download/install  | Coming-soon state is unambiguous; no APK anchor and disabled download control. Unknown version, architecture, size and date are labeled unavailable. Installation steps retain Android security checks.                                                |
| FAQ               | All seven entries cover meaningful questions. Native disclosure works with Enter and displays a visible focus outline. Answers preserve delivery, location, carrier and emergency-service caveats.                                                     |
| Footer            | Brand and supporting links work. Emergency-service limitation remains visible. Support/legal placeholders are explicit on their destinations.                                                                                                          |
| Supporting pages  | Privacy, terms, releases and support checked at 390, 768 and 1440px for headings, content and overflow. Legal drafts remain noindex. Dedicated download page reviewed visually and through DOM checks. Missing route returns 404.                      |

## Brand and accessibility findings

- Exact core CSS tokens: Midnight Navy #061A33, Emergency Blue #2196F3, Electric Cyan #38BDF8, Soft White #F8FAFC, Alert Red #FF3B4D. Deep Navy and blue-gray follow the PDF. Red is confined to the SOS illustration.
- Browser computed fonts confirm Space Grotesk headings and Inter body. The original official logo's Git blob hash matches c2607ca65a7beddacce5e143b83eba20b209bfe0; it was not recreated.
- Light sections dominate the full page, navy anchors the hero/footer, and blue/cyan provide restrained accents. Radar rings, location and thin route lines carry the graphic language. Extra contour artwork is optional; the page does not need every motif repeated.
- Main text contrast examples: navy on CTA blue 5.59:1, muted text on soft white 6.63:1, blue-gray on navy 9.64:1. Color is not the sole indicator of release availability.
- Verified skip link receives visible focus and moves focus to main. FAQ keyboard activation, menu Escape/focus return and resize closure passed. DOM checks found one H1, no images missing alt attributes, and no unnamed links/buttons/summary controls on the landing page.
- Reduced-motion CSS disables smooth scrolling and transitions. No autoplay media, looping animation, data-entry forms or modal traps were introduced.

This is a focused manual and source accessibility audit, not a WCAG certification or a screen-reader/device-lab test.

## Loading and interaction review

The site remains statically prerendered. The header is the only application client component; event listeners are scoped and cleaned up. FAQs need no application JavaScript. Optimized fonts and small rendered logo images are served locally, with no analytics, video, animation package, API waterfall or external form service.

Local production HTTP responses completed in 5–357ms in this session, including a first homepage request of 357ms and subsequent document requests of 6–7ms. These are loopback response measurements, not mobile-network or browser-paint benchmarks. Browser Performance API data was not exposed by the available inspection interface, so no LCP, CLS, INP, Lighthouse score or throttled performance pass is claimed. Repeat those measurements on the eventual deployment and real Android hardware.

Chrome's installed extension injects cz-shortcut-listen into body and produces a development hydration warning. The audit retained normal hydration checks and did not suppress that warning across the site.

## Optional polish

| Priority | Opportunity                                                                                                                 | Recommendation                                                                                                                                                                                                              |
| -------- | --------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P3       | The mobile page is approximately 9,000 CSS pixels tall. Several truthful limitations repeat across features, trust and FAQ. | After real screenshots arrive, consider tightening repeated explanatory text while keeping the relevant cellular and safety conditions next to each claim. Do not remove necessary qualifications just to shorten the page. |
| P3       | The screenshot placeholder occupies substantial visual space.                                                               | Replace it with approved real captures, then reassess its height. Avoid further placeholder styling.                                                                                                                        |
| P3       | The first mobile viewport prioritizes the headline, explanation and CTA; the diagram continues below it.                    | Keep this hierarchy. A smaller diagram can be explored later if the real screenshots change the overall rhythm.                                                                                                             |
| P3       | Device testing is currently Chrome on Windows.                                                                              | Before launch, review real Android Chrome, iOS Safari for website compatibility, larger system text and a screen reader. Measure final-host performance under a realistic mobile connection.                                |

## Quality checks

| Check                 | Result                                                                                                                  |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| pnpm lint             | Passed, no errors or warnings                                                                                           |
| pnpm typecheck        | Passed                                                                                                                  |
| pnpm test             | 4 passed, 0 failed; default download gate still closed                                                                  |
| pnpm build            | Passed; routes statically prerendered                                                                                   |
| pnpm format:check     | Passed after formatting audit artifacts                                                                                 |
| Production HTTP smoke | 200 for home, download, privacy, terms, releases, support, robots, sitemap, logo and OG image; 404 for an unknown route |

## Screenshot evidence

Files under docs/audit are website screenshots, not mobile app screenshots:

- desktop-1440.jpg: complete desktop page at a 1440px viewport.
- mobile-390.jpg: full mobile page assembled from overlapping 390px viewport captures; repeated sticky-header regions removed. Raw frames and position manifests are retained because the direct tall-page capture timed out.
- tablet-768.jpg: equivalent full tablet capture from overlapping frames.
- hero-1440.jpg and hero-390.jpg: focused hero views.
- features-1440.jpg, features-390.jpg, showcase-1440.jpg, download-1440.jpg, download-status-390.jpg and faq-1440.jpg: focused sections.
- review-summary.jpg: desktop/mobile hero comparison for quick review.

The browser exports content images with viewport scaling/scrollbar exclusion; raster width can differ from the requested CSS viewport. Overlap stitching may show small seams or scrollbar discontinuities. Responsive checks used the actual browser viewport and document dimensions, not the exported raster width.

Skills used: frontend-design, vercel-react-best-practices, web-design-guidelines, verification, plus write-page guidance for the repository audit report. Browser testing used the installed cua_repl interface; no separate named browser-testing skill was assumed. References: supplied LIMBUZZ brand PDF, local source/AGENTS.md/launch checklist, installed Next.js server/client documentation, and the current [Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md).
