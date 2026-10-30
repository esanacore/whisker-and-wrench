# Workstation Setup

How to get a clone of Whisker & Wrench building and testing on your machine. The site is plain HTML, CSS and JS, so there's no app server to run; the tools below only build, check and preview it.

## IDE Setup

This project follows Eric's Engineering Constitution. To have it applied
automatically in **Visual Studio**, **VS Code**, or a **JetBrains IDE**, install
an AI coding assistant (GitHub Copilot, Continue.dev, or Cursor) and open the
repository. The assistant reads the instruction files committed here and picks
up the constitution with no extra configuration. After cloning, run
`git submodule update --init --recursive` so the `constitution/` submodule is
present. See `docs/HELP.md`, "Using This Project in Your IDE," for the per-IDE
file mapping and `constitution/INTEGRATION.md` for full details.

Claude Code reads `CLAUDE.md` on its own. From PowerShell: `cd C:\Projects\whisker-and-wrench` then `claude`.

## Supported Platforms

- Windows 11 with PowerShell 7 and Git Bash (Eric's machine; the scripts run under Git Bash).
- macOS 13 or newer.
- Linux: Ubuntu 22.04 or newer. CI runs on `ubuntu-latest`.

Anything with Git, Node.js 22, Python 3 and a Bash shell should work. Older Node versions are not supported because the tools are pinned to current releases.

## Prerequisites

| Tool | Version | Used for |
| --- | --- | --- |
| Git | any recent | clone, submodule |
| Node.js | 22 or newer | html-validate, Playwright, wrangler |
| Python | 3.10 or newer | `scripts/check_links.py`, local preview server |
| Bash | any | all scripts in `scripts/` (Git Bash on Windows) |

Node is pinned by `package.json` and `package-lock.json`; CI uses `actions/setup-node` with major 22.

<details>
<summary>Windows (PowerShell)</summary>

```powershell
winget install --id Git.Git -e
winget install --id OpenJS.NodeJS.LTS -e
winget install --id Python.Python.3.12 -e
```

Git for Windows installs Git Bash. Run the project scripts from Git Bash, or from PowerShell as `bash scripts/<name>.sh`.

</details>

<details>
<summary>macOS (zsh)</summary>

```bash
brew install git node python
```

</details>

<details>
<summary>Linux (bash)</summary>

```bash
sudo apt install git python3
# Node 22: https://github.com/nodesource/distributions
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install nodejs
```

</details>

## Verify Prerequisites

```bash
git --version
node --version      # v22 or newer
python --version    # Windows; "python3 --version" on macOS and Linux
bash --version
```

## Installation

```bash
git clone --recurse-submodules https://github.com/esanacore/whisker-and-wrench.git
cd whisker-and-wrench
npm ci
npx playwright install chromium
```

- `--recurse-submodules` pulls in `constitution/`. If you cloned without it, run `git submodule update --init`.
- `npm ci` installs the exact dev tools from the lockfile (no runtime dependencies exist).
- `npx playwright install chromium` downloads the headless browser the tests use. Once per machine. On Linux CI it runs with `--with-deps` to add system libraries.

## First Run

Build `dist/` and preview it at http://localhost:8788:

<details>
<summary>Windows (PowerShell)</summary>

```powershell
bash scripts/build-site.sh
python -m http.server 8788 --directory dist
```

</details>

<details>
<summary>macOS and Linux</summary>

```bash
bash scripts/build-site.sh
python3 -m http.server 8788 --directory dist
```

</details>

Claude Code's browser pane can start the same server from `.claude/launch.json` (configuration `site`).

Then run the full test suite:

```bash
bash scripts/test-site.sh
```

It should end with `All site tests passed.` See `docs/COMMAND_REFERENCE.md` for the individual checks and `docs/TROUBLESHOOTING.md` if something fails.

## Environment Variables

The site needs none. There is no `.env` file.

Deploys run in GitHub Actions and use two repository settings, set once in the GitHub UI (see `docs/OPERATIONS.md`): the `CLOUDFLARE_ACCOUNT_ID` variable and the `CLOUDFLARE_API_TOKEN` secret. Never put either in the repo.
