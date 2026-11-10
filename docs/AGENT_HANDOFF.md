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

- **Session**: 2026-11-09, shelter workflow and volunteer resources.
- **Changes**: Added an intake delay and retry, a fundraising starter, a printable Plan 001 shopping list and a facilitator guide.
- **Verification**: Declared site suite, requirements traceability, secrets sweep and visual inspection of Chromium's print layout.
- **Release**: Keep the batch in Unreleased pending merge and verification of the main deployment. Prepare the first tagged site release from the integrated changes.
- **Open follow-ups**: Cloudflare Email Routing, live link preview check, and maintainer approval before deleting `.constitution-bootstrap/`.

## Next Steps

**Human action required:** steps 1 and 3.

1. [ ] **HUMAN** — Review and merge the pull request after the required checks pass.
   - **Why a human:** The maintainer approves publishing the updated preview and shelter resources.
   - **Done when:** The pull request is merged.
2. [ ] **AUTOMATED** — Validate and deploy the site from main.
3. [ ] **HUMAN** — Run both dispatch paths with a field officer and an intake worker, and ask a shelter volunteer to try the fundraising starter and print the shopping list.
   - **Why a human:** Practitioners can check the handoff against local processes and confirm the resources work in a real planning session.
   - **Done when:** The team records missing fields and practical feedback using fictional case examples.
4. [ ] **AGENT** — Verify the main deployment, prepare the first tagged site release, and use practitioner feedback to specify the next software workflow.
