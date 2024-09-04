<template>
  <UForm
    :schema="schema"
    :state="formStore"
    class="space-y-4"
    @submit="onSubmit"
  >
    <FormPesquisa />
    <FormAgregado />
    <FormVariaveis />
    {{ variaveis }}
    <UButton type="submit"> Gerar Gráfico </UButton>
  </UForm>
</template>

<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
import { API_URL } from "@/consts";
import { useFormStore } from '@/stores/form'
import { storeToRefs } from 'pinia'

const formStore = useFormStore()
const { agregadosPorPesquisa, variaveis } = storeToRefs(formStore)

const schema = z.object({
  pesquisa: z.string(),
  agregado: z.string(),
});

type Schema = z.output<typeof schema>;

async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log(event.data);
}

watchEffect(async () => {
  const url = `${API_URL}agregados`;
  const response = await (await fetch(url)).json();
  agregadosPorPesquisa.value = response;
});
</script>
<style src="vue-multiselect/dist/vue-multiselect.css"></style>