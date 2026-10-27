# OTS Software Inventory

This inventory tracks every off-the-shelf (OTS) software component this project depends on: third-party libraries, frameworks, runtimes, databases, and any other software the project uses but did not develop. It answers, for each component: what it is, why we use it, how risky it is, how we verified it is fit for use, and how it stays current.

The structure follows the intent of the FDA's OTS software guidance and IEC 62304's SOUP (Software of Unknown Provenance) requirements, generalized for any repository — regulated or not. For most projects it is simply the auditable answer to "what third-party software are we shipping, and is anyone watching it?"

It is a living document. Update it in the same change that adds, removes, or upgrades a dependency.

Related documents:

- `SECURITY.md` (constitution) — dependency risk review expectations and threat-modeling triggers.
- `docs/TEST_PLAN.md` — where verification evidence (test suites exercising a component) is declared.

## Conventions

- **Component ID**: a stable identifier, `OTS-001`, `OTS-002`, ... Once assigned, an ID is never reused, even after the component is removed. When a component is removed, set its Status to `Removed` rather than deleting the row.
- **Name**: the component's name **exactly as it is declared in the dependency manifest** (`package.json`, `requirements.txt`, `pyproject.toml`, `go.mod`, `Cargo.toml`, `Gemfile`, ...). The automated checker (`constitution/scripts/check_ots_inventory.sh`) matches manifest entries against this cell by exact value (case-insensitive), so a paraphrased or prettified name counts as undocumented.
- **License**: the SPDX identifier (`MIT`, `Apache-2.0`, `GPL-3.0-only`, ...) as declared by the supplier. Every real SOUP register carries it, and it is the column a legal or procurement review asks for first; a copyleft license in a component that ships in a proprietary product is a finding, not a footnote.
- **Risk**: `Low`, `Medium`, or `High`. A component is at least `Medium` when it sits in a trust-sensitive position — handling credentials, parsing untrusted input, or running with elevated privileges (see `SECURITY.md`'s "Threat Modeling Triggers").
- **Verification**: how fitness for use was established — for example, the project's own integration tests that exercise it, upstream test-suite maturity, vendor certification, or a manual validation record.
- **Anomaly Review**: known-issue posture — where known defects/CVEs for this component are tracked, and the date they were last reviewed.
- **Update Policy**: how the version moves — pinned exactly, pinned to a range, Dependabot/Renovate-managed, vendored, etc.
- **Status**: `Active`, `Evaluating`, or `Removed`.

## Managed Dependencies

Components declared in a dependency manifest in this repository. `constitution/scripts/check_ots_inventory.sh` cross-checks the manifests against this table, so a dependency added without a row here is flagged.

<!-- Add one row per manifest-declared dependency. Delete the placeholder row once real entries exist. -->

| Component ID | Name | Version | Supplier / Maintainer | Purpose | License | Risk | Verification | Anomaly Review | Update Policy | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| OTS-001 | html-validate | 11.16.2 | David Sveningsson and contributors | Dev-only. Validates every built HTML page in `scripts/test-site.sh` and CI. Not shipped to visitors. | MIT | Low | Runs on every push; `scripts/test-site.sh` fails on invalid pages. Mature project with its own test suite. | https://gitlab.com/html-validate/html-validate/-/issues and GitHub advisories, last reviewed 2026-10-16 | Pinned exactly; Dependabot PRs | Active |
| OTS-002 | @playwright/test | 1.63.0 | Microsoft | Dev-only. Drives headless Chromium for the browser tests in `tests/browser/` (stepper, 375px layout). Pulls in `playwright` and `playwright-core` 1.63.0. Not shipped to visitors. | Apache-2.0 | Low | Runs on every push in `scripts/test-site.sh`; a bad release fails the suite, not the site. Mature project with a large test suite. | https://github.com/microsoft/playwright/security and GitHub advisories, last reviewed 2026-10-22 | Pinned exactly; `overrides` keeps `playwright-core` on the same version; Dependabot PRs | Active |
| OTS-003 | @axe-core/playwright | 4.13.0 | Deque Systems | Dev-only. Runs axe accessibility checks on every page in `tests/browser/a11y.spec.mjs`. Pulls in `axe-core` 4.13.0 (MPL-2.0). Not shipped to visitors. | MPL-2.0 | Low | Runs on every push. Checked by hand that it flags a planted low-contrast paragraph and an image with no alt text. | https://github.com/dequelabs/axe-core-npm/security and GitHub advisories, last reviewed 2026-10-22 | Pinned exactly; Dependabot PRs | Active |

## System-Level OTS

Software the project depends on that is **not** declared in a dependency manifest: operating systems, language runtimes, databases, message brokers, container base images, and similar. The checker cannot discover these automatically — keep this section honest by hand.

<!-- Add one row per system-level component. Delete the placeholder row once real entries exist. -->

| Component ID | Name | Version | Supplier / Maintainer | Purpose | License | Risk | Verification | Anomaly Review | Update Policy | Status |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| OTS-101 | Cloudflare Pages | Hosted service | Cloudflare | Hosts and serves the static site, TLS, custom domain. | Proprietary (service) | Medium | Site checked after each deploy; rollback via dashboard. | https://www.cloudflarestatus.com, last reviewed 2026-10-16 | Managed by Cloudflare | Active |
| OTS-102 | wrangler | 4.146.0 | Cloudflare | Uploads `dist/` to Pages from CI, and local one-time setup. Handles the API token. | MIT OR Apache-2.0 | Medium | Deploy job output; token scoped to Pages:Edit only. | https://github.com/cloudflare/workers-sdk/security, last reviewed 2026-10-16 | Pinned in `site.yml` (`wranglerVersion`); bump by hand | Active |
| OTS-103 | GitHub Actions: checkout, setup-node, upload/download-artifact, lychee-action, wrangler-action | Pinned by commit SHA in `.github/workflows/` | GitHub, lycheeverse, Cloudflare | CI build, link check and deploy. | MIT / Apache-2.0 | Medium | Every push runs them; SHA pinning blocks tag hijacking. | Dependabot alerts, last reviewed 2026-10-16 | Dependabot (github-actions ecosystem) | Active |
| OTS-104 | Google Fonts (Atkinson Hyperlegible, Big Shoulders Display, Fredoka, JetBrains Mono) | Served by fonts.googleapis.com | Google | Typography on every page. Pages fall back to system fonts if blocked. | OFL-1.1 | Low | Visual check; CSP limits fonts to fonts.gstatic.com. | n/a, last reviewed 2026-10-16 | Unversioned CSS API | Active |
| OTS-105 | Node.js | 22 (CI) | OpenJS Foundation | Runs html-validate and wrangler. Dev and CI only. | MIT | Low | CI. | https://nodejs.org/en/blog/vulnerability, last reviewed 2026-10-16 | `actions/setup-node` major 22 | Active |
| OTS-107 | Chromium (Playwright build) | Matches @playwright/test 1.63.0 | Google / Microsoft | Headless browser for the browser tests, installed with `npx playwright install chromium` (CI adds `--with-deps`). Dev and CI only. | BSD-3-Clause | Low | Every test run. | Follows Playwright releases, last reviewed 2026-10-22 | Moves with @playwright/test | Active |
| OTS-106 | Python | 3.x (system) | Python Software Foundation | Runs `scripts/check_links.py` (stdlib only). | PSF-2.0 | Low | `scripts/test_check_links.sh`. | n/a, last reviewed 2026-10-16 | Whatever the runner ships | Active |

## Review Cadence

- Review this inventory whenever a dependency is added, removed, or upgraded — in the **same change**, not a later documentation pass.
- Periodically (at least once per release), re-review the Anomaly Review column: check each `Medium`/`High` component's tracker for newly reported defects and CVEs, and refresh the last-reviewed dates.
- A dependency the checker reports as undocumented is a gap: add its row (or remove the dependency) before the change merges.
