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

- **Session**: 2026-11-20, Plan 002 Kitty Cot measuring sheet.
- **Changes**: Added `/plans/002-kitty-cot/`, a six-step measuring sheet with a printable blank log. No pipe lengths, no cut list, no browser storage.
- **Verification**: `bash scripts/test-site.sh` passed (8 pages, 31 browser tests).
- **Release**: Left in Unreleased. Do not tag until this page is on main and a person has confirmed the live sheet.
- **Open follow-ups**: Measure one real cat kennel. Do not write a Kitty Cot guide from guessed lengths. Pull requests 23 and 29 are still separate.

## Next Steps

**Human action required:** steps 1 and 3.

1. [ ] **HUMAN** — Review and merge this pull request.
   - **Why a human:** merging is the maintainer's decision.
   - **Done when:** the pull request is merged and the site workflow on main is green.
2. [ ] **AUTOMATED** — GitHub Actions validates the site and deploys it to Cloudflare Pages. _(blocked by step 1)_
   - **Done when:** https://whiskerandwrench.com/plans/002-kitty-cot/ shows the measuring sheet.
3. [ ] **HUMAN** — Measure one real cat kennel with the printed sheet and keep the numbers at the shelter.
   - **Why a human:** the page cannot see a kennel, and a cut list written before that measurement would be a guess.
   - **You need:** the published measuring sheet, a tape, and one cat kennel the shelter is willing to fit.
   - **Procedure:**
     1. Open `/plans/002-kitty-cot/` and print the sheet.
     2. Fill every blank at the kennel. Use the same unit on every line.
     3. Keep the paper at the shelter. Do not post the numbers on a public issue.
   - **Done when:** the filled sheet exists and no pipe length has been added to the plan.
4. [ ] **AGENT** — Turn that filled sheet into a Kitty Cot guide only after a test cot has been built and checked against it. _(blocked by step 3)_
