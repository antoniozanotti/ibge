<template>
  <UFormGroup label="Pesquisa" name="research" required>
    <USelectMenu
      v-model="research"
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
import { useGetAggregatesByResearchQuery } from "@/composables/api/ibge/useGetAggregatesByResearchQuery";
import type { Research } from "~/types/Research";

const { isPending, data } = useGetAggregatesByResearchQuery();
const formStore = useFormStore();
const { research } = storeToRefs(formStore);

const placeholder = computed(() =>
  isPending.value ? "Carregando..." : "Selecione uma pesquisa"
);

const options = computed(() =>
  !!data.value
    ? data.value.map((res: Research) => {
        return { label: res.nome, value: res.id };
      })
    : []
);
</script>
