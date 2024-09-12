<template>
  <UForm
    :schema="formSchema"
    :state="formStore"
    class="space-y-4 gap-2"
    @submit="onSubmit"
    @error="onError"
  >
    <FormStep label="1ª Etapa: pesquisa">
      <FormPesquisa />
    </FormStep>
    <FormStep label="2ª Etapa: agregado" v-if="pesquisa">
      <FormAgregado />
    </FormStep>
    <FormStep label="3ª Etapa: filtros" v-if="agregado">
      <FormVariavel />
      <FormPeriodos />
      <FormLocalidades />
      <FormClassificacoes />
    </FormStep>
    <FormStep
      label="3ª Etapa: montagem"
      v-if="pesquisa && agregado && variavel && periodos && localidades"
    >
      <FormMontagem />
      <FormFinalizar v-if="tipoMontagem" />
    </FormStep>
  </UForm>
</template>

<script setup lang="ts">
import type { FormSubmitEvent, FormErrorEvent } from "#ui/types";
import { useFormStore, formSchema, type FormSchema } from "@/stores/form";
import { storeToRefs } from "pinia";
import { useGetResultsQuery } from "@/composables/useGetResultsQuery";

const formStore = useFormStore();
const {
  pesquisa,
  agregado,
  variavel,
  periodos,
  localidades,
  classificacoes,
  tipoMontagem,
  grupoDeDados,
  ibgeData,
  isValid,
} = storeToRefs(formStore);

watch(
  pesquisa,
  () => {
    agregado.value = undefined;
  },
  { immediate: true }
);

watch(
  agregado,
  () => {
    variavel.value = undefined;
    periodos.value = [];
    localidades.value = [];
    classificacoes.value = [];
    isValid.value = false;
  },
  { immediate: true }
);

watch(
  [variavel, periodos, localidades, classificacoes, grupoDeDados],
  () => {
    isValid.value = false;
  },
  { immediate: true }
);

const { isPending, data } = useGetResultsQuery(
  agregado,
  variavel,
  periodos,
  localidades,
  classificacoes,
  grupoDeDados,
  isValid
);

async function onSubmit(event: FormSubmitEvent<FormSchema>) {
  isValid.value = true;
  ibgeData.value = data;
}

async function onError(event: FormErrorEvent) {
  ibgeData.value = undefined;
  isValid.value = false;
}
</script>
