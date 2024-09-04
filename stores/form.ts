import { defineStore } from "pinia";
import type { Pesquisa } from "~/types/Pesquisa";

export const useFormStore = defineStore("form", () => {
  const pesquisa = ref("");
  const agregado = ref("");
  const variaveis = ref<string[]>([]);
  const periodos = ref<string[]>([]);
  return { pesquisa, agregado, variaveis, periodos };
});
