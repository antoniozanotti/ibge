<template>
  <UFormGroup label="Agregado" name="aggregated" required>
    <USelectMenu
      v-model="aggregated"
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
import { useGetAggregatesByResearchQuery } from "~/composables/api/ibge/useGetAggregatesByResearchQuery";
import type { Research } from "~/types/Research";
import type { Aggregated } from "~/types/Aggregated";

const formStore = useFormStore();
const { research, aggregated } = storeToRefs(formStore);
const { isPending, data } = useGetAggregatesByResearchQuery();

const placeholder = computed(() =>
  isPending.value ? "Carregando..." : "Selecione um agregado"
);

const options = computed(() =>
  research.value && !!data.value
    ? data.value
        .filter((p: Research) => p.id === research.value)[0]
        .agregados.map((a: Aggregated) => {
          return { label: a.nome, value: a.id };
        })
    : []
);
</script>
