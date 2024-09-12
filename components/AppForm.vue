<template>
  <UForm
    :schema="formSchema"
    :state="formStore"
    class="space-y-4 gap-2"
    @submit="onSubmit"
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
      <!--FormLocalidades />
      <FormClassificacoes /-->
    </FormStep>
    <FormStep label="3ª Etapa: montagem" v-if="pesquisa && agregado && variavel && periodos && localidades">
      <FormMontagem />
      <FormGerarGrafico />
    </FormStep>
  </UForm>
</template>

<script setup lang="ts">
import type { FormSubmitEvent, FormErrorEvent } from "#ui/types";
import { useFormStore, formSchema, type FormSchema } from "@/stores/form";
import { storeToRefs } from "pinia";

const formStore = useFormStore();
const { pesquisa, agregado, variavel, periodos, localidades, classificacoes } =
  storeToRefs(formStore);
async function onSubmit(event: FormSubmitEvent<FormSchema>) {
  // Do something with data
  //console.log(event.data);
  //isValid.value = true;
}

watch(pesquisa, (newPesquisa) => {
  agregado.value = undefined;
});
watch(agregado, (newAgregado) => {
  variavel.value = undefined;
  periodos.value = [];
  localidades.value = [];
  classificacoes.value = [];
});
</script>
