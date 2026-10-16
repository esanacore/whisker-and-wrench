#!/usr/bin/env bash
# Assemble the deployable website in dist/.
#
# site/ holds the hand-written pages. Each build plan's guide stays in
# plans/<plan>/guide.html (the single source of truth) and is copied to
# dist/plans/<plan>/index.html so it is served at /plans/<plan>/.
#
# Usage: bash scripts/build-site.sh
set -euo pipefail

root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
out="$root/dist"

rm -rf "$out"
cp -R "$root/site" "$out"

count=0
for guide in "$root"/plans/*/guide.html; do
  [ -e "$guide" ] || continue
  plan=$(basename "$(dirname "$guide")")
  mkdir -p "$out/plans/$plan"
  cp "$guide" "$out/plans/$plan/index.html"
  count=$((count + 1))
done

echo "Built dist/ with $count plan guide(s)."
