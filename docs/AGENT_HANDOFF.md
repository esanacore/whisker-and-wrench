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

### Session: 2026-10-26 (Claude Code, dependency bumps)
- **Accomplishments**: Merged Dependabot PR #8 (constitution submodule). Bumped @playwright/test to 1.64.1, @axe-core/playwright to 4.14.0 and html-validate to 11.16.4 in one PR. The `overrides` pin on `playwright-core` moved too. Dependabot's own playwright PR (#6) failed CI because it bumped `@playwright/test` but left the override at 1.63.0, which gave mismatched versions (`createCallIdGenerator is not a function`).
- **Verification Run**: `bash scripts/test-site.sh` passes locally (17 of 17 browser tests). `npm ls` shows a single playwright-core 1.64.1.
- **Known Blockers**: none. Contact email (hello@) is still waiting on Eric's Cloudflare Email Routing setup.
- **Context Hints**: When Dependabot bumps `@playwright/test`, bump the `playwright-core` override in `package.json` to the same version or the browser tests crash. Dependabot PRs #4, #5 and #6 close on their own once this merges.

#### Next Steps

**Human action required:** step 1.

1. [ ] **HUMAN**: Set up Cloudflare Email Routing for hello@whiskerandwrench.com
   - **Why a human:** it verifies Eric's Gmail and adds DNS records in his zone.
   - **Done when:** Email Routing shows `hello@whiskerandwrench.com` as active.
2. [ ] **AGENT** _(suggestion)_: Add an Open Graph share image with the mascot, so links to the site show the cat.
3. [ ] **AUTOMATED**: Every push to `main` deploys to whiskerandwrench.com.
