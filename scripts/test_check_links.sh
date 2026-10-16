#!/usr/bin/env bash
# Negative-case tests for scripts/check_links.py: a checker that never fails
# would pass a broken site, so prove each kind of break is caught.
set -euo pipefail

root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
py=$(command -v python3 || command -v python)
tmp=$(mktemp -d)
trap 'rm -rf "$tmp"' EXIT
fails=0

# Build a tiny good site: home page, a folder page, and an anchor.
make_site() {
  rm -rf "$tmp/site"
  mkdir -p "$tmp/site/plans"
  printf '<a href="/plans/">plans</a><a href="#top">top</a><p id="top"></p><a href="https://example.com/x">ext</a>' > "$tmp/site/index.html"
  printf '<a href="../">home</a><img src="/logo.svg" alt="">' > "$tmp/site/plans/index.html"
  printf '<svg xmlns="http://www.w3.org/2000/svg"></svg>' > "$tmp/site/logo.svg"
}

expect() {
  want=$1 name=$2
  set +e
  "$py" "$root/scripts/check_links.py" "$tmp/site" > "$tmp/out" 2>&1
  got=$?
  set -e
  if [ "$got" = "$want" ]; then
    echo "PASS  $name"
  else
    echo "FAIL  $name (expected exit $want, got $got)"
    cat "$tmp/out"
    fails=$((fails + 1))
  fi
}

make_site
expect 0 "good site passes"

make_site
printf '<a href="/nope/">x</a>' >> "$tmp/site/index.html"
expect 1 "missing folder page is caught"

make_site
printf '<img src="missing.png" alt="">' >> "$tmp/site/plans/index.html"
expect 1 "missing relative file is caught"

make_site
printf '<a href="/#nowhere">x</a>' >> "$tmp/site/plans/index.html"
expect 1 "missing anchor is caught"

make_site
printf '<a href="../../outside.html">x</a>' >> "$tmp/site/plans/index.html"
expect 1 "link leaving the site is caught"

if [ "$fails" -ne 0 ]; then
  echo "$fails link checker test(s) failed."
  exit 1
fi
echo "Link checker tests passed."
