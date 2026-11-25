# LIMBUZZ website

Work only in this standalone website. The mobile repository is read-only reference material. Keep work local: no commits, pushes, worktrees, Android builds, CI configuration, or deployment without an explicit user request.

Before changing visual identity, read `../kit/references/LIMBUZZ_Brand_Guide.pdf`. Website colors and type follow that guide; mobile docs govern product behavior. Keep the official logo from `public/brand/`. Identify diagrams as illustrations and use only genuine app captures as screenshots.

Keep product copy honest: hold SOS 3 seconds, SMS dispatch before the primary call, conditional location, local audio, cellular service required. Never promise delivery, rescue, or safety. Use server components unless interaction needs a client boundary. Design at 360px and 1440px with keyboard focus and reduced motion.

For release changes, read `docs/LAUNCH_CHECKLIST.md` and `src/config/release.ts`. Leave public availability gated until owner verification is complete. Legal drafts remain marked pending review. Do not invent release details or contact information.

Before handoff run the quality scripts in package.json and inspect desktop/mobile layouts when browser tools are available. Report observed evidence and unresolved launch requirements separately.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
