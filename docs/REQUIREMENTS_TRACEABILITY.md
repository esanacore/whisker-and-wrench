# Requirements Traceability Matrix

This matrix links each requirement to its acceptance criteria, the tests that verify it, and its current verification status. It provides a single, auditable view from product intent to evidence of completion.

It is a living document. Update it in the same change that adds, modifies, or verifies a requirement.

Related documents:

- `docs/PRODUCT_REQUIREMENTS.md` — the source of requirement definitions and IDs.
- `docs/TEST_PLAN.md` — coverage targets, continuous evaluation, and the gap log.

## Conventions

- **Requirement ID**: matches the ID in `docs/PRODUCT_REQUIREMENTS.md` (for example, `FR-001`, `NFR-001`).
- **Level**: `MUST`, `SHOULD`, `COULD`, or `WON'T`.
- **Acceptance criteria**: the verifiable conditions for the requirement (may be referenced as `FR-001-AC-1`).
- **Verifying tests**: the test names, files, or IDs that exercise the requirement.
- **Status**: `Not Started`, `In Progress`, `Verified`, or `Deferred`.

A requirement with no verifying test is a coverage gap. Record it in `docs/TEST_PLAN.md` (gap log) and in `TODO.md` under Testing.

## Functional Requirements

| Requirement ID | Level | Description | Acceptance Criteria | Verifying Tests | Status |
| --- | --- | --- | --- | --- | --- |
| FR-001 | MUST | Home page explains furniture plans and software | FR-001-AC-1 | `scripts/test-site.sh` smoke checks (FR-001) | Verified |
| FR-002 | MUST | Plans index links every plan | FR-002-AC-1 | `scripts/test-site.sh` smoke checks (FR-002) | Verified |
| FR-003 | MUST | Guides served from their source file | FR-003-AC-1 | `scripts/test-site.sh` smoke checks (FR-003) | Verified |
| FR-004 | MUST | Every page links home | FR-004-AC-1 | `scripts/test-site.sh` smoke checks (FR-004) | Verified |
| FR-005 | MUST | "For shelters" page with pricing, funding, steps, contact | FR-005-AC-1, FR-005-AC-2 | `scripts/test-site.sh` smoke checks (FR-005); `tests/browser` (axe + 375px for `/shelters/`) | Verified |
| FR-006 | MUST | Guide stepper works in a browser | FR-006-AC-1 | `tests/browser/smoke.spec.mjs` ("Plan 001 stepper walks through every step") | Verified |
| FR-007 | MUST | Self-contained demo page | FR-007-AC-1, FR-007-AC-2 | `scripts/test-site.sh` smoke checks (FR-007); html-validate; `tests/browser` (axe + 375px for `/demo.html`) | Verified |

## Non-Functional Requirements

| Requirement ID | Level | Description | Acceptance Criteria | Verifying Tests | Status |
| --- | --- | --- | --- | --- | --- |
| NFR-001 | MUST | Security headers, no secrets, strict CSP | NFR-001-AC-1, NFR-001-AC-2, NFR-001-AC-3 | `scripts/test-site.sh` smoke checks (NFR-001, including the no-inline check); `constitution-secrets.yml` | Verified |
| NFR-002 | MUST | Valid HTML, no broken internal links | NFR-002-AC-1, NFR-002-AC-2 | `scripts/test-site.sh` (html-validate, `check_links.py`); `scripts/test_check_links.sh` | Verified |
| NFR-003 | SHOULD | External links work | NFR-003-AC-1 | `.github/workflows/site.yml` lychee step | Verified |
| NFR-004 | MUST | Deploy only after checks pass | NFR-004-AC-1 | `.github/workflows/site.yml` (`deploy` needs `check`) | Verified |
| NFR-005 | MUST | Every page is accessible | NFR-005-AC-1, NFR-005-AC-2 | `tests/browser/a11y.spec.mjs` (axe per page, keyboard stepper) | Verified |
| NFR-006 | MUST | Every page works on a phone | NFR-006-AC-1 | `tests/browser/smoke.spec.mjs` ("fits a 375px screen" per page) | Verified |

## Coverage Summary

| Metric | Count |
| --- | --- |
| Total requirements | 12 |
| Verified | 12 |
| In progress | 0 |
| Not started | 0 |
| Requirements without a verifying test (gaps) | 0 |
