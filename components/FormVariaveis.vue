<template>
  <UFormGroup label="Variáveis" name="variaveis" v-if="agregado">
    <USelectMenu
      v-model="variaveis"
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
import type { Variavel } from "@/types/Variavel";
import { useAgregadoByIdQuery } from "~/composables/useAgregadoByIdQuery";

const formStore = useFormStore();
const { agregado, variaveis } = storeToRefs(formStore);
const { isPending, data } = useAgregadoByIdQuery(agregado);

const placeholder = computed(() =>
  isPending.value ? "Carregando..." : "Selecione um ou mais variáveis"
);

const options = computed(() =>
  agregado.value && !isPending.value
    ? data.value.variaveis.map((variavel: Variavel) => {
        return { label: variavel.nome, value: variavel.id };
      })
    : []
);
</script>
