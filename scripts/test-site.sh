#!/usr/bin/env bash
# Full test suite for the website. Declared in docs/TEST_PLAN.md and run in CI.
#
# 1. Build dist/ from site/ and plans/.
# 2. Validate every page with html-validate.
# 3. Check every internal link and #anchor resolves.
# 4. Prove the link checker catches a broken link (negative test).
#
# Usage: bash scripts/test-site.sh   (run `npm ci` once first)
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
for page in dist/index.html dist/plans/index.html dist/404.html dist/plans/*/index.html; do
  must_contain "$page" 'href="/"' FR-004
done
must_contain dist/_headers "Content-Security-Policy" NFR-001
must_contain dist/_headers "X-Content-Type-Options: nosniff" NFR-001
if [ "$smoke_fail" -ne 0 ]; then
  echo "Smoke checks failed."
  exit 1
fi

echo "== Link checker catches broken links"
bash scripts/test_check_links.sh

echo "All site tests passed."
