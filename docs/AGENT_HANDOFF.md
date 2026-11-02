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

### Session: 2026-11-01 (Claude Code, Cloudflare Web Analytics in the CSP)
- **Accomplishments**: Allowed Cloudflare Web Analytics in all three CSP rules (`static.cloudflareinsights.com` script, `cloudflareinsights.com` connect), PR #17, after the strict CSP from PR #14 blocked the beacon Pages injects. Also merged Dependabot's constitution bump (#16). Earlier this batch: strict CSP, the `/demo` page, the Open Graph image and tags, and real setup/command/troubleshooting docs (PRs #14 and #15).
- **Verification Run**: `bash scripts/test-site.sh` passes (20 of 20 browser tests). Live home page and `/demo` checked in a browser after the deploy: no console errors; `curl -I` shows the new `script-src`.
- **Known Blockers**: none. Contact email (hello@) still waits on Eric's Cloudflare Email Routing setup.
- **Context Hints**: `site/_headers` has three CSP blocks (`/*`, `/demo.html`, `/demo`); change all three together. The share image is `site/assets/og.png`; re-render it with Playwright if the tagline or mascot changes. `.constitution-bootstrap/` is still in the repo; deleting it needs Eric's OK.

#### Next Steps

**Human action required:** steps 1, 2, 3.

1. [ ] **HUMAN**: Check a link preview of https://whiskerandwrench.com (for example at https://www.opengraph.xyz/) shows the mascot card
   - **Why a human:** link-preview crawlers can't be run from CI.
   - **Done when:** the card shows the cat badge and "Better beds. Better tools."
2. [ ] **HUMAN**: Set up Cloudflare Email Routing for hello@whiskerandwrench.com
   - **Why a human:** it verifies Eric's Gmail and adds DNS records in his zone.
   - **Done when:** Email Routing shows `hello@whiskerandwrench.com` as active.
3. [ ] **HUMAN**: Decide whether `.constitution-bootstrap/` can be deleted
   - **Why a human:** Eric asked to be consulted before any file deletion.
   - **Done when:** Eric has said yes or no.
4. [ ] **AGENT**: Delete `.constitution-bootstrap/` on a yes, and swap hello@ into `/shelters/#contact` once email is live.
5. [ ] **AUTOMATED**: Every push to `main` deploys the site; Web Analytics collects in the Cloudflare dashboard.
