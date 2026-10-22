# TODO

This file is the living roadmap for the project.

Keep entries specific, actionable, and current.

## Features

- [ ] Decide on `www.whiskerandwrench.com` and the extra domains as redirects to the apex.
- [ ] "For shelters" page: how to request a build, sliding scale, fundraising kit.
- [ ] Turn the Plan 001 guide renderer into a reusable template so new plans are mostly data (see ROADMAP).

## Technical Debt

- [ ] `demo.html` is still the constitution placeholder. Either make it a self-contained demo of the guide stepper or point it at the live site per the constitution's Demo Page rule.
- [ ] `.constitution-bootstrap/` holds the bootstrap report and merge templates. Delete once Eric is happy the merges are done.
- [ ] The first three commits predate the Conventional Commits rule. Leave as is (rewriting pushed history isn't worth it).
- [ ] CSP allows `'unsafe-inline'` for scripts and styles because the guide uses inline script and style attributes. Move them to files and tighten the CSP.

## Refactoring

- [ ] Shared header and footer are copied into each page in `site/`. If pages grow past a handful, add a tiny include step to `scripts/build-site.sh`.

## Testing

- [ ] GAP-001: no automated visual or stepper-JS test for the Plan 001 guide. Consider a Playwright smoke test that clicks through every step.
- [ ] GAP-002: no automated accessibility check (contrast, keyboard). Consider pa11y or axe in CI.

## Documentation

- [ ] Fill in `docs/SETUP.md`, `docs/COMMAND_REFERENCE.md` and `docs/TROUBLESHOOTING.md` from the README (still constitution placeholders).

## Nice-to-Have

- [ ] Cloudflare Web Analytics (cookie-free) once there's traffic.
- [ ] Open Graph image for link previews.
