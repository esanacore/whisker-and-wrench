# Command Reference

Quick reference for the commands used in this project. Run them from the repo root in Bash (Git Bash on Windows). One-time setup is in `docs/SETUP.md`.

## Build and preview

| Command | What it does |
| --- | --- |
| `bash scripts/build-site.sh` | Assembles `dist/` from `site/`, `demo.html` and every `plans/*/guide.*`. |
| `npm run build` | Same as above. |
| `python -m http.server 8788 --directory dist` | Serves `dist/` at http://localhost:8788 (`python3` on macOS/Linux). |
| `node scripts/serve-dist.mjs 4173` | The test server. Serves `dist/` like Cloudflare Pages does (`/dir/` to `index.html`, unknown paths to `404.html`). |

## Test

| Command | What it does |
| --- | --- |
| `bash scripts/test-site.sh` | The full suite: build, html-validate, internal links, smoke checks, link-checker self-test, Playwright browser tests. This is what CI runs. |
| `npm test` | Same as above. |
| `npx html-validate "dist/**/*.html"` | HTML validation only. |
| `python scripts/check_links.py dist` | Internal link and anchor check only. |
| `bash scripts/test_check_links.sh` | Proves the link checker catches broken links. |
| `npx playwright test` | Browser tests only (needs a built `dist/`). |
| `npx playwright test --headed` | Same, with a visible browser. |
| `npx playwright test tests/browser/a11y.spec.mjs` | Just the axe accessibility tests. |
| `npx playwright show-report` | Opens the last HTML report after a failure. |

CI also runs `lychee` for external links; locally you can skip it or install lychee and run `lychee --root-dir dist 'dist/**/*.html'`.

## Constitution checks

These run in CI from `.github/workflows/constitution-*.yml`. Run them locally before a push:

| Command | What it checks |
| --- | --- |
| `bash constitution/scripts/check_compliance.sh --product .` | Required docs exist and aren't still templates. |
| `bash constitution/scripts/check_traceability.sh .` | Every requirement has tests and a status. |
| `bash constitution/scripts/check_next_steps.sh --strict .` | `docs/AGENT_HANDOFF.md` ends with a well-formed Next Steps procedure. |
| `bash constitution/scripts/check_next_steps.sh --strict --file - .` | Same, for a PR body piped in on stdin. |
| `bash constitution/scripts/check_secrets.sh .` | No secrets committed. |
| `bash constitution/scripts/check_ots_inventory.sh .` | `docs/OTS_SOFTWARE.md` matches the dependencies. |
| `bash constitution/scripts/run_declared_tests.sh --strict .` | Runs the tests declared in `docs/TEST_PLAN.md`. |

## Deploy

Deploys are automatic: push to `main`, and `.github/workflows/site.yml` deploys `dist/` after the checks pass. Manual commands, rollback and the one-time Cloudflare setup are in `docs/OPERATIONS.md`.

| Command | What it does |
| --- | --- |
| `gh run list --workflow site.yml --limit 3` | Recent deploy runs. |
| `gh run watch <id>` | Follow a run. |
| `npx wrangler pages deploy dist --project-name=whisker-and-wrench --branch=main` | Manual deploy (needs a Cloudflare login; see OPERATIONS). |

## Git and GitHub

| Command | What it does |
| --- | --- |
| `git clone --recurse-submodules <url>` | Clone with the constitution submodule. |
| `git submodule update --init` | Fetch the submodule after a plain clone or a submodule bump. |
| `gh pr create` | Open a PR. Commit messages use Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `ci:`, `test:`). |
| `gh pr merge <n> --merge` | Merge with a merge commit (the repo's convention). GitHub deletes the branch. |
