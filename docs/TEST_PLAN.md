# Test Plan

This document defines how this repository is tested, what coverage it targets, and where coverage gaps currently exist.

It is a living document. Update it whenever the test strategy, targets, or known gaps change.

## Test Strategy

Describe the testing approach for this repository using the standard pyramid:

- **Unit tests**: the internal link checker (`scripts/check_links.py`) has negative-case tests in `scripts/test_check_links.sh`.
- **Integration tests**: `scripts/test-site.sh` builds `dist/` from `site/` and `plans/`, validates every page with html-validate, and checks every internal link and `#anchor`.
- **End-to-end tests**: Playwright (`tests/browser/`, config in `playwright.config.mjs`) serves `dist/` with `scripts/serve-dist.mjs` and drives headless Chromium. `smoke.spec.mjs` clicks Next through all 11 Plan 001 steps (title and SVG drawing on each, Back, "Start over", no console errors) and checks every page has no sideways scroll at 375px. `a11y.spec.mjs` runs axe (WCAG 2.x A/AA plus best-practice rules) on every page in both light and dark color schemes and checks the stepper works from the keyboard. Requests to other hosts (Google Fonts) are stubbed so the tests don't need the network. CI also runs lychee against external links.

## How to Run Tests

- Full suite: `bash scripts/test-site.sh`
- With coverage: n/a (static HTML; no line coverage is measured)
- A single test or subset: `npx html-validate "dist/**/*.html"`, `python scripts/check_links.py dist`, `bash scripts/test_check_links.sh`, or (after `bash scripts/build-site.sh`) `npx playwright test` / `npx playwright test a11y`
- One-time setup for the browser tests: `npm ci` then `npx playwright install chromium`

## Coverage Targets

Targets are a floor, not a ceiling. Changes that drop measured coverage below a floor require explicit, documented justification.

| Scope | Metric | Floor |
| --- | --- | --- |
| Every built page | Passes html-validate | 100% |
| Internal links and anchors | Resolve | 100% |
| `scripts/check_links.py` failure modes | Negative test per break type | 100% |
| Plan guide steps | Each step clicked through in a browser, title and drawing render | 100% |
| Every built page | No axe violations (WCAG 2.x A/AA + best-practice) | 100% |
| Every built page | No horizontal scroll at 375px, no console errors | 100% |

New or modified code should meet the floor on its own, not lean on untouched legacy code.

## Continuous Coverage Evaluation

Coverage is measured on every change (locally and, where possible, in CI). Record the latest figures here so trends stay visible.

| Date | Overall coverage | Notes |
| --- | --- | --- |
| 2026-10-16 | 4 of 4 pages valid, 0 broken links | Baseline: home, plans index, Plan 001, 404 |
| 2026-10-22 | 4 of 4 pages valid, 0 broken links; 11 of 11 guide steps pass; 4 of 4 pages pass axe and 375px | Added Playwright + axe (10 browser tests). Axe found one issue (Plan 001 had no `<main>` landmark), fixed. |
| 2026-10-26 | 5 of 5 pages valid, 0 broken links; 5 of 5 pages pass axe in light and dark, and 375px | "Pegboard & Paws" redesign. Axe now also runs in dark mode (17 browser tests). |

A downward trend is a signal to investigate, even when the number stays above the floor.

## Coverage Gap Log

Track known untested behavior here. A percentage alone hides gaps; this log makes them explicit. Each entry should have a follow-up item in `TODO.md` under Testing.

| Gap ID | Area / behavior | Risk | Related requirement | Status | TODO ref |
| --- | --- | --- | --- | --- | --- |
| GAP-001 | Visual layout and the Plan 001 stepper JS are only checked by hand in a browser | med | FR-005, NFR-006 | Closed 2026-10-22 (`tests/browser/smoke.spec.mjs`) | TODO.md Testing |
| GAP-002 | Accessibility (contrast, keyboard) is not checked automatically | med | NFR-005 | Closed 2026-10-22 (`tests/browser/a11y.spec.mjs`) | TODO.md Testing |
| GAP-003 | Browser tests run in Chromium only, and pixel-level looks (spacing, fonts) still need a human eye. Axe can't judge everything (for example whether alt text is meaningful). | low | NFR-005, NFR-006 | Open | TODO.md Testing |

## Requirement Coverage

For product-facing repositories, every requirement ID should map to at least one test. The authoritative mapping lives in `docs/REQUIREMENTS_TRACEABILITY.md`. Requirements with no verifying test are gaps and should appear in the gap log above.
