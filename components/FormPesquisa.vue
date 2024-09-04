<template>
  <UFormGroup label="Pesquisa" name="pesquisa">
    <USelectMenu
      v-model="pesquisa"
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

const { isPending, data } = useAgregadosByPesquisaQuery();
const formStore = useFormStore();
const { pesquisa, agregado } = storeToRefs(formStore);

const placeholder = computed(() =>
  isPending.value ? "Carregando..." : "Selecione uma pesquisa"
);

const options = computed(() =>
  isPending.value
    ? []
    : data.value.map((pes: Pesquisa) => {
        return { label: pes.nome, value: pes.id };
      })
);

watch(pesquisa, () => {
  agregado.value = undefined;
});
</script>
