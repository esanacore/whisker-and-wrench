// Shared setup for the browser tests.
import { test as base, expect } from "@playwright/test";

// Every page we ship. Each one gets the mobile and accessibility checks.
export const PAGES = ["/", "/plans/", "/plans/001-shelter-cot/", "/404.html"];

// A test page that:
// - answers any request to another host (Google Fonts) with an empty
//   response, so tests don't depend on the network, and
// - collects console errors and page errors in `errors`.
export const test = base.extend({
  errors: async ({ page }, use) => {
    const errors = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    page.on("pageerror", (err) => errors.push(err.message));
    await page.route(
      (url) => url.hostname !== "127.0.0.1",
      (route) => route.fulfill({ status: 200, contentType: "text/css", body: "" }),
    );
    await use(errors);
  },
});

export { expect };
