# Session: Cat tower fit sheet

- **Date:** 2026-11-24
- **Agent:** Cursor Grok 4.7
- **Branch / PR:** `cursor/project-features-evaluation-2b70`
- **Topics:** Plan 003, Modular Cat Tower, fit sheet, plans/003-cat-tower, FR-016, measure.html
- **Related:** FR-016; open pull requests 23, 29, and 32; docs/research/furniture-market.md

## Request

List the current project features, judge how complete each one is, and supplement the weakest. If several are equally thin, pick the one that matters most for this product. Follow the engineering constitution and open a pull request for manual approval.

## Context

On main, the live site has a home page, a plans index, Plan 001's draft cot guide with a printable shopping list, a shelters page with a fundraising starter, a fictional dispatch-to-intake preview with a delay and retry, and a self-contained demo. Plans 002, 003, 004, and 005 are names only. The adopter app is one sentence on the home page.

Three open pull requests already cover other thin spots: 23 adds shelter receipt, a fundraising estimator, and a shopping checklist; 29 adds an adopter first-weeks checklist; 32 adds a Kitty Cot measuring sheet. None of those were rebuilt. Plan 001 still needs a real build, the dispatch preview still needs an officer review before any persistence, and the contact address still needs Cloudflare Email Routing, which changes DNS and needs Eric's approval.

The session log had no earlier summaries. The plans index and the furniture research were the record of what the furniture series is for.

## Decisions

- The agent chose Plan 003, the Modular Cat Tower, as the feature to supplement. Plans 003, 004, and 005 were equal in breadth. The home page names cat towers next to the cots, and the furniture research says carpeted towers fail shelter cleaning. A play-yard platform and a feeding stand matter, and they stay names until a later session.
- The page is a fit sheet, not a build guide. It asks for the floor spot, overhead clearance, the path in, how the room is cleaned, and which cats will use the tower. It states no pipe length, shelf size, or weight rating. Inventing those was rejected because no room has been measured and no test tower has been built.
- The requirement id is FR-016. FR-012 through FR-015 stay unused on this branch so the open pull requests can keep the numbers they already use.
- The shared button hover moves the control by one pixel. On the Path in step that shift never settled under a click, so this page's buttons keep the shadow and drop the nudge.

## Discoveries

- `scripts/build-site.sh` only copied `guide.html`. A plan folder with `measure.html` and no guide was not served. The build now serves `measure.html` as the plan page, and leaves a real guide in charge of `index.html` if both files exist. Pull request 32 changes the same script the same way, so the two branches can conflict there.
- Playwright reported the Next button as unstable on the third fit check. The site's one-pixel hover shift was the cause. Removing that shift on this page made the click land.

## Outcome

Added `/plans/003-cat-tower/`, linked from the plans index, the home page, the Plan 001 series list, the sitemap, and the demo. `bash scripts/test-site.sh` passed: 8 pages valid, no broken internal links, 31 browser tests. No release was cut. `docs/MEMORY.md` was not edited.

Left alone: plans 004 and 005, the open pull requests, DNS, and any cut list.

## Open Questions

A filled sheet from one real room is still missing, and so is a test tower checked against it. Until both exist, shelf sizes and pipe lengths would be guesses. Plans 004 and 005 are the next equally thin furniture names. The play yard is outdoor enrichment. The feeding stand is a daily cleaning problem. Neither is named on the home page the way the cat tower is.
