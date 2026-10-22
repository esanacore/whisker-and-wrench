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
- **Known Blockers**: same as before: the site is not live until the one-time Cloudflare setup is done.
- **Context Hints**: `docs/TEST_PLAN.md` (how to run browser tests, one-time `npx playwright install chromium`), `playwright.config.mjs`, `tests/browser/helpers.mjs` (stubs Google Fonts and collects console errors), `docs/OPERATIONS.md` for Cloudflare.

#### Next Steps

**Human action required:** steps 1, 2, 3, 4, 6.

1. [ ] **HUMAN** — Review and merge the browser/accessibility tests PR
   - **Why a human:** merging to `main` is Eric's call.
   - **Done when:** the PR is merged and the `Site` and `Constitution Test Runner` workflows are green on `main`.
2. [ ] **HUMAN** — Sign in to Cloudflare from wrangler and create the Pages project
   - **Why a human:** it's an OAuth consent in Eric's Cloudflare account.
   - **Done when:** `npx wrangler@4.146.0 login --scopes account:read user:read pages:write offline_access --use-keyring` succeeds and `npx wrangler@4.146.0 pages project create whisker-and-wrench --production-branch main` reports the project created (an agent can run the second command once login is done).
3. [ ] **HUMAN** — Create a Cloudflare API token and save it as a GitHub secret
   - **Why a human:** it's a credential; agents must not see or type it.
   - **Done when:** a Custom token with Account > Cloudflare Pages > Edit exists and `gh secret list` shows `CLOUDFLARE_API_TOKEN` (set with `gh secret set CLOUDFLARE_API_TOKEN`, pasting the token at the prompt).
4. [ ] **HUMAN** — Save the Cloudflare account ID as a GitHub variable
   - **Why a human:** needs the logged-in Cloudflare account; it's not a secret, so an agent can do it after step 2.
   - **Done when:** `gh variable list` shows `CLOUDFLARE_ACCOUNT_ID` (from `npx wrangler@4.146.0 whoami`).
5. [ ] **AUTOMATED** — Re-run the `Site` workflow on `main` (`gh workflow run site.yml`, or push any commit); the deploy job publishes to https://whisker-and-wrench.pages.dev.
6. [ ] **HUMAN** — Attach the custom domain in the Cloudflare dashboard
   - **Why a human:** UI-only, and it adds a DNS record in Eric's zone.
   - **Done when:** Workers & Pages > whisker-and-wrench > Custom domains shows `whiskerandwrench.com` as Active and the site loads over HTTPS.
7. [ ] **AGENT** _(suggestion)_ — Tick "The site is live" in `docs/PRODUCT_REQUIREMENTS.md`, update CLAUDE.md status, and pick up the next item in `TODO.md`.
