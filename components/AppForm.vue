<template>
  <UForm
    :schema="schema"
    :state="formStore"
    class="space-y-4"
    @submit="onSubmit"
  >
    <FormPesquisa />
    {{ pesquisa }}
    <FormAgregado />
    {{ agregado }}
    <FormVariaveis />
    {{ variaveis }}
    <FormPeriodos />
    {{ periodos }}
    <FormLocalidades />
    {{ localidades }}>
    <UButton type="submit"> Gerar Gráfico </UButton>
  </UForm>
</template>

<script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";
import { useFormStore } from "@/stores/form";
import { storeToRefs } from "pinia";

const formStore = useFormStore();
const { pesquisa, agregado, variaveis, periodos, localidades } = storeToRefs(formStore);

const schema = z.object({
  pesquisa: z.string(),
  agregado: z.string(),
});

type Schema = z.output<typeof schema>;

async function onSubmit(event: FormSubmitEvent<Schema>) {
  console.log(event.data);
}
</script>
