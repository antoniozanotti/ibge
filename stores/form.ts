import { defineStore } from "pinia";
import { z } from "zod";
import { CompositionType } from "~/types/CompositionType";
import type { Dataset } from "~/types/Dataset";

export const formSchema = z
  .object({
    research: z.string({
      required_error: "Pesquisa é obrigatório.",
    }),
    aggregated: z.string({
      required_error: "Agregado é obrigatório.",
    }),
    variable: z.string({
      required_error: "Variável é obrigatório.",
    }),
    periods: z
      .string()
      .array()
      .nonempty({ message: "Selecione ao menos um período." }),
    locations: z
      .string()
      .array()
      .nonempty({ message: "Selecione ao menos uma localidade." }),
    compositionType: z.string({
      required_error: "Tipo de Montagem é obrigatório.",
    }),
    chartStyle: z.string().optional(),
    dataGroup: z.string({
      required_error: "Grupo de Dados é obrigatório.",
    }),
  })
  .refine(
    (data) =>
      data.compositionType !== CompositionType.CHART ||
      (data.compositionType === CompositionType.CHART &&
        data.chartStyle !== undefined),
    {
      message: "Estilo do Gráfico é obrigatório.",
      path: ["chartStyle"],
    }
  );

export type FormSchema = z.output<typeof formSchema>;

export const useFormStore = defineStore("form", () => {
  const research = ref();
  const aggregated = ref();
  const variable = ref();
  const periods = ref<string[]>([]);
  const locations = ref<string[]>([]);
  const classifications = ref<string[]>([]);
  const dataGroup = ref();
  const legend = ref();
  const compositionType = ref();
  const chartStyle = ref();
  const isValid = ref(false);
  return {
    research,
    aggregated,
    variable,
    periods,
    locations,
    classifications,
    dataGroup,
    legend,
    compositionType,
    chartStyle,
    isValid,
  };
});
