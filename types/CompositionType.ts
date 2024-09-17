export const CompositionType = {
  TABLE: "tabela",
  CHART: "grafico"
} as const;

export type CompositionType = "tabela" | "grafico";