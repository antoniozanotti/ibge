import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("Form", () => {
  test("should display form elements", async ({ page }) => {
    await page.goto("/");

    /*await test.step("should match screenshot", async () => {
      await page.waitForLoadState('domcontentloaded');
      await expect(page).toHaveScreenshot();
    });*/

    await test.step("should display 1ª Stage: Research", async () => {
      await expect(
        page.getByRole("heading", { level: 2, name: "1ª Etapa: pesquisa" })
      ).toBeVisible();
    });

    await test.step("should display research field", async () => {
      await page.getByText("Selecione uma pesquisa").click();
      await page.getByText("Áreas Urbanizadas").click();
    });

    await test.step("should display 2ª Stage: Aggregated", async () => {
      await expect(
        page.getByRole("heading", { level: 2, name: "2ª Etapa: agregado" })
      ).toBeVisible();
    });

    await test.step("should display aggregated field", async () => {
      await page.getByText("Selecione um agregado").click();
      await page
        .getByText(
          "Áreas urbanizadas, Loteamento vazio, Área total mapeada e Subcategorias"
        )
        .click();
    });

    await test.step("should display 3ª Stage: Filters", async () => {
      await expect(
        page.getByRole("heading", { level: 2, name: "3ª Etapa: filtros" })
      ).toBeVisible();
    });

    await test.step("should display variable field", async () => {
      await page.getByText("Selecione uma ou mais variáveis").click();
      await page.getByText("Áreas urbanizadas densas").click();
    });

    await test.step("should display periods field", async () => {
      await page.getByText("Selecione um ou mais períodos").click();
      await page.getByText("2019").click();
    });

    await test.step("should display locations field", async () => {
      await page
        .getByLabel("Grande região")
        .filter({ hasText: "Selecione um ou mais" })
        .click();
      await page.getByText("Norte").click();
      await page.getByText("Nordeste").click();
      await page.getByText("Sudeste").click();
    });

    await test.step("should display 4ª Stage: Composition", async () => {
      await expect(
        page.getByRole("heading", { level: 2, name: "4ª Etapa: montagem" })
      ).toBeVisible();
    });

    await test.step("should display data group field", async () => {
      await page.getByLabel("Variável, Período, Localidades").click();
    });

    await test.step("should display legend field", async () => {
      await page.getByLabel("Legenda").fill("Exemplo de Legenda");
    });

    await test.step("should display composition type field", async () => {
      await page.getByLabel("Tabela").click();
    });

    await test.step("should display finish button", async () => {
      await page.getByText("Finalizar").click();
    });

    await test.step("should display result", async () => {
      await expect(
        page.getByRole("heading", { level: 2, name: "Resultado" })
      ).toBeVisible();
    });

    await test.step("should display Table Heading", async () => {
      const tableHeading = ["Norte", "Nordeste", "Sudeste"];
      const ths = await page.locator("table th").all();
      ths.forEach((cell, cellIndex) => {
        expect(cell).toContainText(tableHeading[cellIndex]);
      });
    });

    await test.step("should display Table Body", async () => {
      const tableBody = ["2810.76", "8218.07", "13968.69"];
      const tds = await page.locator("table td").all();
      tds.forEach((cell, cellIndex) => {
        expect(cell).toContainText(tableBody[cellIndex]);
      });
    });
  });

  test("should display classifications", async ({ page }) => {
    await page.goto("/");

    await test.step("should display 1ª Stage: Research", async () => {
      await expect(
        page.getByRole("heading", { level: 2, name: "1ª Etapa: pesquisa" })
      ).toBeVisible();
    });

    await test.step("should display research field", async () => {
      await page.getByText("Selecione uma pesquisa").click();
      await page.getByText("Cadastro Central de Empresas").click();
    });

    await test.step("should display 2ª Stage: Aggregated", async () => {
      await expect(
        page.getByRole("heading", { level: 2, name: "2ª Etapa: agregado" })
      ).toBeVisible();
    });

    await test.step("should display aggregated field", async () => {
      await page.getByText("Selecione um agregado").click();
      await page
        .getByText(
          "Dados gerais das empresas por faixas de pessoal ocupado total, segundo seção, divisão e grupo da classificação de atividades, em nível Brasil, Grandes Regiões e Unidades da Federação da sede da empresa"
        )
        .click();
    });

    await test.step("should display 3ª Stage: Filters", async () => {
      await expect(
        page.getByRole("heading", { level: 2, name: "3ª Etapa: filtros" })
      ).toBeVisible();
    });

    await test.step("should display variable field", async () => {
      await page.getByText("Selecione uma ou mais variáveis").click();
      await page.getByText("Número de empresas", { exact: true }).click();
    });

    await test.step("should display periods field", async () => {
      await page.getByText("Selecione um ou mais períodos").click();
      await page.getByText("2006").click();
      await page.getByText("2005").click();
      await page.getByText("2004").click();
    });

    await test.step("should display locations field", async () => {
      await page.getByLabel("Grande região").click();
      await page.getByText("Norte").click();

      await page.getByLabel("Faixas de pessoal ocupado").click();

      await page.getByText("0 a 4", { exact: true }).click();
      await page.getByText("5 a 9", { exact: true }).click();
      await page.getByText("10 a 19", { exact: true }).click();
    });

    await test.step("should display 4ª Stage: Composition", async () => {
      await expect(
        page.getByRole("heading", { level: 2, name: "4ª Etapa: montagem" })
      ).toBeVisible();
    });

    await test.step("should display data group field", async () => {
      await page
        .getByLabel("Variável, Período, Localidade, Classificações")
        .click();
    });

    await test.step("should display legend field", async () => {
      await page.getByLabel("Legenda").fill("Exemplo de Legenda");
    });

    await test.step("should display composition type field", async () => {
      await page.getByLabel("Gráfico").click();
    });

    await test.step("should display chart style field", async () => {
      await page.getByLabel("Barras").click();
    });

    await test.step("should display finish button", async () => {
      await page.getByText("Finalizar").click();
    });

    await test.step("should display result", async () => {
      await expect(
        page.getByRole("heading", { level: 2, name: "Resultado" })
      ).toBeVisible();

      await expect(page.locator("#my-chart-id")).toBeVisible();
    });

    await test.step("should not be have accessibility issues", async () => {
      const accessibilityScanResults = await new AxeBuilder({ page })
        .options({ rules: { "nested-interactive": { enabled: false } } })
        .analyze();
      expect(accessibilityScanResults.violations).toEqual([]);
    });
  });
});
