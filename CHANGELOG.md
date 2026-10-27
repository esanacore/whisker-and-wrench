# Changelog

All notable user-facing changes to this project should be documented in this file.

This project follows semantic versioning.

## Unreleased

### Added

- "For shelters" page at `/shelters/`: what we help with, sliding-scale pricing, the fund-it-yourself model with a fundraising kit, and the steps to work together. Linked from the nav on every page.
- Website for whiskerandwrench.com: home page, build plans index, 404 page, shared styles matching the Plan 001 guide, security headers, sitemap.
- Plan 001 (PVC Shelter Cot) guide served at `/plans/001-shelter-cot/`, with a breadcrumb back to the site.
- CI: HTML validation, internal and external link checks, requirement smoke checks, and the engineering constitution's checks.
- Deploy workflow for Cloudflare Pages on pushes to `main`.
- Licenses: MIT for code, CC BY-NC 4.0 for build plans.
- Browser tests in CI: Playwright clicks through every Plan 001 step and checks each page fits a phone screen, and axe checks every page for accessibility problems.

### Changed

### Fixed

- Plan 001 guide is now valid HTML (explicit head and body, no empty heading).
- Plan 001 guide now has a `<main>` landmark, so screen reader users can jump straight to the content.

### Removed

### Security
