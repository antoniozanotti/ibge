<template>
  <UForm
    :schema="formSchema"
    :state="form"
    class="space-y-4"
    @submit="onSubmit"
  >
    <FormPesquisa />
    <FormAgregado />
    <FormVariaveis />
    <FormPeriodos />
    <FormLocalidades />
    <FormClassificacoes />
    <UButton type="submit"> Gerar Gráfico </UButton>
  </UForm>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import { useFormStore, formSchema, type FormSchema } from "@/stores/form";
import { storeToRefs } from "pinia";

const form = useFormStore();
const { pesquisa, agregado, variaveis, periodos, localidades, classificacoes } =
  storeToRefs(form);

async function onSubmit(event: FormSubmitEvent<FormSchema>) {
  // Do something with data
  console.log(event.data);
}
</script>
