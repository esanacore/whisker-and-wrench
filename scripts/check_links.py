"""Check that every internal link in a built site points at a real file.

Looks at href and src attributes in every .html file under the given folder.
Links starting with "/" are resolved from the site root; other relative links
are resolved from the page's own folder. A link to a folder must have an
index.html inside it. "#id" fragments are checked against ids on the target
page. External links (http, https, mailto, ...) are skipped here; CI checks
them separately with lychee.

Usage: python scripts/check_links.py dist
Exit code 0 = all good, 1 = broken links found, 2 = bad usage.
"""

import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


class PageParser(HTMLParser):
    """Collects link targets and element ids from one HTML page."""

    def __init__(self):
        super().__init__()
        self.links = []
        self.ids = set()

    def handle_starttag(self, tag, attrs):
        for name, value in attrs:
            if name == "id" and value:
                self.ids.add(value)
            if name in ("href", "src") and value is not None:
                self.links.append(value)


def parse(path):
    parser = PageParser()
    parser.feed(path.read_text(encoding="utf-8"))
    return parser


def resolve(root, page, link):
    """Return the file a link points to, or None for external links."""
    parts = urlsplit(link)
    if parts.scheme or parts.netloc:
        return None, None
    target_path = unquote(parts.path)
    if target_path == "":
        target = page
    elif target_path.startswith("/"):
        target = root / target_path.lstrip("/")
    else:
        target = page.parent / target_path
    if target_path.endswith("/") or target.is_dir():
        target = target / "index.html"
    return target.resolve(), parts.fragment


def check(root):
    root = root.resolve()
    pages = sorted(root.rglob("*.html"))
    parsed = {page.resolve(): parse(page) for page in pages}
    problems = []
    for page, info in parsed.items():
        for link in info.links:
            target, fragment = resolve(root, page, link)
            if target is None:
                continue
            where = page.relative_to(root)
            if root not in target.parents and target != root:
                problems.append(f"{where}: link leaves the site: {link}")
            elif not target.is_file():
                problems.append(f"{where}: missing target: {link}")
            elif fragment and target in parsed and fragment not in parsed[target].ids:
                problems.append(f"{where}: missing #{fragment} on target: {link}")
    return len(pages), problems


def main(argv):
    if len(argv) != 2:
        print(__doc__.strip().splitlines()[-2], file=sys.stderr)
        return 2
    root = Path(argv[1])
    if not root.is_dir():
        print(f"Not a folder: {root}", file=sys.stderr)
        return 2
    count, problems = check(root)
    for problem in problems:
        print(f"BROKEN  {problem}")
    if problems:
        print(f"{len(problems)} broken internal link(s) in {count} page(s).")
        return 1
    print(f"Internal links OK across {count} page(s).")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv))
