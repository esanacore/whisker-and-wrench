#!/usr/bin/env bash
# Assemble the deployable website in dist/.
#
# site/ holds the hand-written pages. Each build plan's guide stays in
# plans/<plan>/guide.html (the single source of truth) and is copied to
# dist/plans/<plan>/index.html so it is served at /plans/<plan>/. The guide's
# guide.css and guide.js go next to it. demo.html (the constitution's demo
# page) is served at /demo.html.
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
  for extra in guide.css guide.js; do
    if [ -e "$(dirname "$guide")/$extra" ]; then
      cp "$(dirname "$guide")/$extra" "$out/plans/$plan/"
    fi
  done
  count=$((count + 1))
done

cp "$root/demo.html" "$out/demo.html"

echo "Built dist/ with $count plan guide(s)."
