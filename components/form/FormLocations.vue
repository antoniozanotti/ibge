<template>
  <UFormGroup label="Localidades" name="locations" required>
    <UFormGroup
      :label="option.label"
      :name="`locations[${option.id}]`"
      v-for="option of options"
      class="pl-5 pt-3"
    >
      <USelectMenu
        v-model="locations"
        :options="option.options"
        valueAttribute="value"
        :loading="isPending"
        :placeholder="placeholder"
        :multiple="true"
      >
        <template #label>
          <span
            v-if="locations.filter((l) => l.split('_')[0] == option.id).length"
            class="truncate"
          >
            {{
              locations
                .filter((l) => l.split("_")[0] == option.id)
                .map(
                  (l) => option.options.find((o: any) => o.value == l)?.label
                )
                .join(", ")
            }}
          </span>
          <span v-else>{{ placeholder }}</span>
        </template>
      </USelectMenu>
    </UFormGroup>
  </UFormGroup>
</template>

<script setup lang="ts">
import { useFormStore } from "@/stores/form";
import { storeToRefs } from "pinia";
import { useGetLocationsByAggregatedIdAndLevelsQuery } from "~/composables/api/ibge/useGetLocationsByAggregatedIdAndLevelsQuery";
import { useLevels } from "~/composables/useLevels";
import type { Location } from "~/types/Location";

const formStore = useFormStore();
const { aggregated, locations } = storeToRefs(formStore);
const { isPending: isPendingLevels, data: levels } = useLevels(aggregated);
const { isPending, data } =
  useGetLocationsByAggregatedIdAndLevelsQuery(aggregated);
const placeholder = computed(() =>
  isPending.value ? "Carregando..." : "Selecione um ou mais"
);

const options = ref();
watch(
  [aggregated, isPendingLevels, isPending],
  () => {
    if (
      levels.value === undefined ||
      data.value === undefined ||
      isPendingLevels.value ||
      isPending.value
    ) {
      return [];
    }
    let opts = [];
    for (const level of levels.value) {
      opts.push({
        id: level,
        label: data.value.find((item) => item.nivel.id === level)?.nivel.nome,
        options: data.value
          .filter((item: Location) => item.nivel.id === level)
          .map((item: Location) => {
            return { label: item.nome, value: `${level}_${item.id}` };
          }),
      });
    }
    options.value = opts;
  },
  { immediate: true }
);
</script>
