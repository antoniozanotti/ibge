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
    <FormPeriodos />
    {{ variaveis }}
    <UButton type="submit"> Gerar Gráfico </UButton>
  </UForm>
</template>

<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
import { useFormStore } from "@/stores/form";
import { storeToRefs } from "pinia";

const formStore = useFormStore();
const { variaveis } = storeToRefs(formStore);

const schema = z.object({
  pesquisa: z.string(),
  agregado: z.string(),
});

type Schema = z.output<typeof schema>;

async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log(event.data);
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>
