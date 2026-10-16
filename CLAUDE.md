# CLAUDE.md

Context for Claude Code sessions in **Whisker & Wrench**. Read this first.

## What this is

Eric's venture to help animal shelters and animal control with everything we can build:

1. **Furniture plans**: shelter beds, cat towers, dog platforms and similar, built from off-the-shelf parts (PVC and fittings from a local big-box hardware store), with LEGO-style visual assembly guides.
2. **Software**: shelter management, animal control dispatch, animal/people records, calls, visits.
3. **Apps**: an admin app for shelter staff and an adopter app with new-pet-parent help (grooming, diet, pest prevention, pet insurance, vaccine records, pet registration).

## Name and domain

- Brand: **Whisker & Wrench**. Repo name: `whisker-and-wrench`.
- Domains (checked unregistered on 2026-10-16, confirm on Cloudflare Registrar): whiskerandwrench.com (primary), whiskerandwrench.org, whiskerwrench.com (short redirect).
- Plan: register on Cloudflare, host the site on Cloudflare Pages.

## Decisions so far

- **Business model**: small business (LLC), not a nonprofit for now. Price to cover Eric's time plus a margin, with a sliding scale for small shelters.
- **Funding for small shelters**: the shelter runs its own fundraiser (e.g. GoFundMe charity fundraiser, so donations are tax-deductible) and then pays our invoice. We can supply a ready-made fundraising kit (blurb, goal, photos/stats).
- **Furniture plans use only parts stocked at Home Depot / Lowe's.** No furniture-grade specialty fittings. This is the main differentiator versus existing DIY plans.
- **Software strategy (leaning)**: integrate with shelters' existing systems before trying to replace them. Adopter app is the clearest gap in the market.

## Domain advisor

Eric's mom is an Animal Control Officer for the Town of Babylon, NY. She is the go-to person for real-world animal control workflow (calls, dispatch, field visits, records, licensing) and a likely first pilot user / reviewer.

## Engineering standards

- Apply Eric's engineering constitution to all software work: https://github.com/esanacore/engineering-constitution (add as a `constitution/` submodule when the first code repo is created).
- Solid, beginner-friendly code, simple comments, small focused changes, no unnecessary rewrites.
- Heavy automated testing, docs written alongside code, quality/security gates.
- Eric works on Windows (PowerShell), projects live in `C:\Projects`.

## Writing style for docs and guides

Concise, casual, readable. No em dashes. Plain words over jargon. Guides are picture-first so a volunteer can follow them with one trip to the hardware store.

## Layout

```
README.md                     Overview and how to view things
ROADMAP.md                    Plan series and software roadmap
docs/business-model.md        Pricing, funding, nonprofit vs LLC notes
docs/research/                Market research (furniture + software)
docs/product/app-vision.md    Admin + adopter app concept and open questions
plans/001-shelter-cot/        Plan 001: PVC shelter cot (guide.html + spec)
```

## Status

- Plan 001 (PVC Shelter Cot) is a **draft prototype, not yet build-tested**. Dimensions are calculated, not measured. First real task: build one, measure, and update the guide.
- Software: research only. No code yet.
