# Local verification

Latest interactive gallery results and screenshots: see [SHOWCASE.md](SHOWCASE.md). Content consolidation is recorded in [CONTENT_POLISH.md](CONTENT_POLISH.md), and earlier visual/motion evidence in [REFINEMENT.md](REFINEMENT.md). The suite has 7 passing tests, including reduced-motion policy and cleanup. The initial-build record below is retained as historical evidence.

Verified on 23 November 2026. No deployment, Git mutations, mobile changes, or Android build was performed.

## Automated checks

| Check                          | Result                                                       |
| ------------------------------ | ------------------------------------------------------------ |
| pnpm install --frozen-lockfile | Passed after explicitly allowing esbuild/sharp build scripts |
| pnpm format:check              | Passed                                                       |
| pnpm lint                      | Passed, zero errors/warnings                                 |
| pnpm typecheck                 | Passed                                                       |
| pnpm test                      | 4 tests passed, 0 failed                                     |
| pnpm build                     | Passed, all routes statically prerendered                    |

The first build caught a nullable site-origin type in the sitemap callback; it was corrected. The first lint found an anonymous PostCSS export warning; it was corrected. Formatting was applied after final CSS changes.

## User flow

Story: a visitor learns how LIMBUZZ works, follows the Android release action, and sees the centralized release status and install guide without receiving an unverified APK.

- Browser navigation to `/download` confirmed its own title, H1, and canonical URL.
- Download button disabled, no `.apk` anchor in the shipped page.
- Tests exercise a complete release fixture plus debug/unverified signing, missing metadata, invalid checksums, non-integer sizes, private GitHub, credentials, query-based temporary links, loopback/IP, and insecure URLs. Tests do not fetch or verify an actual APK.
- HTTP 200: `/`, `/download`, `/privacy`, `/terms`, `/releases`, `/support`, `/robots.txt`, `/sitemap.xml`, `/opengraph-image.png`, and `/brand/icon.png`.
- Unknown route returns HTTP 404.
- With SITE_URL unset, robots disallows all crawling and sitemap has no entries. Legal drafts remain explicitly pending review and noindex.

## Browser and accessibility review

Chrome viewport inspection: 360×800, 390×844, 768×1024, 1440×1000. No horizontal overflow at these widths. Reviewed desktop full page and mobile hero/FAQ/download layouts. Official icons loaded successfully. Native FAQ disclosure opens the answer. Mobile navigation opens, Escape closes it and returns focus to its trigger.

Reviewed source against Web Interface Guidelines: semantic main/header/footer/navigation, skip link, one H1 per page, native buttons and details controls, accessible menu state, image alt treatment, visible keyboard focus, and reduced-motion CSS. Body copy uses dark muted text on light surfaces; CTA blue uses navy text. Primary contrast ratios are approximately 9.6:1 (blue-gray on navy), 5.6:1 (navy on blue), and 6.6:1 (muted on soft white).

The user's Chrome extension injects `cz-shortcut-listen="true"` into body before hydration, causing a development warning. The mismatch names that extra attribute; no broad hydration-warning suppression was added. Production browsing was also inspected. This is not a clean-profile browser or automated WCAG/Lighthouse certification. Physical Android app behavior is outside this website task.

Screenshots in `docs/screenshots/` are website QA captures, not mobile application screenshots. Public launch dependencies remain in LAUNCH_CHECKLIST.md.
