<template>
  <UFormGroup label="Períodos" name="periods" required>
    <USelectMenu
      v-model="periodsMixed"
      :options="options"
      valueAttribute="value"
      :loading="isPending"
      :multiple="options.length > 1"
    >
      <template #label>
        <span
          v-if="options.length > 1 && Array.isArray(periodsMixed) && periodsMixed.length >= 1"
          class="truncate"
          >{{
            periods
              .map((p) => options.find((o) => o.value == p)?.label)
              .join(", ")
          }}</span
        >
        <span v-else-if="typeof periodsMixed === 'string'">{{ periodsMixed }}</span>
        <span v-else>{{ placeholder }}</span>
      </template>
    </USelectMenu>
  </UFormGroup>
</template>

<script setup lang="ts">
import { useFormStore } from "@/stores/form";
import { storeToRefs } from "pinia";
import type { Period } from "@/types/Period";
import { useGetPeriodsByAggregatedIdQuery } from "~/composables/api/ibge/useGetPeriodsByAggregatedIdQuery";

const formStore = useFormStore();
const periodsMixed = ref<string | string[]>();
const { aggregated, periods } = storeToRefs(formStore);
const { isPending, data } = useGetPeriodsByAggregatedIdQuery(aggregated);

const placeholder = computed(() =>
  isPending.value ? "Carregando..." : "Selecione um ou mais períodos"
);

const options = computed(() =>
  !!data.value
    ? data.value.map((period: Period) => {
        return { label: period.literals[0], value: period.id };
      })
    : []
);

watch(
  periodsMixed,
  () => {
    if(periodsMixed.value === undefined){
      periods.value = [];
    }else {
      periods.value =  Array.isArray(periodsMixed.value) ? periodsMixed.value : [periodsMixed.value];
    }
  },
  { immediate: true }
);
</script>
