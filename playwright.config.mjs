// Browser tests for the built site (see docs/TEST_PLAN.md).
// Run `bash scripts/build-site.sh` first, then `npx playwright test`.
// scripts/test-site.sh does both.
import { defineConfig, devices } from "@playwright/test";

const port = 4173;

export default defineConfig({
  testDir: "tests/browser",
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: "list",
  use: {
    baseURL: `http://127.0.0.1:${port}`,
    ...devices["Desktop Chrome"],
  },
  webServer: {
    command: `node scripts/serve-dist.mjs ${port}`,
    url: `http://127.0.0.1:${port}/`,
    reuseExistingServer: !process.env.CI,
  },
});
