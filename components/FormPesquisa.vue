<template>
  <UFormGroup label="Pesquisa" name="pesquisa">
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
const { agregadosPorPesquisa, pesquisa, agregado, variaveis } =
  storeToRefs(formStore);
const placeholder = ref("Carregando...");
const options = ref([{ label: "", value: "" }]);
const loading = ref(true);
const model = ref();

watchEffect(async () => {
  if (agregadosPorPesquisa.value) {
    let opts = [];
    opts.push(
      ...agregadosPorPesquisa.value.map((pesquisa) => {
        return { label: pesquisa.nome, value: pesquisa.id };
      })
    );
    placeholder.value = "Selecione uma pesquisa";
    options.value = opts;
    loading.value = false;
  }
});
watchEffect(async () => {
  if (model.value) {
    pesquisa.value = model.value.value;
    agregado.value = "";
    variaveis.value = [];
  }
});
</script>
