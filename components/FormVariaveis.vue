<template>
  <UFormGroup label="Variáveis" name="variaveis" v-if="agregado">
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
import type { Variavel } from "@/types/Variavel";
import { useAgregadoByIdQuery } from "~/composables/useAgregadoByIdQuery";

const formStore = useFormStore();
const { agregado, variaveis } = storeToRefs(formStore);
const placeholder = ref("Carregando...");
const options = ref([{ label: "", value: "" }]);
const model = ref();
const { isPending, data } = useAgregadoByIdQuery(agregado);

watchEffect(async () => {
  if (!isPending.value && agregado.value) {
    let opts = [];
    opts.push(
      ...data.value.variaveis.map((variavel: Variavel) => {
        return { label: variavel.nome, value: variavel.id };
      })
    );
    placeholder.value = "Selecione uma variável";
    options.value = opts;
    model.value = null;
  }
});

watchEffect(async () => {
  if (model.value) {
    variaveis.value = model.value.map((item: Option) => item.value);
  }
});
</script>
