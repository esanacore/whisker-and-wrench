# TODO

This file is the living roadmap for the project.

Keep entries specific, actionable, and current.

## Features

- [ ] Decide on `www.whiskerandwrench.com` and the extra domains as redirects to the apex.
- [~] "For shelters" page: drafted in PR #7 with a GitHub-issues contact fallback.
- [ ] Set up hello@whiskerandwrench.com with Cloudflare Email Routing (forwards to Eric's Gmail; adds 3 MX + 1 SPF TXT record, approved 2026-10-26), then swap it into `/shelters/#contact`. Steps in `docs/OPERATIONS.md`.
- [ ] Turn the Plan 001 guide renderer into a reusable template so new plans are mostly data (see ROADMAP).

## Technical Debt

- [x] `demo.html` is a real self-contained demo (simulated 3-step stepper, links to the live guide), served at `/demo.html`.
- [ ] `.constitution-bootstrap/` holds the bootstrap report and merge templates. Delete once Eric is happy the merges are done.
- [ ] The first three commits predate the Conventional Commits rule. Leave as is (rewriting pushed history isn't worth it).
- [x] CSP no longer allows `'unsafe-inline'`. Guide CSS/JS live in `guide.css`/`guide.js`; a smoke check blocks new inline code.

## Refactoring

- [ ] Shared header and footer are copied into each page in `site/`. If pages grow past a handful, add a tiny include step to `scripts/build-site.sh`.

## Testing

- [x] GAP-001: Playwright smoke test clicks through every Plan 001 step and checks 375px layout on every page (`tests/browser/smoke.spec.mjs`).
- [x] GAP-002: axe accessibility checks on every page in CI (`tests/browser/a11y.spec.mjs`). Fixed the one issue it found (Plan 001 had no `<main>`).
- [ ] GAP-003: browser tests are Chromium only and don't catch pixel-level looks. Consider adding WebKit (iPhone Safari) and screenshot comparisons once the design settles.

## Documentation

- [x] Filled in `docs/SETUP.md`, `docs/COMMAND_REFERENCE.md` and `docs/TROUBLESHOOTING.md`.

## Nice-to-Have

- [ ] Cloudflare Web Analytics (cookie-free) once there's traffic.
- [x] Open Graph image for link previews (`site/assets/og.png`, rendered from a small HTML template with Playwright; re-render if the tagline or mascot changes).
