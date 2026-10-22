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

### Session: 2026-10-16 (Claude Code, repo and website setup)
- **Accomplishments**: Created the public repo, MIT + CC BY-NC 4.0 licenses, adopted the engineering constitution (submodule + bootstrap), built the static site in `site/`, added CI (`scripts/test-site.sh` + lychee) and the Cloudflare Pages deploy job, filled requirements, traceability, test plan, operations, architecture and OTS docs.
- **Verification Run**: `bash scripts/test-site.sh` passes locally (4 pages valid, 0 broken links, all smoke and negative tests pass). All constitution checks pass locally. GitHub Actions `Site` workflow green on push. Pages checked by hand in a browser at desktop and phone width, dark mode, no console errors.
- **Known Blockers**: the site is not live yet. The deploy job is skipped until Eric finishes the one-time Cloudflare setup below. `wrangler login` timed out once waiting for browser approval.
- **Context Hints**: `docs/OPERATIONS.md` (Cloudflare setup, rollback, DNS rule), `.github/workflows/site.yml`, `scripts/build-site.sh` (plan guides are copied in at build time, never edit copies).

#### Next Steps

Done on 2026-10-21: Cloudflare login (Pages-only), Pages project `whisker-and-wrench` created, `CLOUDFLARE_ACCOUNT_ID` repo variable set. Until step 1 is done, a push to `main` will run the deploy job and fail on the missing token.

**Human action required:** steps 1, 3.

1. [ ] **HUMAN** — Create a Cloudflare API token and save it as a GitHub secret
   - **Why a human:** it's a credential; agents must not see or type it.
   - **Done when:** a Custom token with Account > Cloudflare Pages > Edit exists and `gh secret list` shows `CLOUDFLARE_API_TOKEN` (set with `gh secret set CLOUDFLARE_API_TOKEN`, pasting the token at the prompt).
2. [ ] **AUTOMATED** — Re-run the `Site` workflow on `main` (`gh workflow run site.yml`); the deploy job publishes to https://whisker-and-wrench.pages.dev.
3. [ ] **HUMAN** — Attach the custom domain in the Cloudflare dashboard
   - **Why a human:** UI-only, and it adds a DNS record in Eric's zone.
   - **Done when:** Workers & Pages > whisker-and-wrench > Custom domains shows `whiskerandwrench.com` as Active and the site loads over HTTPS.
4. [ ] **AGENT** _(suggestion)_ — Tick "The site is live" in `docs/PRODUCT_REQUIREMENTS.md`, update CLAUDE.md status, and pick up the next item in `TODO.md`.
