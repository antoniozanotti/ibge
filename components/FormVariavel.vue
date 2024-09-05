<template>
  <UFormGroup
    label="Variável *"
    name="variavel"
    v-if="agregado"
    help="Será a unidade de medida principal."
  >
    <USelectMenu
      v-model="variavel"
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
import type { Variavel } from "@/types/Variavel";
import { useAgregadoByIdQuery } from "~/composables/useAgregadoByIdQuery";

const formStore = useFormStore();
const { agregado, variavel } = storeToRefs(formStore);
const { isPending, data } = useAgregadoByIdQuery(agregado);

const placeholder = computed(() =>
  isPending.value ? "Carregando..." : "Selecione um ou mais variáveis"
);

const options = computed(() =>
  agregado.value && !isPending.value
    ? data.value.variaveis.map((variavel: Variavel) => {
        return { label: variavel.nome, value: variavel.id.toString() };
      })
    : []
);
</script>
