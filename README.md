# LIMBUZZ web

Standalone local Next.js App Router website for the Android-first personal safety app. No mobile application files were modified. Nothing is deployed or published.

## Run locally

Requires Node 20.9+ and pnpm 11.18.0 (validated on Node 24).

```powershell
pnpm install --frozen-lockfile
pnpm dev
```

Open http://127.0.0.1:3000. For a production preview, run `pnpm build`, then `pnpm start`.

```powershell
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```

The package install permits only esbuild and sharp build scripts. Fonts use `next/font/google`: the first build needs network access to Google Fonts; visitors receive self-hosted optimized fonts, with no Google Fonts request. A network-restricted build should use licensed, locally stored Space Grotesk and Inter files with `next/font/local`.

## Architecture

```text
src/
  app/             Routes, metadata, sitemap, robots, brand CSS tokens
    download/      Public availability + installation guide
    privacy/       Draft, pending legal review
    terms/         Draft, pending legal review
    releases/      Notes derived from release config
    support/       Explicitly pending verified support contact
  components/      Landing sections, release panel, navigation, footer
  config/          Central typed release gate and site origin
  content/         Verified features, setup steps, FAQs
public/brand/      Official mobile icon + favicon
tests/             Release availability and URL guard tests
docs/              Source provenance, launch checklist, validation evidence
```

The header and the small home-page motion enhancer are application client boundaries. Page content and SVG illustrations render on the server; FAQs use native details/summary. The site has static routes and no database, authentication, analytics, forms, or external APIs. Reveals use IntersectionObserver and the Web Animations API, skip reduced-motion preferences, and leave content visible without JavaScript. See `docs/REFINEMENT.md` for the visual comparison and latest checks.

## Brand and assets

The supplied brand PDF governs website identity. Space Grotesk headings, Inter UI/body, and all brand colors are centralized in CSS. Emergency Blue buttons use navy text for contrast. Blue-gray text appears only on navy. Red is confined to the illustrative SOS control.

See `docs/SOURCES.md` for the inspected read-only repository revision and asset provenance. No unedited app screenshots exist in the inspected tree. The hero is an explicitly labeled communication diagram. The Inside LIMBUZZ gallery uses supplied illustrative concepts and two owner-supplied messaging concept images; see `docs/SHOWCASE.md` for their provenance and verification. Made for Real Life uses labeled editorial artwork in `src/components/product-artwork.tsx`; see `docs/ARTWORK.md` for its provenance and prompts. To use real captures later, add approved, sanitized images under `public/screenshots/` with actual dimensions, useful alt text, and visible captions. Never expose real contact numbers or location from a tester.

## Configure a verified public APK

The debug-signed `LIMBUZZ-v1.0.1.apk` is not included in this repository. For local evaluation only, `pnpm dev` on `127.0.0.1` shows a separate internal test download on `/download` when the exact artifact is placed one directory above the project. The file stays outside `public/`; its size and SHA-256 are checked before each download. Production builds omit that link and return 404 from the internal route. See `docs/INTERNAL_APK.md` for the inspection evidence and limits.

`src/config/release.ts` is the single source for availability, version/build, Android/ABI requirements, bytes, SHA-256, publication date, and notes. Its empty default deliberately disables download. `/download` remains a helpful landing page and presents a direct APK link only if `isPublicRelease` passes. It does not redirect automatically.

1. Complete the verified-APK portion of `docs/LAUNCH_CHECKLIST.md`.
2. Replace the empty config with owner-verified values from the signed artifact. Set `signing: "release"` and `verified: true` only after actual signature, checksum, hosting, and device checks.
3. Use a stable public HTTPS `.apk` URL on an approved download host, without credentials, query strings, or expiry. GitHub URLs are deliberately rejected to prevent linking the private internal release; if distribution policy changes, review the gate and tests together.
4. Run all checks and smoke-test both unavailable and available paths. Tests use a non-resolving `.test` URL fixture and do not download an APK.

Configuration shape (template only; these values intentionally cannot enable a download):

```ts
const template: Release = {
  verified: false,
  signing: "unverified",
  publicUrl: null, // stable approved public HTTPS .apk URL
  version: null,
  versionCode: null,
  android: null,
  abis: [],
  bytes: null,
  sha256: null,
  publishedAt: null, // YYYY-MM-DD
  notes: [],
};
```

The gate validates configuration; it cannot inspect an APK signature or prove a remote URL is publicly accessible. Owner verification supplies that evidence. Debug-signed internal v1.0.1 is never linked or bundled.

## SEO and launch status

Leave `SITE_URL` unset locally: pages are noindex, robots disallows crawling, and sitemap is empty. Before launch set an owner-approved HTTPS origin as described in `.env.example` and rebuild. This populates canonical and social URLs, robots, and sitemap. Legal drafts stay noindex. The social card uses the actual mobile logo.

Local implementation is complete only after the documented checks pass; public launch additionally requires a verified signed APK for downloads, support contact, legal approval, final domain, and explicit deployment authorization. The current editorial illustrations form a complete presentation; authentic app captures are an optional later addition. See `docs/LAUNCH_CHECKLIST.md` and `docs/CONTENT_POLISH.md`.
