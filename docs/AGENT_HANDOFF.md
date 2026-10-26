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

### Session: 2026-10-25 (Claude Code, For shelters page)
- **Accomplishments**: Added `/shelters/` (what we help with, sliding-scale pricing, shelter-run fundraiser model, steps, contact fallback), linked it from every page, added FR-005 and browser test coverage. PR #7.
- **Verification Run**: `bash scripts/test-site.sh` passes locally (HTML valid, 0 broken links, all smoke checks, 12 of 12 browser tests). Page checked by eye in the browser.
- **Known Blockers**: no real contact method yet; the page falls back to GitHub issues.
- **Context Hints**: `docs/business-model.md` is the source for pricing and funding wording. Don't state prices on the site until Eric sets them.

#### Next Steps

**Human action required:** steps 1, 2.

1. [ ] **HUMAN** — Choose the contact method for the For shelters page
   - **Why a human:** it publishes a way to reach Eric under his name.
   - **Done when:** Eric has given the agent an email address (or form choice) to use.
2. [ ] **HUMAN** — Review the copy and merge PR #7
   - **Why a human:** it's public wording about pricing and offers.
   - **Done when:** PR #7 is merged and the `Site` workflow on `main` is green.
3. [ ] **AUTOMATED** — The merge deploys `/shelters/` to whiskerandwrench.com.
