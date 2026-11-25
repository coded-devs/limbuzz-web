# Source provenance

- Supplied `../kit/CODEX_TASK.md` and all eight pages of `../kit/references/LIMBUZZ_Brand_Guide.pdf` were read before implementation. The PDF was also rendered for visual inspection.
- Read-only mobile source: `onerandomd3v/limbuzz`, `dev`, commit `47e52a13f27e2d8a4a13f139b4fec99c82a39743`.
- Inspected README.md, DESIGN.md, docs/architecture.md, app.json, AGENTS.md, and the complete repository file tree using the authorized GitHub connection. Mobile AGENTS.md describes mobile workflows; it does not govern this separate website or authorize remote changes.
- `public/brand/icon.png` is an unchanged copy of mobile `assets/icon.png`, blob `c2607ca65a7beddacce5e143b83eba20b209bfe0`.
- `public/brand/favicon.png` is an unchanged copy of mobile `assets/favicon.png`, blob `1df7ccfa386496f3241f1beda9eec29d35e3f4a1`.
- The connector cannot download binary image files; the authenticated GitHub CLI retrieved these two assets read-only. No credential is in the website source.
- The inspected tree contains only icon PNGs, with no real app screenshots. No screenshots were fabricated. Original CSS/SVG communication diagram is labeled illustrative.
- Product facts follow the mobile architecture: initial SMS does not wait for a location fix; location can follow separately; calling begins after SMS dispatch; recording stays local; all-clear attempts concern contacts already alerted; session recovery persists through restart. No audio share/delete feature is marketed.
- Icons: Lucide React (ISC license). Fonts: Google Fonts Inter and Space Grotesk (SIL Open Font License), self-hosted at build by Next.js.
- Framework conventions checked against official [Next.js installation](https://nextjs.org/docs/app/getting-started/installation) and [Tailwind Next.js installation](https://tailwindcss.com/docs/installation/framework-guides/nextjs). Accessibility review used [Vercel Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md).
- Skills used: frontend-design, vercel-react-best-practices, web-design-guidelines, sites (local-only workflow and presentation guidance), verification, pdf, writing-for-agents. Computer-use skill read for browser-tool discovery; browser inspection uses the installed cua_repl browser interface.
