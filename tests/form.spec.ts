import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";

test.describe("Form", () => {
  test("should display form elements", async ({ page }) => {
    await page.goto("/");
    // should display 1ª Stage: Research
    await expect(
      page.getByRole("heading", { level: 2, name: "1ª Etapa: pesquisa" })
    ).toBeVisible();

    // should display research field
    await page.getByText("Selecione uma pesquisa").click();
    await page.getByText("Áreas Urbanizadas").click();

    // should display 2ª Stage: Aggregated
    await expect(
      page.getByRole("heading", { level: 2, name: "2ª Etapa: agregado" })
    ).toBeVisible();

    // should display aggregated field
    await page.getByText("Selecione um agregado").click();
    await page
      .getByText(
        "Áreas urbanizadas, Loteamento vazio, Área total mapeada e Subcategorias"
      )
      .click();

    // should display 3ª Stage: Filters
    await expect(
      page.getByRole("heading", { level: 2, name: "3ª Etapa: filtros" })
    ).toBeVisible();

    // should display variable field
    await page.getByText("Selecione uma ou mais variáveis").click();
    await page.getByText("Áreas urbanizadas densas").click();

    // should display periods field
    await page.getByText("Selecione um ou mais períodos").click();
    await page.getByText("2019").click();

    // should display locations field
    await page
      .getByLabel("Grande região")
      .filter({ hasText: "Selecione um ou mais" })
      .click();
    await page.getByText("Norte").click();
    await page.getByText("Nordeste").click();
    await page.getByText("Sudeste").click();

    // should display 4ª Stage: Composition
    await expect(
      page.getByRole("heading", { level: 2, name: "4ª Etapa: montagem" })
    ).toBeVisible();

    // should display data group field
    await page.getByLabel("Variável, Período, Localidades").click();

    // should display legend field
    await page.getByLabel("Legenda").fill("Exemplo de Legenda");

    // should display composition type field
    await page.getByLabel("Tabela").click();

    // should display finish button
    await page.getByText("Finalizar").click();

    // should display result
    await expect(
      page.getByRole("heading", { level: 2, name: "Resultado" })
    ).toBeVisible();

    // should display Table Heading
    const tableHeading = ["Norte", "Nordeste", "Sudeste"];
    const ths = await page.locator("table th").all();
    ths.forEach((cell, cellIndex) => {
      expect(cell).toContainText(tableHeading[cellIndex]);
    });

    // should display Table Body
    const tableBody = ["2810.76", "8218.07", "13968.69"];
    const tds = await page.locator("table td").all();
    tds.forEach((cell, cellIndex) => {
      expect(cell).toContainText(tableBody[cellIndex]);
    });
  });

  test("should display classifications", async ({ page }) => {
    await page.goto("/");
    // should display 1ª Stage: Research
    await expect(
      page.getByRole("heading", { level: 2, name: "1ª Etapa: pesquisa" })
    ).toBeVisible();

    // should display research field
    await page.getByText("Selecione uma pesquisa").click();
    await page.getByText("Cadastro Central de Empresas").click();

    // should display 2ª Stage: Aggregated
    await expect(
      page.getByRole("heading", { level: 2, name: "2ª Etapa: agregado" })
    ).toBeVisible();

    // should display aggregated field
    await page.getByText("Selecione um agregado").click();
    await page
      .getByText(
        "Dados gerais das empresas por faixas de pessoal ocupado total, segundo seção, divisão e grupo da classificação de atividades, em nível Brasil, Grandes Regiões e Unidades da Federação da sede da empresa"
      )
      .click();

    // should display 3ª Stage: Filters
    await expect(
      page.getByRole("heading", { level: 2, name: "3ª Etapa: filtros" })
    ).toBeVisible();

    // should display variable field
    await page.getByText("Selecione uma ou mais variáveis").click();
    await page.getByText("Número de empresas", { exact: true }).click();

    // should display periods field
    await page.getByText("Selecione um ou mais períodos").click();
    await page.getByText("2006").click();
    await page.getByText("2005").click();
    await page.getByText("2004").click();

    // should display locations field
    await page.getByLabel("Grande região").click();
    await page.getByText("Norte").click();

    await page.getByLabel("Faixas de pessoal ocupado").click();

    await page.getByText("0 a 4", { exact: true }).click();
    await page.getByText("5 a 9", { exact: true }).click();
    await page.getByText("10 a 19", { exact: true }).click();

    // should display 4ª Stage: Composition
    await expect(
      page.getByRole("heading", { level: 2, name: "4ª Etapa: montagem" })
    ).toBeVisible();

    // should display data group field
    await page
      .getByLabel("Variável, Período, Localidade, Classificações")
      .click();

    // should display legend field
    await page.getByLabel("Legenda").fill("Exemplo de Legenda");

    // should display composition type field
    await page.getByLabel("Gráfico").click();

    // should display chart style field
    await page.getByLabel("Barras").click();

    // should display finish button
    await page.getByText("Finalizar").click();

    // should display result
    await expect(
      page.getByRole("heading", { level: 2, name: "Resultado" })
    ).toBeVisible();

    await expect(page.locator("#my-chart-id")).toBeVisible();
  });
});
