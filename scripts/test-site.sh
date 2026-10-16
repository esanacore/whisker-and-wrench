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

echo "== Link checker catches broken links"
bash scripts/test_check_links.sh

echo "All site tests passed."
