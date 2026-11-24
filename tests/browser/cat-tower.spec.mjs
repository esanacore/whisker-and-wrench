// Plan 003 is a fit sheet, not a build guide (FR-016).
import { test, expect } from "./helpers.mjs";

const STEPS = [
  "Floor spot",
  "Overhead",
  "Path in",
  "How you clean",
  "Who uses it",
  "Write it down",
];

test("FR-016: cat tower sheet walks the fit checks and prints a blank sheet", async ({ page, errors }) => {
  await page.addInitScript(() => {
    window.print = () => document.body.setAttribute("data-print-requested", "");
  });
  await page.goto("/plans/");
  await page.getByRole("link", { name: "Modular Cat Tower" }).click();
  await expect(page).toHaveURL(/\/plans\/003-cat-tower\/$/);

  await expect(page.getByRole("heading", { level: 1 })).toContainText("Cat tower");
  await expect(page.locator("#sheet-notice")).toContainText("Not a build guide");
  await expect(page.locator("#sheet-notice")).toContainText("no cut list");
  await expect(page.locator("#sheet-notice")).toContainText("no shelf size");
  await expect(page.locator("#sheet-notice")).toContainText("no weight rating");

  const title = page.locator("#steps li:not(.is-quiet) h3");
  const back = page.locator("#prev");
  const next = page.locator("#next");
  await expect(back).toBeDisabled();

  for (const [n, name] of STEPS.entries()) {
    await expect(title).toHaveText(name);
    await expect(page.locator("#steps li.is-quiet")).toHaveCount(STEPS.length - 1);
    await expect(page.locator("#steps li.is-quiet").first()).toBeHidden();
    await expect(page.locator("#step-status")).toContainText(name);
    await expect(page.locator("#steps li:not(.is-quiet) svg")).toBeVisible();
    if (n < STEPS.length - 1) {
      await expect(next).toHaveText("Next");
      await next.click();
    }
  }

  await expect(next).toHaveText("Start over");
  await back.click();
  await expect(title).toHaveText(STEPS.at(-2));
  await next.click();
  await next.click();
  await expect(title).toHaveText(STEPS[0]);
  await expect(back).toBeDisabled();

  await expect(page.locator("#dots button")).toHaveCount(STEPS.length);
  await page.locator("#dots button").nth(3).click();
  await expect(title).toHaveText("How you clean");

  const mainText = await page.locator("main").innerText();
  expect(mainText).not.toMatch(/\d+\s*(inch|inches|ft|feet|mm|cm|lb|lbs|pound)/i);
  expect(mainText).not.toMatch(/\d+\s*\/\s*\d+/);
  expect(mainText).not.toMatch(/Schedule 40|[0-9]+″|[0-9]"/);

  const blanks = page.locator(".blank");
  const blankCount = await blanks.count();
  expect(blankCount).toBeGreaterThan(0);
  for (let i = 0; i < blankCount; i += 1) {
    await expect(blanks.nth(i)).not.toHaveText(/\d/);
  }

  await page.reload();
  await expect(title).toHaveText(STEPS[0]);
  const stored = await page.evaluate(() => localStorage.length + sessionStorage.length);
  expect(stored).toBe(0);

  await page.getByRole("button", { name: "Print fit sheet" }).click();
  await expect(page.locator("body")).toHaveAttribute("data-print-requested", "");
  await page.emulateMedia({ media: "print" });
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator("#sheet-notice")).toBeVisible();
  await expect(page.locator("#steps li")).toHaveCount(STEPS.length);
  for (const name of STEPS) {
    await expect(page.getByRole("heading", { level: 3, name })).toBeVisible();
  }
  await expect(next).toBeHidden();
  await expect(page.locator(".diagram").first()).toBeHidden();

  expect(errors).toEqual([]);
});

test("FR-016: cat tower sheet moves with the keyboard", async ({ page, errors }) => {
  await page.goto("/plans/003-cat-tower/");
  const title = page.locator("#steps li:not(.is-quiet) h3");
  await expect(title).toHaveText("Floor spot");
  await page.locator("#next").focus();
  await page.keyboard.press("Enter");
  await expect(title).toHaveText("Overhead");
  await page.keyboard.press("ArrowLeft");
  await expect(title).toHaveText("Floor spot");
  expect(errors).toEqual([]);
});
