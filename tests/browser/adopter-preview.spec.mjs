import { test, expect } from "./helpers.mjs";

test("FR-012: first weeks checklist walks a fictional adoption", async ({ page, errors }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/");
  await page.getByRole("link", { name: "Try the first weeks home checklist" }).click();
  await expect(page.getByRole("heading", { name: "First weeks home" })).toBeVisible();

  const status = page.getByRole("status");
  const summary = page.getByRole("region", { name: "Questions to confirm" });
  const advance = page.locator("#next-topic");

  await expect(status).toContainText("Food for the first days");
  await expect(page.getByRole("heading", { name: "Food for the first days" })).toBeVisible();
  await expect(page.getByText("not veterinary or legal advice")).toBeVisible();
  await expect(summary).toBeHidden();

  await advance.focus();
  await page.keyboard.press("Enter");
  await expect(status).toContainText("Grooming questions");
  await expect(page.getByRole("heading", { name: "Grooming questions" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Food for the first days" })).toBeHidden();

  await advance.click();
  await expect(status).toContainText("Prevention questions");
  await expect(page.getByText("does not name products or doses")).toBeVisible();

  await advance.click();
  await expect(status).toContainText("Vaccine papers");
  await expect(page.getByRole("heading", { name: "Vaccine papers" })).toBeVisible();

  await advance.click();
  await expect(status).toContainText("Town registration");
  await expect(advance).toHaveText("Show questions");
  await advance.click();

  await expect(summary).toBeVisible();
  await expect(summary).toContainText("Whether the town requires a license");
  await expect(summary).toContainText("does not sell pet insurance");
  await expect(page.getByRole("heading", { name: "Town registration" })).toBeHidden();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(375);

  await page.getByRole("button", { name: "Start over" }).click();
  await expect(status).toContainText("Food for the first days");
  await expect(summary).toBeHidden();
  await expect(page.getByRole("heading", { name: "Food for the first days" })).toBeVisible();

  await advance.click();
  await page.reload();
  await expect(status).toContainText("Food for the first days");
  await expect(summary).toBeHidden();
  await expect(page.evaluate(() => [localStorage.length, sessionStorage.length])).resolves.toEqual([0, 0]);
  expect(errors).toEqual([]);
});
