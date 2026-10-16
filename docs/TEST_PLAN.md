# Test Plan

This document defines how this repository is tested, what coverage it targets, and where coverage gaps currently exist.

It is a living document. Update it whenever the test strategy, targets, or known gaps change.

## Test Strategy

Describe the testing approach for this repository using the standard pyramid:

- **Unit tests**: the internal link checker (`scripts/check_links.py`) has negative-case tests in `scripts/test_check_links.sh`.
- **Integration tests**: `scripts/test-site.sh` builds `dist/` from `site/` and `plans/`, validates every page with html-validate, and checks every internal link and `#anchor`.
- **End-to-end tests**: none automated yet. CI runs lychee against external links. Visual checks are manual (see Coverage Gap Log).

## How to Run Tests

- Full suite: `bash scripts/test-site.sh`
- With coverage: n/a (static HTML; no line coverage is measured)
- A single test or subset: `npx html-validate "dist/**/*.html"`, `python scripts/check_links.py dist`, or `bash scripts/test_check_links.sh`

## Coverage Targets

Targets are a floor, not a ceiling. Changes that drop measured coverage below a floor require explicit, documented justification.

| Scope | Metric | Floor |
| --- | --- | --- |
| Every built page | Passes html-validate | 100% |
| Internal links and anchors | Resolve | 100% |
| `scripts/check_links.py` failure modes | Negative test per break type | 100% |

New or modified code should meet the floor on its own, not lean on untouched legacy code.

## Continuous Coverage Evaluation

Coverage is measured on every change (locally and, where possible, in CI). Record the latest figures here so trends stay visible.

| Date | Overall coverage | Notes |
| --- | --- | --- |
| 2026-10-16 | 4 of 4 pages valid, 0 broken links | Baseline: home, plans index, Plan 001, 404 |

A downward trend is a signal to investigate, even when the number stays above the floor.

## Coverage Gap Log

Track known untested behavior here. A percentage alone hides gaps; this log makes them explicit. Each entry should have a follow-up item in `TODO.md` under Testing.

| Gap ID | Area / behavior | Risk | Related requirement | Status | TODO ref |
| --- | --- | --- | --- | --- | --- |
| GAP-001 | Visual layout and the Plan 001 stepper JS are only checked by hand in a browser | med | n/a | Open | TODO.md Testing |
| GAP-002 | Accessibility (contrast, keyboard) is not checked automatically | med | n/a | Open | TODO.md Testing |

## Requirement Coverage

For product-facing repositories, every requirement ID should map to at least one test. The authoritative mapping lives in `docs/REQUIREMENTS_TRACEABILITY.md`. Requirements with no verifying test are gaps and should appear in the gap log above.
