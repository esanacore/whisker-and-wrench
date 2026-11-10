import { test, expect } from "./helpers.mjs";

test("FR-008: walk a sample call through dispatch and shelter intake", async ({ page, errors }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Try the dispatch to intake preview" }).click();
  await expect(page.getByRole("heading", { name: "Dispatch to intake" })).toBeVisible();

  const status = page.getByRole("status");
  const handoff = page.getByRole("region", { name: "Shelter intake handoff" });
  const assign = page.getByRole("button", { name: "Assign to field officer" });
  await expect(status).toContainText("Reported");
  await expect(handoff).toBeHidden();
  await assign.focus();
  await page.keyboard.press("Enter");
  await expect(status).toContainText("Assigned");
  await page.getByRole("button", { name: "Record dog secured" }).click();
  await expect(status).toContainText("Dog secured");
  await expect(handoff).toBeHidden();

  await page.getByRole("button", { name: "Mark ready for intake" }).click();
  await expect(status).toContainText("Awaiting receipt");
  await expect(handoff).toBeHidden();
  await page.getByRole("button", { name: "Confirm shelter receipt" }).click();
  await expect(status).toContainText("Handed off");
  await expect(handoff).toBeVisible();
  await expect(handoff).toContainText("WW-001");
  await expect(handoff).toContainText("Maple Park trailhead");
  await expect(handoff).toContainText("Adult dog, identity unknown");
  await expect(handoff).toContainText("Officer secured the dog");
  await expect(handoff).toContainText("check for identification");

  await page.getByRole("button", { name: "Restart sample call" }).click();
  await expect(status).toContainText("Reported");
  await expect(handoff).toBeHidden();

  await assign.click();
  await page.reload();
  await expect(status).toContainText("Reported");
  await expect(handoff).toBeHidden();
  await expect(page.evaluate(() => [localStorage.length, sessionStorage.length])).resolves.toEqual([0, 0]);
  expect(errors).toEqual([]);
});

test("FR-009: intake delay keeps custody visible until a confirmed handoff", async ({ page, errors }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/software/");

  const delay = page.getByRole("button", { name: "Shelter intake unavailable" });
  const retry = page.getByRole("button", { name: "Retry shelter intake" });
  const pending = page.getByRole("region", { name: "Intake delay" });
  const handoff = page.getByRole("region", { name: "Shelter intake handoff" });
  const status = page.getByRole("status");

  await expect(delay).toBeHidden();
  await page.getByRole("button", { name: "Assign to field officer" }).click();
  await expect(delay).toBeHidden();
  await page.getByRole("button", { name: "Record dog secured" }).click();

  for (let attempt = 0; attempt < 2; attempt += 1) {
    await delay.focus();
    await page.keyboard.press("Enter");
    await expect(status).toContainText("Intake delayed");
    await expect(retry).toBeFocused();
    await expect(pending).toContainText("The field officer still has the dog");
    await expect(handoff).toBeHidden();
    await expect(delay).toBeHidden();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(375);
    await retry.click();
    await expect(status).toContainText("Dog secured");
    await expect(pending).toBeHidden();
    await expect(handoff).toBeHidden();
  }

  await page.getByRole("button", { name: "Mark ready for intake" }).click();
  await expect(status).toContainText("Awaiting receipt");
  await expect(handoff).toBeHidden();
  await page.getByRole("button", { name: "Confirm shelter receipt" }).click();
  await expect(handoff).toBeVisible();
  await expect(pending).toBeHidden();
  await page.getByRole("button", { name: "Restart sample call" }).click();
  await expect(status).toContainText("Reported");
  await expect(delay).toBeHidden();
  await expect(handoff).toBeHidden();
  expect(errors).toEqual([]);
});

test("FR-012: only shelter receipt completes the handoff", async ({ page, errors }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto("/software/");
  const status = page.getByRole("status");
  const decline = page.getByRole("button", { name: "Cannot confirm receipt" });
  const confirm = page.getByRole("button", { name: "Confirm shelter receipt" });
  const retry = page.getByRole("button", { name: "Retry shelter intake" });
  const handoff = page.getByRole("region", { name: "Shelter intake handoff" });

  await expect(confirm).toBeHidden();
  await page.getByRole("button", { name: "Assign to field officer" }).click();
  await page.getByRole("button", { name: "Record dog secured" }).click();
  const ready = page.getByRole("button", { name: "Mark ready for intake" });
  await expect(decline).toBeHidden();
  await ready.click();
  await expect(status).toContainText("The field officer retains custody");
  await expect(handoff).toBeHidden();

  await decline.focus();
  await page.keyboard.press("Enter");
  await expect(retry).toBeFocused();
  await expect(confirm).toBeHidden();
  await expect(status).toContainText("Intake delayed");
  await retry.click();
  await expect(confirm).toBeHidden();
  await ready.click();
  await confirm.click();
  await expect(handoff).toContainText("Shelter intake confirmed receipt for WW-001");
  await expect(decline).toBeHidden();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(375);

  await page.reload();
  await expect(status).toContainText("Reported");
  await expect(handoff).toBeHidden();
  expect(errors).toEqual([]);
});
