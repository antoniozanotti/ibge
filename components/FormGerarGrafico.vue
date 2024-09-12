<template>
  <UButton type="submit" v-if="tipoMontagem"> Gerar Gráfico </UButton>
</template>

<script setup lang="ts">
import { useFormStore } from "@/stores/form";
import { storeToRefs } from "pinia";

const formStore = useFormStore();
const { tipoMontagem } = storeToRefs(formStore);
</script>
