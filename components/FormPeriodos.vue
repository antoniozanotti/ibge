<template>
  <UFormGroup label="Períodos" name="periodos" v-if="agregado">
    <Multiselect
      v-model="model"
      :options="options"
      :show-labels="false"
      :loading="isPending"
      label="label"
      track-by="value"
      :placeholder="placeholder"
      :multiple="true"
      :close-on-select="false"
    />
  </UFormGroup>
</template>

<script setup lang="ts">
import { useFormStore } from "@/stores/form";
import { storeToRefs } from "pinia";
import Multiselect from "vue-multiselect";
import type { Option } from "@/types/Option";
import type { Periodo } from "@/types/Periodo";
import { usePeriodosByAgregadoIdQuery } from "~/composables/usePeriodosByAgregadoIdQuery";

const formStore = useFormStore();
const { agregado, periodos } = storeToRefs(formStore);
const placeholder = ref("Carregando...");
const options = ref([{ label: "", value: "" }]);
const model = ref();
const { isPending, data } = usePeriodosByAgregadoIdQuery(agregado);

watchEffect(async () => {
  if (!isPending.value && agregado.value) {
    let opts = [];
    opts.push(
      ...data.value.map((periodo: Periodo) => {
        return { label: periodo.literals[0], value: periodo.id };
      })
    );
    placeholder.value = "Selecione um ou mais períodos";
    options.value = opts;
    model.value = null;
  }
});

watchEffect(async () => {
  if (model.value) {
    periodos.value = model.value.map((item: Option) => item.value);
  }
});
</script>
