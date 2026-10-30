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
- Demo page at `/demo.html`: a single self-contained file that shows what Whisker & Wrench makes, with a three-step simulated stepper, labelled as such.
- Open Graph share image (`/assets/og.png`) and `og:`/Twitter card tags on every page, so links posted on social media show the mascot and tagline.
- Real content in `docs/SETUP.md`, `docs/COMMAND_REFERENCE.md` and `docs/TROUBLESHOOTING.md` (they were constitution placeholders).
- Browser tests in CI: Playwright clicks through every Plan 001 step and checks each page fits a phone screen, and axe checks every page for accessibility problems.

### Changed

- New "Pegboard & Paws" look across the site and the Plan 001 guide: kraft pegboard background, riveted metal-plate cards, poster headlines (Big Shoulders Display) with cute Fredoka accents, caution-stripe callouts, shipping-tag notes, and a dark charcoal-pegboard mode.
- New mascot logo: a grey cat in front of a wrench on a cream badge. Used as the favicon, header logo and home page art.

### Fixed

- Plan 001 guide is now valid HTML (explicit head and body, no empty heading).
- Plan 001 guide now has a `<main>` landmark, so screen reader users can jump straight to the content.

### Removed

### Security

- Content-Security-Policy no longer allows `'unsafe-inline'` for scripts or styles. The Plan 001 guide's CSS and JS moved from inline blocks to `guide.css` and `guide.js`, and a smoke check now fails the build if any page gets inline code. `demo.html` alone keeps a relaxed rule because it must be one file.
