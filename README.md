# LIMBUZZ website

The public-facing website for LIMBUZZ, an Android app that helps people contact someone they trust in an emergency. The site explains how SOS works and shows the current Android release status.

## Run locally

Use Node.js 24 and pnpm 11.18.0. From this directory, run:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open [the local site](http://localhost:3000). No environment variables are required. The first build needs internet access to fetch Inter and Space Grotesk. To preview the production build locally, run `pnpm build`, then `pnpm start`.

## Make changes

- Pages live in `src/app/`, shared UI in `src/components/`, and FAQs in `src/content/site.ts`.
- The official logo and favicon are in `public/brand/`. Product previews in `public/illustrations/` are illustrations.
- Public downloads are gated by `src/config/release.ts`. For local testing, the development server on `localhost` can serve the pinned debug build from `../LIMBUZZ-v1.0.1.apk`. The website runs without it.

## Check your changes

```sh
pnpm format:check
pnpm lint
pnpm typecheck
pnpm test
pnpm build
```
