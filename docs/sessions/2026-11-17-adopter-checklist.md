# Session: First weeks home checklist

- **Date:** 2026-11-17
- **Agent:** Cursor Grok 4.7
- **Branch / PR:** feat/adopter-first-weeks-checklist
- **Topics:** adopters, first weeks home, FR-012, checklist, site/adopters, preview.js, new pet parent
- **Related:** FR-012, docs/product/app-vision.md, docs/AGENT_HANDOFF.md from 2026-11-09. No earlier session file existed.

## Request

The scheduled review asked for a list of current features, a judgment of which is least complete, and work to fill that gap. If features were equally broad, importance to the product would decide. Work had to follow the engineering constitution, and the result had to be a pull request for Eric to approve. No one was available to answer questions during the run.

## Context

The site already had a home page, plans index, Plan 001 guide with a printable shopping list, a shelters page with a fundraising starter, a dispatch-to-intake preview with a delay and retry, and a self-contained demo. All of those had requirements and browser tests. The adopter app is named on the home page and in the product vision as the clearer market gap, but it had no page. The session log index was empty. The 2026-11-09 handoff described the dispatch delay, fundraising starter, and print layout, and that work is already on main. The constitution submodule was not checked out until this session initialized it at the recorded commit.

## Decisions

- The agent chose the adopter preview as the weakest feature. Plan 001, the shelters page, the fundraising starter, and dispatch each already have a working surface. Adding Plan 002 was rejected because its dimensions would be calculated, not measured, and the roadmap still says to build and measure Plan 001 first.
- The new page is a five-step question list for a fictional dog, Pebble: food, grooming, prevention, vaccine papers, and town registration. Care procedures, product names, and doses were rejected so the page cannot be read as veterinary instructions.
- Progress stays in memory, matching the dispatch preview. Accounts, forms, and browser storage stay out of scope for this release.
- `docs/MEMORY.md` was not edited. Proposed memory, for Eric to accept or reject: keep `/adopters/` as questions until a shelter educator or veterinarian reviews it.

## Discoveries

- A home-page card stretches to the height of its neighbor. Two links with `margin-top: auto` split the extra space between them. Wrapping the links in `.actions` keeps them together.
- Topic blocks use `section[hidden]` because `.card { display: flex }` would otherwise fight the `hidden` attribute. The stylesheet already sets `section[hidden]` to `display: none`.
- The dispatch page had no footer. The cross-link edit added the same footer the other pages use.

## Outcome

Shipped `/adopters/` with `preview.js`, links from the home software card, the dispatch page, the demo, and the sitemap, plus FR-012 and `tests/browser/adopter-preview.spec.mjs`. `bash scripts/test-site.sh` passed: 8 pages valid, no broken internal links, 30 browser tests. The secrets sweep reported no findings. A manual pass in Chromium checked the first topic, the finished question list, a 375px width, and dark mode. Left out: care instructions, saved answers, a second furniture plan, and any DNS or email change.

## Open Questions

A practitioner still needs to say whether these five questions are the right ones. Until that happens, the checklist should not grow into feeding, grooming, or medication steps. The dispatch facilitator review and the Plan 001 test build remain separate human tasks.
