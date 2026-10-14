import { expect, test } from "@playwright/test";

test("enquiry form validates and reports the server result", async ({ page }) => {
  await page.goto("/start-project");
  await page.getByRole("button", { name: /send enquiry/i }).click();
  await expect(page.getByText(/Enter your name/i)).toBeVisible();
  await page.getByLabel("Name").fill("Avery Stone");
  await page.getByLabel("Work email").fill("avery@example.com");
  await page.getByLabel("Company").fill("Example Co");
  await page
    .getByLabel("Describe the challenge")
    .fill("We need help improving a legacy application and exploring AI workflow support.");
  await page.getByLabel(/I understand/i).check();
  await page.getByRole("button", { name: /send enquiry/i }).click();
  await expect(page.getByRole("status")).toContainText(
    /Development mode|received|could not save|temporarily unavailable/i
  );
});
