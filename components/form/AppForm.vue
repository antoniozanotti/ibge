<template>
  <UForm
    :schema="formSchema"
    :state="formStore"
    class="space-y-4 gap-2"
    @submit="onSubmit"
    @error="onError"
  >
    <FormStage label="1ª Etapa: pesquisa">
      <FormResearch />
    </FormStage>
    <FormStage label="2ª Etapa: agregado" v-if="research">
      <FormAggregated />
    </FormStage>
    <FormStage label="3ª Etapa: filtros" v-if="aggregated">
      <FormVariable />
      <FormPeriods />
      <FormLocations />
      <FormClassifications />
    </FormStage>
    <FormStage
      label="3ª Etapa: montagem"
      v-if="research && aggregated && variable && periods && locations"
    >
      <FormComposition />
      <FormFinish v-if="compositionType" />
    </FormStage>
  </UForm>
</template>

<script setup lang="ts">
import type { FormSubmitEvent, FormErrorEvent } from "#ui/types";
import { useFormStore, formSchema, type FormSchema } from "@/stores/form";
import { storeToRefs } from "pinia";

const formStore = useFormStore();
const {
  research,
  aggregated,
  variable,
  periods,
  locations,
  classifications,
  compositionType,
  dataGroup,
  legend,
  isValid,
} = storeToRefs(formStore);

watch(
  research,
  () => {
    aggregated.value = undefined;
  },
  { immediate: true }
);

watch(
  aggregated,
  () => {
    variable.value = undefined;
    periods.value = [];
    locations.value = [];
    classifications.value = [];
    isValid.value = false;
  },
  { immediate: true }
);

watch(
  [variable, periods, locations, classifications, dataGroup, legend],
  () => {
    isValid.value = false;
  },
  { immediate: true }
);

async function onSubmit(event: FormSubmitEvent<FormSchema>) {
  isValid.value = true;
}

async function onError(event: FormErrorEvent) {
  isValid.value = false;
}
</script>
