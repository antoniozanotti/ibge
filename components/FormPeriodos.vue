<template>
  <UFormGroup label="Períodos *" name="periodos" v-if="agregado">
    <USelectMenu
      v-model="periodos"
      :options="options"
      valueAttribute="value"
      :loading="isPending"
      :placeholder="placeholder"
      :multiple="true"
    />
  </UFormGroup>
</template>

<script setup lang="ts">
import { useFormStore } from "@/stores/form";
import { storeToRefs } from "pinia";
import type { Periodo } from "@/types/Periodo";
import { usePeriodosByAgregadoIdQuery } from "~/composables/usePeriodosByAgregadoIdQuery";

const formStore = useFormStore();
const { agregado, periodos } = storeToRefs(formStore);
const { isPending, data } = usePeriodosByAgregadoIdQuery(agregado);

const placeholder = computed(() =>
  isPending.value ? "Carregando..." : "Selecione um ou mais períodos"
);

const options = computed(() =>
  agregado.value && !isPending.value
    ? data.value.map((periodo: Periodo) => {
        return { label: periodo.literals[0], value: periodo.id };
      })
    : []
);
</script>
