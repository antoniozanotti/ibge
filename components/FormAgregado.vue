<template>
  <UFormGroup label="Agregado" name="agregado" v-if="pesquisa">
    <Multiselect
      v-model="model"
      :options="options"
      :show-labels="false"
      :loading="loading"
      label="label"
      track-by="value"
      :placeholder="placeholder"
    />
  </UFormGroup>
</template>

<script setup lang="ts">
import { useFormStore } from "@/stores/form";
import { storeToRefs } from "pinia";
import Multiselect from "vue-multiselect";

const formStore = useFormStore();
const { agregadosPorPesquisa, pesquisa, agregado, variaveis } = storeToRefs(formStore);
const placeholder = ref("Carregando...");
const options = ref([{ label: "", value: "" }]);
const loading = ref(true);
const model = ref();

watchEffect(async () => {
  if (agregadosPorPesquisa.value && pesquisa.value) {
    model.value = "";
    agregado.value = "";
    placeholder.value = "Selecione uma pesquisa";
    let opts = [];
    opts.push(
      ...agregadosPorPesquisa.value
        .filter((p) => p.id === pesquisa.value)[0]
        .agregados.map((a) => {
          return { label: a.nome, value: a.id };
        })
    );
    options.value = opts;
    loading.value = false;
  }
});
watchEffect(async () => {
  if (model.value) {
    variaveis.value = [];
    agregado.value = model.value.value;
  }
});
</script>
