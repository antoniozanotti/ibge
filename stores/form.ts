import { defineStore } from "pinia";
import { z } from "zod";

export const formSchema = z.object({
  pesquisa: z.string({
    required_error: "Pesquisa é obrigatório",
  }),
  agregado: z.string({
    required_error: "Agregado é obrigatório",
  }),
  variaveis: z
    .string({ required_error: "Selecione ao menos uma variável" })
    .array(),
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
  const variaveis = ref<string[]>();
  const periodos = ref<string[]>();
  const localidades = ref<string[]>();
  const classificacoes = ref<string[]>();
  return {
    pesquisa,
    agregado,
    variaveis,
    periodos,
    localidades,
    classificacoes,
  };
});
