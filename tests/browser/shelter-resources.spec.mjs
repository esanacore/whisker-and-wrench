import { test, expect } from "./helpers.mjs";

test("FR-010 and FR-011: shelter fundraising starter leads to the printable cot list", async ({ page, errors }) => {
  await page.addInitScript(() => {
    window.print = () => document.body.setAttribute("data-print-requested", "");
  });
  await page.emulateMedia({ colorScheme: "dark" });
  await page.goto("/shelters/");
  await page.getByRole("link", { name: "fundraising starter", exact: true }).click();
  await expect(page).toHaveURL(/#fundraising-starter$/);
  await expect(page.getByRole("heading", { name: "Set a target" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Draft the appeal" })).toBeVisible();
  await page.getByRole("link", { name: "See the cot shopping list" }).click();
  await expect(page).toHaveURL(/\/plans\/001-shelter-cot\/#shopping-list$/);

  const print = page.getByRole("button", { name: "Print shopping list" });
  const shopping = page.locator("#shopping-list");
  await expect(page.locator("#build")).toBeVisible();
  await expect(shopping.locator("#shop .row")).toHaveCount(10);
  await print.click();
  await expect(page.locator("body")).toHaveAttribute("data-print-requested", "");

  await page.emulateMedia({ media: "print" });
  await expect(page.getByRole("heading", { name: "PVC Shelter Cot" })).toBeVisible();
  await expect(page.getByText("Prototype · not yet build-tested")).toBeVisible();
  await expect(shopping.getByText("PVC primer + PVC cement")).toBeVisible();
  await expect(shopping.getByText("Drill,", { exact: false })).toBeVisible();
  await expect(shopping).toHaveCSS("color", "rgb(0, 0, 0)");
  await expect(print).toBeHidden();
  await expect(page.locator("#build")).toBeHidden();
  expect(errors).toEqual([]);
});
