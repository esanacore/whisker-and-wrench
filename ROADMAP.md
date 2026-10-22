# Roadmap

## Done

- 2026-10-16: Public repo (esanacore/whisker-and-wrench), MIT for code, CC BY-NC 4.0 for plans, engineering constitution adopted.
- 2026-10-16: Static site for whiskerandwrench.com (home, plans index, Plan 001 at `/plans/001-shelter-cot/`), CI with HTML validation and link checks, deploy workflow for Cloudflare Pages.
- 2026-10-22: Site live at https://whiskerandwrench.com.

## Website next steps

1. Decide on `www` and the extra domains (whiskerandwrench.org, whiskerwrench.com) as redirects.
2. Add a "for shelters" page: how to request a build, sliding scale, fundraising kit.
3. Turn on Cloudflare Web Analytics (cookie-free) once there's traffic worth measuring.

## Furniture plan series

| # | Plan | Notes | Status |
|---|------|-------|--------|
| 001 | PVC Shelter Cot, medium | Raised dog bed, 1" Sch 40, standard tees/elbows | Draft, needs a test build |
| 002 | Kitty Cot | Small raised bed that fits a cat kennel | Planned |
| 003 | Modular Cat Tower | PVC posts, wipeable non-porous shelves, comes apart fast for cleaning | Planned |
| 004 | Play Yard Platform | Low dog bench / lookout for outdoor runs | Planned |
| 005 | Raised Feeding Stand | Two-bowl stand, hose-down friendly | Planned |

Also: small and large versions of 001 (only B, C and fabric lengths change).

### Next steps for plans

1. Build Plan 001, measure actual fitting depths, correct cut lengths, photograph it.
2. Load-test it (target weight TBD) and record results in the plan README.
3. Price the parts list at a real store.
4. Turn the guide renderer (isometric SVG in guide.html) into a reusable template so new plans are mostly data.

## Software

1. Interview Mom (ACO, Town of Babylon NY) about a day of animal control work: calls, dispatch, field visits, records, licensing, what software they use now and what's painful.
2. Talk to 3 to 5 shelters about what they'd pay for.
3. Decide: adopter app first (integrating with existing systems) vs admin/field app first.
4. Spike integrations: Animal Shelter Manager (open source), Shelterluv, Petfinder.
5. Write a product brief. App code can live in this repo (constitution already set up) or a new one with the same submodule.
