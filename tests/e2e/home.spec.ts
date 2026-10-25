import { expect, test } from "@playwright/test";

test("homepage renders and mobile navigation opens", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /Build what’s next\. Improve what’s already there/i })
  ).toBeVisible();
  await page.setViewportSize({ width: 1280, height: 900 });
  const lightBackground = await page
    .locator("body")
    .evaluate((element) => {
      const style = getComputedStyle(element);
      return `${style.backgroundColor}|${style.backgroundImage}`;
    });
  const themeToggle = page.getByRole("button", { name: "Switch to dark mode" });
  await themeToggle.click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  const darkBackground = await page
    .locator("body")
    .evaluate((element) => {
      const style = getComputedStyle(element);
      return `${style.backgroundColor}|${style.backgroundImage}`;
    });
  expect(darkBackground).not.toBe(lightBackground);
  await page.reload();
  await expect(page.getByRole("button", { name: "Switch to light mode" })).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Switch to light mode" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");

  const workflowStep = page.getByRole("tab", {
    name: /Choose the next change|Plan scope & architecture/i
  });
  await workflowStep.click();
  await expect(page.locator("#workflow-detail")).toContainText(
    /Set a focused release boundary|Set explicit delivery boundaries/i
  );
  await workflowStep.press("ArrowLeft");
  await expect(
    page.getByRole("tab", { name: /Understand the system|Understand the problem/i })
  ).toHaveAttribute("aria-selected", "true");

  await page.goto("/services");
  await expect(
    page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", {
      name: "Services",
      exact: true
    })
  ).toHaveAttribute("aria-current", "page");
  await page.goto("/");
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: /open navigation/i }).click();
  await expect(
    page.getByRole("navigation", { name: "Mobile navigation" }).getByRole("link", {
      name: "Services",
      exact: true
    })
  ).toBeVisible();
  await page.getByRole("button", { name: "Switch to dark mode" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.getByRole("button", { name: "Switch to light mode" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await page.mouse.click(10, 820);
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeHidden();
  await page.getByRole("button", { name: /open navigation/i }).click();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("button", { name: /open navigation/i })).toBeFocused();

  await expect(page.getByRole("link", { name: /AI-assisted intake/i })).toHaveAttribute(
    "href",
    "/work/ai-assisted-intake-workflow"
  );
});
