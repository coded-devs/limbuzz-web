# Inside LIMBUZZ gallery

The homepage gallery sits after How It Works and before the existing editorial artwork. It presents four illustrative views: emergency activity and recovery, an Android foreground notification, the owner's supplied emergency SMS artwork, and the owner's supplied messages-list artwork showing example alerts to several contacts. These are **concept previews**, not verified unedited app or OS captures.

Assets used from `LIMBUZZ_showcase_concept_assets.zip`:

- `public/illustrations/limbuzz-emergency-view-concept.webp` (941 × 1672, 93,784 bytes)
- `public/illustrations/limbuzz-notification-concept.webp` (941 × 1672, 66,492 bytes)
- `public/illustrations/limbuzz-sms-concept-user.png` (unchanged copy of the owner's attached SMS image)
- `public/illustrations/limbuzz-multiple-sms-concept-user.png` (unchanged copy of the owner's attached messages-list image)

The two owner-supplied images contain example "Delivered" marks, personal-style contact labels, third-party messaging branding, and a profile photo. The gallery identifies them as illustrative artwork, labels delivery unverified on both visuals, and states that the marks do not confirm actual arrival. They are **not evidence of SMS delivery** and need privacy, rights, and factual review before public launch. The fourth slide's copy accurately says that LIMBUZZ attempts an SMS to each saved emergency contact. The approved illustrated journey and Made for Real Life section remain.

The gallery uses one small client component and CSS scroll snap. The wide product panel gives the image most of the space, with the caption beside it on desktop and above it on mobile. Four labeled position buttons allow direct selection; mobile supports native horizontal swipe, desktop supports drag, and keyboard users can use the buttons or Arrow Left/Right on the gallery region. The full-screen image view uses a native dialog with a close button and Escape support. Slides advance every two seconds while visible. The cycle stops when a visitor selects a view, swipes, drags, or opens an image; it pauses on hover, focus, or a hidden tab. The requested play/pause button was removed. `prefers-reduced-motion` disables automatic advancing and makes button-initiated scrolling instant. Images use `next/image` and intrinsic dimensions to reserve space. No animation or carousel library was added.

Formatting, ESLint, TypeScript, all seven existing tests, and the production build passed. `scripts/verify-showcase.mjs` checks the production preview in headless Chrome at 1440, 768, 390, and 320px: image loading, no horizontal overflow or clipping, direct selection, swipe, desktop drag, keyboard navigation, two-second advancing, interaction stop, reduced motion, image expansion and Escape, and the disabled APK gate. Results are in `showcase/checks.json`. Browser screenshots include `inside-1440.jpg`, `inside-768.jpg`, `inside-390.jpg`, `inside-320.jpg`, `sms-1440.jpg`, `sms-390.jpg`, `contacts-1440.jpg`, `contacts-390.jpg`, and `contacts-expanded-390.jpg`.

The remaining launch blockers are owner review of the concept images, authentic app captures if the gallery is to claim real UI, verified release-signed APK and physical-device checks for any public download, final support/legal details, domain and hosting approval, and explicit publishing authorization.
