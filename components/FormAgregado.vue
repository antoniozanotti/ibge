<template>
  <UFormGroup label="Agregado *" name="agregado" v-if="pesquisa">
    <USelectMenu
      v-model="agregado"
      :options="options"
      valueAttribute="value"
      :loading="isPending"
      :placeholder="placeholder"
    />
  </UFormGroup>
</template>

<script setup lang="ts">
import { useFormStore } from "@/stores/form";
import { storeToRefs } from "pinia";
import { useAgregadosByPesquisaQuery } from "@/composables/useAgregadosByPesquisaQuery";
import type { Pesquisa } from "~/types/Pesquisa";
import type { Agregado } from "~/types/Agregado";

const { isPending, data } = useAgregadosByPesquisaQuery();
const formStore = useFormStore();
const { pesquisa, agregado, variavel, periodos, localidades, classificacoes } =
  storeToRefs(formStore);

const placeholder = computed(() =>
  isPending.value ? "Carregando..." : "Selecione um agregado"
);

const options = computed(() =>
  pesquisa.value && !isPending.value
    ? data.value
        .filter((p: Pesquisa) => p.id === pesquisa.value)[0]
        .agregados.map((a: Agregado) => {
          return { label: a.nome, value: a.id };
        })
    : []
);

watch(agregado, () => {
  variavel.value = undefined;
  periodos.value = undefined;
  localidades.value = undefined;
  classificacoes.value = undefined;
});
</script>
