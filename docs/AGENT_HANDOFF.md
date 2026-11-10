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

- **Session**: 2026-11-09, dispatch to intake preview.
- **Accomplishments**: Added a public-facing walkthrough at `/software/` with one fictional case and an intake summary. Case progress is in memory.
- **Verification**: The declared suite passed, including 24 browser tests. External link verification runs in CI.
- **Release**: Keep the changes in Unreleased pending preview review and integration on main.
- **Context**: Open follow-ups from the previous session include a live link preview check, Cloudflare Email Routing setup, and maintainer approval before deleting `.constitution-bootstrap/`.

## Next Steps

**Human action required:** steps 1, 3.

1. [ ] **HUMAN** — Review and merge the preview pull request after required checks pass.
   - **Why a human:** The maintainer decides whether to publish the preview on the public site.
   - **Done when:** The pull request is merged.
2. [ ] **AUTOMATED** — Build, validate and deploy the site from main.
3. [ ] **HUMAN** — Walk through the fictional case with an animal control officer and shelter intake staff. Ask what they need to see at handoff and what happens when the shelter cannot accept the animal.
   - **Why a human:** Practitioners can confirm local workflows and identify exceptions from experience.
   - **Done when:** The required fields and exceptions are documented using fictional examples.
4. [ ] **AGENT** — Use that feedback to specify the next workflow slice and identify which system owns each record.
