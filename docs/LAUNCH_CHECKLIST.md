# Launch checklist

## Implemented locally

- [x] Standalone Next.js App Router / TypeScript / Tailwind / pnpm project.
- [x] Official logo, brand tokens, Space Grotesk + Inter, responsive landing page.
- [x] Features, setup, labeled brand illustrations, limitations, FAQ.
- [x] Download landing page and centralized fail-closed release configuration.
- [x] Separate loopback development download for the hash-pinned debug test APK; public release gate remains closed. See INTERNAL_APK.md.
- [x] Privacy/terms drafts, release notes, support placeholder, 404.
- [x] Metadata/social card, origin-dependent sitemap/robots; noindex by default locally.
- [x] Keyboard focus, skip link, native FAQ controls, reduced motion and mobile navigation.
- [x] README, asset provenance, automated release gate tests and quality scripts.
- [x] See VALIDATION.md for actual checks; rerun after changes.

## Optional later app captures

- [ ] When available, add approved Android captures (Home, contacts, permissions/history); remove personal phone numbers, precise locations, and tester data.
- [ ] Review dimensions, captions, and mobile layouts when adding genuine captures. Their absence does not block the current illustrated website.

## Requires verified APK — blocks public downloads

- [ ] In a separately authorized mobile release task, produce a release-signed artifact. Do not use debug-signed internal v1.0.1.
- [ ] Verify package identity and certificate using Android signing tools (`apksigner verify --verbose --print-certs`); compare against the approved release certificate fingerprint and exclude the debug certificate.
- [ ] Owner securely backs up signing identity and establishes stable signing for future updates. Store no private keystore or credentials in this website.
- [ ] Physical Android checks: fresh install and signed update path; contact setup, permission states, hold/release timing, real carrier SMS/call behavior, location unavailable, microphone denied, local audio, history, restart recovery, all-clear. Coordinate tests with consenting contacts.
- [ ] Confirm actual version/versionCode, minimum Android and ABIs from the artifact; measure exact bytes and SHA-256 (`Get-FileHash -Algorithm SHA256`).
- [ ] Publish to a stable public HTTPS host in a separately authorized release task; verify unauthenticated download and correct MIME type/filename without expiring links.
- [ ] Download the hosted bytes and compare checksum; record signature, device, and public-host verification evidence.
- [ ] Populate all release config fields, notes, publication date, signing attestation, then enable owner verification.
- [ ] Smoke-test visible metadata and actual download on desktop and Android. Confirm default unavailable behavior remains covered by tests.

## Requires owner/legal review

- [ ] Approve public product copy against the actual release and physical-device evidence.
- [ ] Confirm support contact; replace the clearly labeled pending support route.
- [ ] Approve privacy/terms, legal entity, contact, jurisdiction, retention/deletion, and hosting log disclosures. Remove pending-review labels only after approval.
- [ ] Confirm asset rights and final social card.
- [ ] Supply final HTTPS SITE_URL; rebuild and verify canonical, OG, sitemap and robots.

## Deployment pending

- [ ] Obtain explicit owner authorization to publish. No deployment or remote mutation is part of this task.
- [ ] Select hosting and review cache/security/log policies; verify production headers and HTTPS.
- [ ] Run quality checks and responsive/browser smoke tests against the final production candidate.
- [ ] Check all routes, anchors, menu, FAQ, 404, metadata, screenshot assets, and Android download on the approved domain.
- [ ] Check indexing rules intentionally change from local noindex; keep unapproved legal drafts noindex.

Android references for the later release task: [publishing](https://developer.android.com/studio/publish), [app signing](https://developer.android.com/studio/publish/app-signing). These are launch steps, not actions executed in this local website task.
