import { defineStore } from "pinia";
import { z } from "zod";

export const formSchema = z.object({
  pesquisa: z.string({
    required_error: "Pesquisa é obrigatório",
  }),
  agregado: z.string({
    required_error: "Agregado é obrigatório",
  }),
  variavel: z.string({
    required_error: "Variável é obrigatório",
  }),
  periodos: z
    .string({ required_error: "Selecione ao menos um período" })
    .array(),
  localidades: z
    .string({ required_error: "Selecione ao menos uma localidade" })
    .array(),
});

export type FormSchema = z.output<typeof formSchema>;

export const useFormStore = defineStore("form", () => {
  const pesquisa = ref();
  const agregado = ref();
  const variavel = ref();
  const periodos = ref<string[]>();
  const localidades = ref<string[]>();
  const classificacoes = ref<string[]>();
  const tipoMontagem = ref();
  const estiloGrafico = ref();
  const grupoDeDados = ref();
  const largura = ref("500")
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
    largura
  };
});
