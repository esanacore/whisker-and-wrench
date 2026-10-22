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

### Session: 2026-10-22 (Claude Code, browser and accessibility tests)
- **Accomplishments**: Closed GAP-001 and GAP-002. Added Playwright (`@playwright/test` 1.63.0) and axe (`@axe-core/playwright` 4.13.0) as pinned dev deps, a tiny `scripts/serve-dist.mjs` server, and `tests/browser/` (Plan 001 stepper click-through, 375px no-sideways-scroll on every page, axe WCAG A/AA + best-practice on every page, keyboard stepper). Wired into `scripts/test-site.sh`; both `site.yml` and `constitution-tests.yml` now install Chromium. Axe found one real issue: the Plan 001 guide had no `<main>` landmark (fixed). New requirements FR-005, NFR-005, NFR-006 traced. GAP-003 opened (Chromium only, no pixel diffs).
- **Verification Run**: `bash scripts/test-site.sh` passes locally on Windows Git Bash (10 of 10 browser tests). Checked by hand that axe flags a planted contrast and missing-alt problem and the width check catches a 2000px element.
- **Known Blockers**: none. whiskerandwrench.com is live (see the note under Next Steps).
- **Context Hints**: `docs/TEST_PLAN.md` (how to run browser tests, one-time `npx playwright install chromium`), `playwright.config.mjs`, `tests/browser/helpers.mjs` (stubs Google Fonts and collects console errors), `docs/OPERATIONS.md` for Cloudflare.

#### Next Steps

Done on 2026-10-22: API token secret set, first deploy succeeded, whiskerandwrench.com attached and serving over HTTPS.

**Human action required:** step 1.

1. [ ] **HUMAN** — Review and merge PR #3 (stepper and accessibility tests)
   - **Why a human:** merging is Eric's decision.
   - **Done when:** PR #3 shows as merged and the `Site` workflow on `main` is green.
2. [ ] **AUTOMATED** — Each push to `main` redeploys the site after the checks pass.
3. [ ] **AGENT** _(suggestion)_ — Decide on `www` and the extra domains with Eric, then pick up the next item in `TODO.md` (GAP-003: WebKit and screenshot comparisons).
