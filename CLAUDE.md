# CLAUDE.md

Context for Claude Code sessions in **Whisker & Wrench**. Read this first.

## What this is

Eric's venture to help animal shelters and animal control with everything we can build:

1. **Furniture plans**: shelter beds, cat towers, dog platforms and similar, built from off-the-shelf parts (PVC and fittings from a local big-box hardware store), with LEGO-style visual assembly guides.
2. **Software**: shelter management, animal control dispatch, animal/people records, calls, visits.
3. **Apps**: an admin app for shelter staff and an adopter app with new-pet-parent help (grooming, diet, pest prevention, pet insurance, vaccine records, pet registration).

## Name and domain

- Brand: **Whisker & Wrench**. Repo name: `whisker-and-wrench`.
- Domain: whiskerandwrench.com, registered on Cloudflare with Cloudflare DNS. Possible extras later: whiskerandwrench.org, whiskerwrench.com (short redirect).
- Site: static, in `site/`, deployed to the Cloudflare Pages project `whisker-and-wrench` by GitHub Actions on pushes to `main`. See `docs/OPERATIONS.md`.
- GitHub: https://github.com/esanacore/whisker-and-wrench (public).
- **DNS rule**: never change records in the whiskerandwrench.com zone other than the ones the Pages custom-domain flow creates, without asking Eric first.

## Licenses

- Code: MIT (`LICENSE`).
- Build plans and guides: CC BY-NC 4.0 (`plans/LICENSE`). Eric chose this on 2026-10-16.

## Decisions so far

- **Business model**: small business (LLC), not a nonprofit for now. Price to cover Eric's time plus a margin, with a sliding scale for small shelters.
- **Funding for small shelters**: the shelter runs its own fundraiser (e.g. GoFundMe charity fundraiser, so donations are tax-deductible) and then pays our invoice. We can supply a ready-made fundraising kit (blurb, goal, photos/stats).
- **Furniture plans use only parts stocked at Home Depot / Lowe's.** No furniture-grade specialty fittings. This is the main differentiator versus existing DIY plans.
- **Software strategy (leaning)**: integrate with shelters' existing systems before trying to replace them. Adopter app is the clearest gap in the market.

## Domain advisor

Eric's mom is an Animal Control Officer for the Town of Babylon, NY. She is the go-to person for real-world animal control workflow (calls, dispatch, field visits, records, licensing) and a likely first pilot user / reviewer.

## Engineering standards

- This repo follows Eric's Engineering Constitution, installed as the `constitution/` submodule (https://github.com/esanacore/engineering-constitution). Clone with `git clone --recurse-submodules`, or run `git submodule update --init` after a plain clone.
- Commit messages use Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `ci:`).
- Solid, beginner-friendly code, simple comments, small focused changes, no unnecessary rewrites.
- Heavy automated testing, docs written alongside code, quality/security gates.
- Eric works on Windows (PowerShell), projects live in `C:\Projects`.

## Writing style for docs and guides

Concise, casual, readable. No em dashes. Plain words over jargon. Guides are picture-first so a volunteer can follow them with one trip to the hardware store.

## Layout

```
README.md                     Overview, run and test commands
ROADMAP.md                    Plan series and software roadmap
TODO.md / CHANGELOG.md        Living task list and release notes
site/                         Website source (home, plans index, 404, CSS, _headers)
plans/LICENSE                 CC BY-NC 4.0 for all plans
plans/001-shelter-cot/        Plan 001: PVC shelter cot (guide.html, guide.css, guide.js + spec)
scripts/build-site.sh         Builds dist/: copies site/, demo.html, and each plans/*/guide.* to /plans/<plan>/
scripts/test-site.sh          Full test suite (HTML validation, link check, smoke checks)
docs/business-model.md        Pricing, funding, nonprofit vs LLC notes
docs/research/                Market research (furniture + software)
docs/product/app-vision.md    Admin + adopter app concept and open questions
docs/OPERATIONS.md            Deploy, rollback, Cloudflare setup, DNS
constitution/                 Engineering constitution submodule
.github/workflows/site.yml    Site checks + Cloudflare Pages deploy
```

Plan guides live only in `plans/<plan>/` (`guide.html`, `guide.css`, `guide.js`). Never copy them into `site/`; the build does that. Keep CSS and JS in files, never inline: the CSP has no `'unsafe-inline'` and the smoke checks fail on inline script or style. New plans get a row in `site/plans/index.html` and `site/sitemap.xml`.

## Status

- Plan 001 (PVC Shelter Cot) is a **draft prototype, not yet build-tested**. Dimensions are calculated, not measured. First real task: build one, measure, and update the guide.
- Website: **live at https://whiskerandwrench.com** since 2026-10-22. Deploys automatically on every push to `main`.
- Software: research only. No app code yet.

## Constitution: required reading

Before making changes, read:

- `constitution/CONSTITUTION.md`
- `constitution/AI_WORKFLOW.md`
- `constitution/TESTING.md`
- `constitution/DOCUMENTATION.md`
- `constitution/SECURITY.md`
- `constitution/CODE_STYLE.md`
- `README.md`
- `TODO.md` (open `[ ]`/`[~]` items; completed entries are history)
- `CHANGELOG.md` (the `Unreleased` section and the latest release)
- `docs/MEMORY.md`

## Constitution: completion checklist

Before completing work:

- Confirm the requested change is implemented.
- Add or update relevant tests.
- Evaluate coverage against targets and record any gaps.
- Update requirements traceability for product-facing repositories.
- Update the OTS software inventory (`docs/OTS_SOFTWARE.md`) when third-party dependencies changed.
- Update documentation when needed.
- Update TODO.md with discovered or completed work.
- Update CHANGELOG.md for user-facing changes.
- Consider security impact.
- Propose new codebase learnings, user preferences, or major decisions to Eric and (upon approval) record them in `docs/MEMORY.md`.
- Identify useful follow-up work.
- Clear or archive `docs/SESSION_PLAN.md`.
- End every push with a Next Steps procedure (`constitution/AI_WORKFLOW.md`, "Next Steps Procedure"): a numbered checklist, each step tagged **HUMAN**, **AGENT**, or **AUTOMATED**, in the PR and `docs/AGENT_HANDOFF.md`.
- Keep `demo.html` current when user-facing behavior changes.
- Summarize changes and verification.
