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

- **Session**: 2026-11-24, cat tower fit sheet.
- **Changes**: Added `/plans/003-cat-tower/`, a six-check fit sheet for one real room. It has no cut list, shelf size, or weight rating, and it saves nothing in the browser.
- **Verification**: `bash scripts/test-site.sh` passed (8 pages, 31 browser tests).
- **Release**: Left under Unreleased. No version bump. Pull request 23 already prepares 0.2.0 notes.
- **Open follow-ups**: A person still has to measure one room. Plans 004 and 005 are still names. Open pull requests 23, 29, and 32 were left alone.

## Next Steps

**Human action required:** steps 1 and 3.

1. [ ] **HUMAN** — Review and merge this pull request.
   - **Why a human:** merging is the maintainer's decision.
   - **Done when:** the pull request is merged and the site workflow on main is green.
2. [ ] **AUTOMATED** — GitHub Actions validates the site and deploys it to Cloudflare Pages. _(blocked by step 1)_
   - **Done when:** https://whiskerandwrench.com/plans/003-cat-tower/ shows the fit sheet.
3. [ ] **HUMAN** — Fill the printed sheet in one real room and keep it at the shelter.
   - **Why a human:** the page cannot see a room, and a cut list written before that measurement would be a guess.
   - **You need:** the published fit sheet, a tape, and one room the shelter is willing to fit a tower into.
   - **Procedure:**
     1. Open `/plans/003-cat-tower/` and print the sheet.
     2. Fill every blank in the room. Use the same unit on every line.
     3. Keep the paper at the shelter. Do not post the numbers on a public issue.
   - **Done when:** the filled sheet exists and no pipe length, shelf size, or weight rating has been added to the plan.
4. [ ] **AGENT** — Turn that filled sheet into a cat tower guide only after a test tower has been built and checked against it. _(blocked by step 3)_
