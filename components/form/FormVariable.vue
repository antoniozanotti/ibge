<template>
  <UFormGroup
    label="Variável"
    name="variable"
    help="Será a unidade de medida principal."
    required
  >
    <USelectMenu
      v-model="variable"
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
import type { Variable } from "@/types/Variable";
import { useGetAggregatedByIdQuery } from "~/composables/api/ibge/useGetAggregatedByIdQuery";

const formStore = useFormStore();
const { aggregated, variable } = storeToRefs(formStore);
const { isPending, data } = useGetAggregatedByIdQuery(aggregated);

const placeholder = computed(() =>
  isPending.value ? "Carregando..." : "Selecione um ou mais variáveis"
);

const options = computed(() =>
  !!data.value
    ? data.value.variaveis.map((variable: Variable) => {
        return { label: variable.nome, value: variable.id.toString() };
      })
    : []
);
</script>
