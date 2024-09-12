import { defineStore } from "pinia";
import { z } from "zod";

export const formSchema = z
  .object({
    pesquisa: z.string({
      required_error: "Pesquisa é obrigatório.",
    }),
    agregado: z.string({
      required_error: "Agregado é obrigatório.",
    }),
    variavel: z.string({
      required_error: "Variável é obrigatório.",
    }),
    periodos: z
      .string({ required_error: "Selecione ao menos um período." })
      .array(),
    localidades: z
      .string({ required_error: "Selecione ao menos uma localidade." })
      .array(),
    tipoMontagem: z.string({
      required_error: "Tipo de Montagem é obrigatório.",
    }),
    estiloGrafico: z.string().optional(),
    grupoDeDados: z.string({
      required_error: "Grupo de Dados é obrigatório.",
    }),
    largura: z.coerce
      .number({
        required_error: "Largura é obrigatório.",
        invalid_type_error: "Largura deve ser um número.",
      })
      .positive({
        message: "Largura deve ser um número positivo.",
      }),
  })
  .refine(
    (data) =>
      data.tipoMontagem !== "grafico" ||
      (data.tipoMontagem === "grafico" && data.estiloGrafico !== undefined),
    {
      message: "Estilo do Gráfico é obrigatório.",
      path: ["estiloGrafico"],
    }
  );

export type FormSchema = z.output<typeof formSchema>;

export const useFormStore = defineStore("form", () => {
  const pesquisa = ref();
  const agregado = ref();
  const variavel = ref();
  const periodos = ref<string[]>([]);
  const localidades = ref<string[]>([]);
  const classificacoes = ref<string[]>([]);
  const tipoMontagem = ref();
  const estiloGrafico = ref();
  const grupoDeDados = ref();
  const largura = ref(500);
  const ibgeData = ref();
  const isValid = ref(false);
  return {
    pesquisa,
    agregado,
    variavel,
    periodos,
    localidades,
    classificacoes,
    tipoMontagem,
    estiloGrafico,
    grupoDeDados,
    largura,
    ibgeData,
    isValid
  };
});
