import { test, expect } from "@playwright/test";

test.describe("Page", () => {
  test("should display page elements", async ({ page }) => {
    await page.goto("/");

    // Meta Title
    await expect(page).toHaveTitle(/IBGE/);

    // Title
    await expect(
      page.getByRole("heading", { level: 1, name: "IBGE" })
    ).toBeVisible();

    // Info
    await expect(
      page.getByText("Conforme você for selecionando as opções")
    ).toBeVisible();
  });
});
