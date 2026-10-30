#!/usr/bin/env bash
# Full test suite for the website. Declared in docs/TEST_PLAN.md and run in CI.
#
# 1. Build dist/ from site/ and plans/.
# 2. Validate every page with html-validate.
# 3. Check every internal link and #anchor resolves.
# 4. Requirement smoke checks.
# 5. Prove the link checker catches a broken link (negative test).
# 6. Browser tests (Playwright): Plan 001 stepper, 375px layout, axe a11y.
#
# Usage: bash scripts/test-site.sh
# One-time setup: `npm ci` and `npx playwright install chromium`.
set -euo pipefail

root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
cd "$root"

# Windows ships "python"; Linux CI ships "python3".
py=$(command -v python3 || command -v python)

echo "== Build"
bash scripts/build-site.sh

echo "== HTML validation"
npx --no-install html-validate "dist/**/*.html"
echo "HTML valid."

echo "== Internal links"
"$py" scripts/check_links.py dist

echo "== Smoke checks (requirement IDs from docs/PRODUCT_REQUIREMENTS.md)"
smoke_fail=0
# must_contain <file> <text> <requirement id>
must_contain() {
  if grep -qF -- "$2" "$1"; then
    echo "PASS  $3: $1 has '$2'"
  else
    echo "FAIL  $3: $1 is missing '$2'"
    smoke_fail=1
  fi
}

must_contain dist/index.html "Furniture plans" FR-001
must_contain dist/index.html 'id="software"' FR-001
for guide in plans/*/guide.html; do
  plan=$(basename "$(dirname "$guide")")
  must_contain dist/plans/index.html "href=\"/plans/$plan/\"" FR-002
  if cmp -s "$guide" "dist/plans/$plan/index.html"; then
    echo "PASS  FR-003: /plans/$plan/ matches $guide"
  else
    echo "FAIL  FR-003: /plans/$plan/ differs from $guide"
    smoke_fail=1
  fi
done
for page in dist/index.html dist/plans/index.html dist/shelters/index.html dist/404.html dist/plans/*/index.html; do
  must_contain "$page" 'href="/"' FR-004
done
for heading in "Pricing" "How to pay for it" "How it works" 'id="contact"'; do
  must_contain dist/shelters/index.html "$heading" FR-005
done
for page in dist/index.html dist/plans/index.html dist/404.html; do
  must_contain "$page" 'href="/shelters/"' FR-005
done
must_contain dist/_headers "Content-Security-Policy" NFR-001
must_contain dist/_headers "X-Content-Type-Options: nosniff" NFR-001
# The site-wide CSP (the first one in _headers, under /*) must forbid inline
# code, and no page may need it. demo.html has its own relaxed rule because
# it must be a single self-contained file.
if grep -m1 "Content-Security-Policy:" dist/_headers | grep -q "unsafe-inline"; then
  echo "FAIL  NFR-001: the site-wide CSP in _headers still allows 'unsafe-inline'"; smoke_fail=1
elif grep -rlE '<script>|<style>|<style |[[:space:]]style="' dist --include=*.html | grep -v '^dist/demo.html$' | grep .; then
  echo "FAIL  NFR-001: pages above have inline script or style, which the CSP blocks"; smoke_fail=1
else
  echo "PASS  NFR-001: no 'unsafe-inline' and no inline script/style on site pages"
fi
must_contain dist/demo.html "simplified drawings" FR-007
# Pages serves demo.html at the clean URL /demo too; both need the relaxed CSP.
if grep -qx "/demo" dist/_headers; then
  echo "PASS  FR-007: _headers has a /demo rule"
else
  echo "FAIL  FR-007: _headers has no /demo rule (Pages serves demo.html at /demo)"; smoke_fail=1
fi
must_contain dist/demo.html 'href="https://whiskerandwrench.com/plans/001-shelter-cot/"' FR-007
if grep -qE 'src="https?://|href="https?://[^"]*\.(css|js)"|fonts\.googleapis' dist/demo.html; then
  echo "FAIL  FR-007: demo.html loads something from the network"; smoke_fail=1
else
  echo "PASS  FR-007: demo.html is self-contained"
fi
if [ "$smoke_fail" -ne 0 ]; then
  echo "Smoke checks failed."
  exit 1
fi

echo "== Link checker catches broken links"
bash scripts/test_check_links.sh

echo "== Browser tests (stepper, mobile layout, accessibility)"
npx --no-install playwright test

echo "All site tests passed."
