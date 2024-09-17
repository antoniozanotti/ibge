export const ChartStyle = {
  BARS: "barras",
  LINES: "linhas",
  PIZZA: "pizza"
} as const;

export type ChartStyle = "barras" | "linhas" | "pizza";