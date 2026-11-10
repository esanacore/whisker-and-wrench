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

test("FR-013: estimate a local fundraising target with valid whole dollars", async ({ page, errors }) => {
  await page.goto("/shelters/#fundraising-starter");
  const costs = page.getByLabel("Project costs ($)", { exact: true });
  const fees = page.getByLabel("Expected fees ($)", { exact: true });
  const pledges = page.getByLabel("Confirmed pledges ($)", { exact: true });
  const calculate = page.getByRole("button", { name: "Calculate target" });
  const target = page.locator("#project-target");
  const requests = [];
  page.on("request", (request) => requests.push(request.url()));

  await calculate.click();
  await expect(target).toBeEmpty();
  await costs.fill("1200");
  await fees.fill("30");
  await pledges.fill("200");
  await pledges.press("Enter");
  await expect(target).toHaveText("Estimated amount to raise: $1,030");

  await costs.fill("1200.5");
  await expect(target).toBeEmpty();
  await calculate.click();
  await expect(target).toBeEmpty();
  await costs.fill("-1");
  await calculate.click();
  await expect(target).toBeEmpty();
  await costs.fill("1000001");
  await calculate.click();
  await expect(target).toBeEmpty();

  await costs.fill("100");
  await calculate.click();
  await expect(target).toHaveText("Estimated amount to raise: $0");
  await expect(page).toHaveURL(/\/shelters\/#fundraising-starter$/);
  expect(requests).toEqual([]);
  await page.reload();
  await expect(costs).toBeEmpty();
  await expect(target).toBeEmpty();
  expect(errors).toEqual([]);
});

test("FR-014: check cot supplies, clear them, and keep print uncluttered", async ({ page, errors }) => {
  await page.goto("/plans/001-shelter-cot/#shopping-list");
  const shopping = page.locator("#shopping-list");
  const progress = page.locator("#shopping-count");
  const supplies = shopping.getByRole("checkbox");
  await expect(supplies).toHaveCount(8);
  await expect(progress).toHaveText("0 of 8 supply lines checked");

  const elbows = shopping.getByRole("checkbox", { name: "1″ 90° elbow" });
  await expect(elbows).toHaveAccessibleDescription("4");
  await elbows.focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.locator("#sTitle")).toHaveText("Cut the pipe");
  await page.keyboard.press("Space");
  await expect(elbows).toBeChecked();
  await expect(progress).toHaveText("1 of 8 supply lines checked");

  await page.emulateMedia({ media: "print" });
  await expect(elbows).toBeHidden();
  await expect(progress).toBeHidden();
  await expect(shopping.getByText("1″ 90° elbow", { exact: true })).toBeVisible();

  await page.emulateMedia({ media: "screen" });
  await expect(elbows).toBeChecked();
  await shopping.getByRole("button", { name: "Clear checks" }).click();
  await expect(elbows).not.toBeChecked();
  await expect(progress).toHaveText("0 of 8 supply lines checked");
  await elbows.check();
  await page.reload();
  await expect(elbows).not.toBeChecked();
  await expect(progress).toHaveText("0 of 8 supply lines checked");
  expect(errors).toEqual([]);
});
