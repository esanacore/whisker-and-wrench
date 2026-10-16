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

**Human action required:** steps 1, 2, 3, 5.

1. [ ] **HUMAN** — Sign in to Cloudflare from wrangler and create the Pages project
   - **Why a human:** it's an OAuth consent in Eric's Cloudflare account.
   - **Done when:** `npx wrangler@4.146.0 login --scopes account:read user:read pages:write offline_access --use-keyring` succeeds and `npx wrangler@4.146.0 pages project create whisker-and-wrench --production-branch main` reports the project created (an agent can run the second command once login is done).
2. [ ] **HUMAN** — Create a Cloudflare API token and save it as a GitHub secret
   - **Why a human:** it's a credential; agents must not see or type it.
   - **Done when:** a Custom token with Account > Cloudflare Pages > Edit exists and `gh secret list` shows `CLOUDFLARE_API_TOKEN` (set with `gh secret set CLOUDFLARE_API_TOKEN`, pasting the token at the prompt).
3. [ ] **HUMAN** — Save the Cloudflare account ID as a GitHub variable
   - **Why a human:** needs the logged-in Cloudflare account; it's not a secret, so an agent can do it after step 1.
   - **Done when:** `gh variable list` shows `CLOUDFLARE_ACCOUNT_ID` (from `npx wrangler@4.146.0 whoami`).
4. [ ] **AUTOMATED** — Re-run the `Site` workflow on `main` (`gh workflow run site.yml`, or push any commit); the deploy job publishes to https://whisker-and-wrench.pages.dev.
5. [ ] **HUMAN** — Attach the custom domain in the Cloudflare dashboard
   - **Why a human:** UI-only, and it adds a DNS record in Eric's zone.
   - **Done when:** Workers & Pages > whisker-and-wrench > Custom domains shows `whiskerandwrench.com` as Active and the site loads over HTTPS.
6. [ ] **AGENT** _(suggestion)_ — Tick "The site is live" in `docs/PRODUCT_REQUIREMENTS.md`, update CLAUDE.md status, and pick up the next item in `TODO.md`.
