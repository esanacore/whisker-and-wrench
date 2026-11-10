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

  await page.getByRole("button", { name: "Complete shelter handoff" }).click();
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
