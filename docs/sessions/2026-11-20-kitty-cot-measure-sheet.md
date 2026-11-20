# Session: Kitty Cot measuring sheet

- **Date:** 2026-11-20
- **Agent:** Cursor Grok 4.7
- **Branch / PR:** cursor/project-features-evaluation-e8c8
- **Topics:** kitty cot, plan 002, measuring sheet, FR-015, measure.html, cut list
- **Related:** FR-015, ROADMAP plan 002, open pull requests 23 and 29

## Request

List the current project features, judge how complete each one is, and supplement the weakest. If they were equally broad, judge importance against the product. Follow the engineering constitution. Open a pull request for manual approval.

## Context

On main, Plan 001, the shelters page, the fundraising starter, dispatch to intake, and the demo are real pages with tests. Plans 002 through 005 were names on the plans index. The adopter checklist is already proposed in pull request 29. Shelter receipt, a fundraising estimator, and a shopping checklist are already proposed in pull request 23. An earlier note said a Kitty Cot sheet had been started on a branch, but that branch is not on the remote. Plan 001 still has not been build-tested, so its lengths must not be copied forward as if they were measured.

## Decisions

- The agent chose Plan 002 as the feature to supplement. It is the thinnest product surface that is not already in an open pull request, and furniture plans are the product's main published output.
- The sheet records where to measure a kennel and prints blank lines. It is not a build guide. No pipe length was invented. Rejected: a cut list, a shopping list, and saving numbers in the browser.
- FR-015 is the requirement id. FR-012, FR-013, and FR-014 were left unused because the open pull requests already propose them.
- Filled sheets stay at the shelter. The page tells the reader not to post them on a public issue. No contact form and no DNS change.

## Discoveries

- The site build only published `plans/*/guide.html`. A measuring sheet needs its own copy step, or it never reaches `dist/`.
- New step dots have to be at least 24px or the axe WCAG 2.2 AA target-size check fails. Plan 001's existing dots were left alone.
- `#steps li` sets `display: flex`, which beat a lone `.is-quiet { display: none }` and left every measurement on screen. The hide rule has to name `#steps li.is-quiet`.
- The phrase "no cut list" has to appear in the notice the test reads, not only in the introduction.

## Outcome

Added `/plans/002-kitty-cot/` from `plans/002-kitty-cot/measure.html`, linked it from the plans index, home page, Plan 001 series list, sitemap, README, and demo. `bash scripts/test-site.sh` passed: 8 pages valid, internal links ok, 31 browser tests passed. No release was cut. A Kitty Cot guide was deliberately left out.

## Open Questions

A real kennel still has to be measured, and a test cot still has to be built, before any cut list is honest. That measurement is a person's job. Whether FR-012 through FR-014 land depends on the other open pull requests, not on this sheet.
