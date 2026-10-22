// Browser smoke tests (closes GAP-001 in docs/TEST_PLAN.md).
// 1. The Plan 001 guide stepper works from first step to last and back.
// 2. Pages fit a 375px phone screen without sideways scrolling.
import { test, expect, PAGES } from "./helpers.mjs";

// Step titles in plans/001-shelter-cot/guide.html, in order.
const COT_STEPS = [
  "Cut the pipe",
  "Build the leg assemblies",
  "Build the long sides",
  "Add the corner elbows",
  "Close the frame",
  "Glue every joint",
  "Cut the fabric",
  "Fasten the first short side",
  "Stretch the other side",
  "Fasten the long sides",
  "Flip it and check",
];

test("Plan 001 stepper walks through every step", async ({ page, errors }) => {
  await page.goto("/plans/001-shelter-cot/");
  const title = page.locator("#sTitle");
  const art = page.locator("#sStage svg");
  const next = page.locator("#next");
  const back = page.locator("#prev");

  // First step: Back is off.
  await expect(back).toBeDisabled();

  for (const [n, name] of COT_STEPS.entries()) {
    await expect(title).toHaveText(name);
    await expect(page.locator("#sNum")).toContainText(String(n + 1));
    await expect(art).toBeVisible();
    // The drawing has real shapes in it, not an empty <svg>.
    expect(await art.locator("path, line, rect, circle, polygon").count()).toBeGreaterThan(0);
    if (n < COT_STEPS.length - 1) {
      await expect(next).toHaveText("Next");
      await next.click();
    }
  }

  // Last step: the button starts over.
  await expect(next).toHaveText("Start over");
  await expect(page.locator("#sEye")).toHaveText("Last step");

  // Back goes to the step before.
  await back.click();
  await expect(title).toHaveText(COT_STEPS.at(-2));
  await next.click();

  // Start over goes back to step 1.
  await next.click();
  await expect(title).toHaveText(COT_STEPS[0]);
  await expect(back).toBeDisabled();

  expect(errors).toEqual([]);
});

for (const path of PAGES) {
  test(`${path} fits a 375px screen`, async ({ page, errors }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(path);
    const sizes = await page.evaluate(() => ({
      scroll: document.documentElement.scrollWidth,
      client: document.documentElement.clientWidth,
    }));
    expect(sizes.scroll, "page scrolls sideways").toBeLessThanOrEqual(sizes.client);
    expect(errors).toEqual([]);
  });
}
