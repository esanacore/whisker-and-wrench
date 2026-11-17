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

- **Session**: 2026-11-17, first weeks home checklist.
- **Changes**: Added `/adopters/`, a five-question checklist for a fictional adopted dog. It links from the home page, the dispatch preview, and the demo. No products, doses, or saved answers.
- **Verification**: `bash scripts/test-site.sh` passed (8 pages, 30 browser tests). Secrets sweep was clean. Chromium was checked at desktop width, 375px, and in dark mode, including the finished question list.
- **Release**: Leave the change in Unreleased. Do not tag a release in this pull request.
- **Open follow-ups**: Practitioner review of the checklist before any care instructions. The dispatch facilitator session, fundraising trial, Plan 001 test build, and Cloudflare email routing are unchanged and still open.

## Next Steps

**Human action required:** steps 1 and 3.

1. [ ] **HUMAN** — Review and merge this pull request.
   - **Why a human:** merging is the maintainer's decision.
   - **Done when:** the pull request is merged and the site workflow on main is green.
2. [ ] **AUTOMATED** — GitHub Actions validates the site and deploys it to Cloudflare Pages. _(blocked by step 1)_
   - **Done when:** https://whiskerandwrench.com/adopters/ shows the first weeks home checklist.
3. [ ] **HUMAN** — Ask a shelter educator or veterinarian to read the checklist and say whether the five questions are the right ones.
   - **Why a human:** only someone who counsels new pet parents can judge the questions, and care instructions must wait for that review.
   - **You need:** the published `/adopters/` page, and a person who does adoption counseling or veterinary care.
   - **Procedure:**
     1. Open the checklist and step through all five topics.
     2. Note missing questions, using a fictional dog. Leave out names, addresses, and case records.
     3. Send the notes back by a GitHub issue or another channel Eric chooses.
   - **Done when:** the notes are recorded and no product names or doses have been added to the page.
4. [ ] **AGENT** — Turn that feedback into the next checklist edit, still without doses, product names, or saved answers. _(blocked by step 3)_
