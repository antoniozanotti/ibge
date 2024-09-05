<template>
  <UForm
    :schema="formSchema"
    :state="form"
    class="space-y-4"
    @submit="onSubmit"
  >
    <FormPesquisa />
    <FormAgregado />
    <FormVariavel />
    <FormPeriodos />
    <FormLocalidades />
    <FormClassificacoes />
    <FormMontagem />
    <UButton type="submit"> Gerar Gráfico </UButton>
  </UForm>
</template>

<script setup lang="ts">
import type { FormSubmitEvent } from "#ui/types";
import { useFormStore, formSchema, type FormSchema } from "@/stores/form";
import { storeToRefs } from "pinia";

const form = useFormStore();
const { pesquisa, agregado, variavel, periodos, localidades, classificacoes } =
  storeToRefs(form);

async function onSubmit(event: FormSubmitEvent<FormSchema>) {
  // Do something with data
  console.log(event.data);
}
</script>
