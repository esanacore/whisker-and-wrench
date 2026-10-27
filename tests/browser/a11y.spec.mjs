// Automated accessibility checks with axe (closes GAP-002 in docs/TEST_PLAN.md).
// Fails on any WCAG 2.x A or AA violation (which includes color contrast) and
// on axe best-practice problems like a missing <main> landmark.
import AxeBuilder from "@axe-core/playwright";
import { test, expect, PAGES } from "./helpers.mjs";

const TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"];

// Print one readable line per problem so failures are easy to fix.
function describe(violations) {
  return violations
    .map((v) => `${v.id}: ${v.help}\n  ${v.nodes.map((n) => n.target.join(" ")).join("\n  ")}`)
    .join("\n");
}

// Every page has a light and a dark palette, so check contrast in both.
for (const scheme of ["light", "dark"]) {
  for (const path of PAGES) {
    test(`${path} has no axe violations (${scheme})`, async ({ page, errors }) => {
      await page.emulateMedia({ colorScheme: scheme });
      await page.goto(path);
      const { violations } = await new AxeBuilder({ page }).withTags(TAGS).analyze();
      expect(violations, describe(violations)).toEqual([]);
      expect(errors).toEqual([]);
    });
  }
}

test("Plan 001 stepper works from the keyboard", async ({ page, errors }) => {
  await page.goto("/plans/001-shelter-cot/");
  const title = page.locator("#sTitle");
  await expect(title).toHaveText("Cut the pipe");
  await page.locator("#next").focus();
  await page.keyboard.press("Enter");
  await expect(title).toHaveText("Build the leg assemblies");
  await page.keyboard.press("ArrowLeft");
  await expect(title).toHaveText("Cut the pipe");
  // Every step dot is a real button you can tab to.
  await expect(page.locator("#dots button")).toHaveCount(11);
  expect(errors).toEqual([]);
});
