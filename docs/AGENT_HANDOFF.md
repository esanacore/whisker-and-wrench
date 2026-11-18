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

- **Session**: 2026-11-09, separate receipt and local planning tools.
- **Changes**: Added a separate fictional shelter receipt action and refusal with retry, a local fundraising estimator, and an ephemeral volunteer supply checklist.
- **Verification**: The declared suite covers 29 Chromium tests. Requirements traceability and secrets checks passed. External links run in CI.
- **Release**: Prepared 0.2.0. Publish the tag and GitHub Release from the verified main deployment after merge.
- **Open follow-ups**: Cloudflare Email Routing, live link preview check, and maintainer approval before deleting `.constitution-bootstrap/`.

## Next Steps

**Human action required:** steps 1 and 4.

1. [ ] **HUMAN** — Review and merge the release preparation pull request after required checks pass.
   - **Why a human:** The maintainer approves publishing the new workflow and resources.
   - **Done when:** The pull request is merged.
2. [ ] **AUTOMATED** — Run site CI and deploy from main.
3. [ ] **AGENT** — Verify the deployment from the merge commit, then tag v0.2.0 and publish the matching GitHub Release using the changelog.
4. [ ] **HUMAN** — Ask a field officer and an intake worker to compare field readiness with receipt confirmation. Ask a shelter volunteer to try the estimator and checklist.
   - **Why a human:** Practitioners can confirm whether the simulated custody and planning steps fit how their teams work.
   - **Done when:** Feedback is recorded using fictional cases and sample budgets.
