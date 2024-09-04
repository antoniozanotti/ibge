import { defineStore } from "pinia";
import type { Pesquisa } from "~/types/Pesquisa";

export const useFormStore = defineStore("form", () => {
  const agregadosPorPesquisa = ref<Pesquisa[]>();
  const pesquisa = ref("");
  const agregado = ref("");
  const variaveis = ref<string[]>([]);
  return { agregadosPorPesquisa, pesquisa, agregado, variaveis };
});
