<template>
  <UFormGroup label="Períodos" name="periods" required>
    <USelectMenu
      v-model="periods"
      :options="options"
      valueAttribute="value"
      :loading="isPending"
      :multiple="true"
      @change="handleChange"
    >
      <template #label>
        <span v-if="periods.length" class="truncate">{{
          periods
            .map((p) => options.find((o) => o.value == p)?.label)
            .join(", ")
        }}</span>
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
import { useTemplateRef } from "vue";

const formStore = useFormStore();
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

function handleChange(event: Event) {}
</script>
