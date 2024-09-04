<template>
  <UFormGroup
    label="Classificações"
    name="classificacoes"
    v-if="agregado && options.length > 0"
  >
    <UFormGroup
      :label="option.label"
      :name="`classificacoes[${option.id}]`"
      v-for="option of options"
    >
      <USelectMenu
        v-model="classificacoes"
        :options="option.options"
        valueAttribute="value"
        :loading="isPending"
        :placeholder="placeholder"
        :multiple="true"
      />
    </UFormGroup>
  </UFormGroup>
</template>

<script setup lang="ts">
import { useFormStore } from "@/stores/form";
import { storeToRefs } from "pinia";
import { useAgregadoByIdQuery } from "~/composables/useAgregadoByIdQuery";
import type { Categoria } from "~/types/Categoria";

const formStore = useFormStore();
const { agregado, classificacoes } = storeToRefs(formStore);

const placeholder = computed(() =>
  isPending.value ? "Carregando..." : "Selecione uma ou mais"
);

const { isPending, data } = useAgregadoByIdQuery(agregado);

const options = computed(() => {
  let opts = [];
  if (agregado.value && !isPending.value) {
    const classificacoesArray = data.value.classificacoes;
    for (const classificacao of classificacoesArray) {
      opts.push({
        id: classificacao.id,
        label: classificacao.nome,
        options: classificacao.categorias.map((cat: Categoria) => {
          return {
            label: cat.nome,
            value: `${classificacao.id}_${cat.id}`,
          };
        }),
      });
    }
  }
  return opts;
});
</script>
