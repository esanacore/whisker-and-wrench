# Agent Handoff

This document helps transition work between different AI agent sessions or different agents.

**Before starting your session**, check `docs/SESSION_PLAN.md` for the previous agent's planned work and resumption notes, and `docs/MEMORY.md` to load durable codebase learnings and user preferences. The session plan captures *intent before work*; this handoff captures *state after work*.

## How to Handoff

When you are finishing a task or session, record the state here or in a dedicated `HANDOFF.md` file:

1. **Current Status**: What was achieved?
2. **Next Steps**: The Next Steps procedure from the end of your last push (see the constitution's `AI_WORKFLOW.md`, "Next Steps Procedure"): a numbered checklist in the order things should happen, every step tagged `HUMAN`, `AGENT`, or `AUTOMATED`, and every step only a person can do — hardware, credentials, UI-only settings, approvals — called out up front and described well enough to follow cold.
3. **Known Blockers**: What issues were encountered?
4. **Context Hints**: Are there specific files or discussions the next agent should read?

Replace the entry below at the end of every push; only the latest handoff is
kept. `constitution/scripts/check_next_steps.sh` checks the procedure's
format.

## Latest Handoff

### Session: 2026-10-30 (Claude Code, batch: strict CSP, demo page, share image, docs)
- **Accomplishments**: Merged Dependabot PRs #12 (constitution) and #13 (html-validate 11.17.0). Moved the Plan 001 guide's inline CSS and JS into `guide.css` and `guide.js` and dropped `'unsafe-inline'` from the CSP; a smoke check now fails on any inline script or style. Replaced the placeholder `demo.html` with a real self-contained demo (served at `/demo.html`, in the browser tests). Added an Open Graph image (`site/assets/og.png`) and `og:`/Twitter tags on every page. Wrote real `docs/SETUP.md`, `docs/COMMAND_REFERENCE.md` and `docs/TROUBLESHOOTING.md`. Renumbered the stepper requirement to FR-006 (it collided with FR-005) and added FR-007 for the demo.
- **Verification Run**: `bash scripts/test-site.sh` passes (6 pages valid, 0 broken links, all smoke checks, 20 of 20 browser tests). Served `dist/` locally with the exact `_headers` CSP and checked in a browser: the guide renders and steps with no console errors, and the demo stepper works under its own rule.
- **Known Blockers**: none. Contact email (hello@) is still waiting on Eric's Cloudflare Email Routing setup.
- **Context Hints**: `demo.html` is the only page allowed inline code (its own `/demo.html` rule in `site/_headers`). To re-render the share image, screenshot a 1200×630 HTML template with Playwright (the template isn't in the repo; see the TODO entry). `.constitution-bootstrap/` is still there; deleting files needs Eric's OK.

#### Next Steps

**Human action required:** steps 1, 2, 3.

1. [ ] **HUMAN**: Review and merge the PR
   - **Why a human:** it changes the site's security headers and adds a public page.
   - **Done when:** the PR is merged and the `Site` run on `main` is green.
2. [ ] **HUMAN**: After the deploy, paste https://whiskerandwrench.com into a social post preview (or https://www.opengraph.xyz/) and check the card shows the mascot image
   - **Why a human:** link-preview crawlers can't be run from CI.
   - **Done when:** the preview shows the cat badge and "Better beds. Better tools."
3. [ ] **HUMAN**: Set up Cloudflare Email Routing for hello@whiskerandwrench.com
   - **Why a human:** it verifies Eric's Gmail and adds DNS records in his zone.
   - **Done when:** Email Routing shows `hello@whiskerandwrench.com` as active.
4. [ ] **AGENT**: Once Eric OKs it, delete `.constitution-bootstrap/`.
5. [ ] **AUTOMATED**: Every push to `main` deploys to whiskerandwrench.com.
