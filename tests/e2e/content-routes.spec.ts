import { expect, test } from "@playwright/test";

const contentRoutes = [
  "/services/custom-software-development",
  "/services/ai-integration",
  "/services/mvp-development",
  "/modernization/incremental-migration",
  "/industries/operations-heavy-businesses",
  "/industries/software-saas-technology",
  "/work/ai-assisted-intake-workflow",
  "/insights/ai-integration-needs-evaluation"
];

test("published content detail routes render", async ({ page }) => {
  for (const route of contentRoutes) {
    const response = await page.goto(route);
    expect(response?.status(), route).toBe(200);
    await expect(page.locator("main h1")).toBeVisible();
  }
});
