# Troubleshooting

Problems we've actually hit, and how to fix them. If yours isn't here, check the CI logs (`gh run view <id> --log-failed`) and [open an issue](https://github.com/esanacore/whisker-and-wrench/issues).

## Setup and tests

### `playwright: command not found` or "Executable doesn't exist"

- **Symptoms**: `scripts/test-site.sh` stops at the browser tests.
- **Cause**: dev tools or the browser aren't installed in this clone.
- **Fix**: `npm ci` then `npx playwright install chromium`.

### `TypeError: createCallIdGenerator is not a function` in the browser tests

- **Symptoms**: every Playwright test fails instantly; `worker process exited unexpectedly`.
- **Cause**: two versions of `playwright-core` are installed. `package.json` pins `playwright-core` with an `overrides` entry so `@axe-core/playwright` uses the same copy as `@playwright/test`. A bump of one without the other (Dependabot does this) splits them.
- **Fix**: set `@playwright/test` and the `playwright-core` override to the same version, run `npm install`, and check `npm ls playwright-core` shows one version.

### `python: command not found`

- **Symptoms**: the link check step fails.
- **Cause**: macOS and Linux ship `python3`, Windows ships `python`. The scripts try both.
- **Fix**: install Python 3 and make sure one of the two names is on your PATH.

### html-validate reports `no-inline-style`

- **Symptoms**: HTML validation fails on a `style="..."` attribute.
- **Cause**: the site sends a Content-Security-Policy with no `'unsafe-inline'`, so inline styles and scripts are blocked in the browser. The validator and the smoke checks catch them early.
- **Fix**: move the style into `site/assets/site.css` or the plan's `guide.css` as a class. Same for `<script>` blocks: put them in a `.js` file. `demo.html` is the one exception (it must be a single file).

### The constitution checks say a doc is "still a template"

- **Symptoms**: `check_compliance.sh` lists a file under placeholders.
- **Cause**: the file still has `<!-- ... -->` placeholder comments or `<bracketed>` values from the constitution's template.
- **Fix**: replace them with real content. For `demo.html`, remove the `constitution-demo-template-placeholder` marker.

### `check_next_steps.sh` fails

- **Symptoms**: "Next Steps procedure needed" in CI or from the Stop hook.
- **Cause**: `docs/AGENT_HANDOFF.md` (or the PR body) doesn't end with the required format.
- **Fix**: a `#### Next Steps` heading, a `**Human action required:**` line, then a numbered list `1. [ ] **HUMAN**: ...` with `**Why a human:**` and `**Done when:**` bullets under each HUMAN step. Tags are HUMAN, AGENT or AUTOMATED. Check with `bash constitution/scripts/check_next_steps.sh --strict .`.

### `constitution/` is empty

- **Symptoms**: scripts under `constitution/scripts/` are missing.
- **Cause**: plain clone without submodules, or a Dependabot submodule bump was merged.
- **Fix**: `git submodule update --init`.

### `git worktree remove` refuses because of the submodule

- **Symptoms**: "contains modified or untracked files" on a clean worktree.
- **Cause**: the submodule checkout counts as untracked content.
- **Fix**: confirm `git status` is clean in the worktree, then `git worktree remove --force <path>`. Run it from outside the worktree.

## Deploys

### The site deployed but still looks old

- **Symptoms**: the deploy run is green, but you see the previous CSS or logo.
- **Cause**: browser cache. Cloudflare serves the new files right away.
- **Fix**: hard refresh (Ctrl+F5 or Cmd+Shift+R), or check with `curl -s https://whiskerandwrench.com/assets/site.css | head`.

### The `deploy` job is skipped

- **Symptoms**: `check` passes on `main` but `deploy` shows as skipped.
- **Cause**: the `CLOUDFLARE_ACCOUNT_ID` repo variable isn't set, or the push wasn't to `main`.
- **Fix**: see `docs/OPERATIONS.md`, "Cloudflare setup".

### `wrangler login` times out or fails with a keyring error

- **Symptoms**: the browser approval never completes, or `@napi-rs/keyring` is missing.
- **Cause**: the login must be approved in the browser within a few minutes; the `--use-keyring` flag needs a package that isn't installed on Windows.
- **Fix**: run `npx wrangler login --scopes-list` to see scopes, then log in again with only the Pages scopes and without `--use-keyring`. Details in `docs/OPERATIONS.md`.

### `wrangler pages project create` created nothing

- **Symptoms**: the command returns, but no Pages project appears.
- **Cause**: wrangler 4.146+ delegates new Pages projects to Workers.
- **Fix**: add `--force` to create a classic Pages project. Deploys to an existing project aren't affected.

### A page's `_headers` rule doesn't apply on the live site

- **Symptoms**: `curl -I https://whiskerandwrench.com/page.html` returns a 308 to `/page`, and `/page` has the site-wide headers instead of the page's own.
- **Cause**: Cloudflare Pages redirects `.html` URLs to clean URLs, and `_headers` matches the final path.
- **Fix**: add the rule for both `/page.html` and `/page`. The `/demo` rule is the example.

## Environment Reset

If the tools are in a strange state:

```bash
rm -rf node_modules dist
npm ci
npx playwright install chromium
bash scripts/test-site.sh
```
