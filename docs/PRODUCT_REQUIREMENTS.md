# Product Requirements

This document translates product intent into concrete implementation requirements.

Use this file for product-facing applications, prototypes, internal tools, or user-facing systems where engineering needs a clear contract beyond the README.

Each requirement carries a stable ID and explicit acceptance criteria. The mapping from requirement to verifying test is tracked in `docs/REQUIREMENTS_TRACEABILITY.md`.

## Requirement Levels

- `MUST`: Required for the current release or MVP.
- `SHOULD`: Important, but can be deferred if needed.
- `COULD`: Useful future enhancement.
- `WON'T`: Explicitly out of scope for the current release or MVP.

## Requirement Identifiers

- Functional requirements use the prefix `FR-` (for example, `FR-001`).
- Non-functional requirements use the prefix `NFR-` (for example, `NFR-001`).
- Acceptance criteria may carry sub-identifiers (for example, `FR-001-AC-1`).
- IDs are stable and never reused for a different requirement, even after one is removed or superseded.

## Product Summary

The Whisker & Wrench website (whiskerandwrench.com) tells shelter staff, volunteers and animal control officers what Whisker & Wrench is and gives them free build plans. Current release goal: a live static site with a home page, a plans index and Plan 001. The software products are out of scope until research is done (see `docs/product/app-vision.md`).

## Functional Requirements

### Website

**FR-001** `MUST` The home page explains what Whisker & Wrench is: furniture plans and software for shelters and animal control.

- Level: `MUST`
- Acceptance criteria:
  - `FR-001-AC-1`: `/` describes both the furniture plans and the software, with a `#software` section the nav links to.

**FR-002** `MUST` The plans index lists every published plan and links to its guide.

- Level: `MUST`
- Acceptance criteria:
  - `FR-002-AC-1`: `/plans/` links to `/plans/<plan>/` for every `plans/<plan>/guide.html` in the repo.

**FR-003** `MUST` Each plan's guide is served at `/plans/<plan>/` straight from its source file.

- Level: `MUST`
- Acceptance criteria:
  - `FR-003-AC-1`: `dist/plans/<plan>/index.html` is byte-identical to `plans/<plan>/guide.html`.

**FR-004** `MUST` Every page links back to the home page.

- Level: `MUST`
- Acceptance criteria:
  - `FR-004-AC-1`: Every built page contains a link to `/`.

## Non-Functional Requirements

### Security

**NFR-001** `MUST` The site sends security headers and never commits secrets.

- Level: `MUST`
- Acceptance criteria:
  - `NFR-001-AC-1`: `_headers` sets a Content-Security-Policy and `X-Content-Type-Options: nosniff` for every path.
  - `NFR-001-AC-2`: The constitution secrets sweep passes on every push.

### Reliability

**NFR-002** `MUST` Every page is valid HTML with no broken internal links or anchors.

- Level: `MUST`
- Acceptance criteria:
  - `NFR-002-AC-1`: html-validate reports no errors for `dist/**/*.html`.
  - `NFR-002-AC-2`: `scripts/check_links.py dist` reports no broken links, and its negative tests prove it catches each kind of break.

**NFR-003** `SHOULD` External links on the site work.

- Level: `SHOULD`
- Acceptance criteria:
  - `NFR-003-AC-1`: lychee reports no dead external links in CI.

### Testability

**NFR-004** `MUST` A deploy only happens after every check passes.

- Level: `MUST`
- Acceptance criteria:
  - `NFR-004-AC-1`: The `deploy` job in `.github/workflows/site.yml` has `needs: check` and only runs on pushes to `main`.

## Explicit Non-Goals

- `WON'T` include accounts, forms, analytics cookies, or any user data in this release.
- `WON'T` use a frontend framework or bundler.

## Acceptance Criteria Summary

Release-level acceptance criteria roll up the per-requirement criteria above. A release is ready when every `MUST` requirement is `Verified` in the traceability matrix.

- [x] All `MUST` requirements have verifying tests and are marked `Verified` in `docs/REQUIREMENTS_TRACEABILITY.md`.
- [ ] The site is live at https://whiskerandwrench.com.

## Traceability

Each requirement above is tracked to its verifying tests and status in `docs/REQUIREMENTS_TRACEABILITY.md`. Keep the two documents in sync: when a requirement is added or changed here, update the matrix in the same change.
