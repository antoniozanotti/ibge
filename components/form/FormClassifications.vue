<template>
  <UFormGroup
    label="Classificações"
    name="classifications"
    v-if="aggregated && options.length > 0"
  >
    <UFormGroup
      :label="option.label"
      :name="`classifications[${option.id}]`"
      v-for="option of options"
      class="pl-5 pt-3"
    >
      <USelectMenu
        v-model="classifications"
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
import { useGetAggregatedByIdQuery } from "~/composables/api/ibge/useGetAggregatedByIdQuery";

const formStore = useFormStore();
const { aggregated, classifications } = storeToRefs(formStore);
const { isPending, data } = useGetAggregatedByIdQuery(aggregated);

const placeholder = computed(() =>
  isPending.value ? "Carregando..." : "Selecione uma ou mais"
);

const options = computed(() => {
  let opts = [];
  if (aggregated.value && !!data.value) {
    const classificationsArray = data.value.classificacoes;
    for (const classification of classificationsArray) {
      opts.push({
        id: classification.id,
        label: classification.nome,
        options: classification.categorias.map((cat) => {
          return {
            label: cat.nome,
            value: `${classification.id}_${cat.id}`,
          };
        }),
      });
    }
  }
  return opts;
});
</script>
