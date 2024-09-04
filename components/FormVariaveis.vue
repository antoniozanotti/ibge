<template>
  <UFormGroup label="Variáveis" name="variaveis" v-if="agregado">
    <Multiselect
      v-model="model"
      :options="options"
      :show-labels="false"
      :loading="loading"
      label="label"
      track-by="value"
      :placeholder="placeholder"
      :multiple="true"
      :close-on-select="false"
    />
  </UFormGroup>
</template>

<script setup lang="ts">
import { API_URL } from "@/consts";
import { useFormStore } from "@/stores/form";
import { storeToRefs } from "pinia";
import Multiselect from "vue-multiselect";
import type { Option } from "@/types/Option";
import type { Variavel } from "@/types/Variavel";

const formStore = useFormStore();
const { agregadosPorPesquisa, pesquisa, agregado, variaveis } =
  storeToRefs(formStore);

const placeholder = ref("Carregando...");
const options = ref([{ label: "", value: "" }]);
const loading = ref(true);
const model = ref();

watchEffect(async () => {
  if (agregadosPorPesquisa.value && agregado.value) {
    model.value = null;
    let opts = [];
    const url = `${API_URL}agregados/${agregado.value}/metadados`;
    const response = await (await fetch(url)).json();
    opts.push(
      ...response.variaveis.map((variavel: Variavel) => {
        return { label: variavel.nome, value: variavel.id };
      })
    );
    placeholder.value = "Selecione uma variável";
    options.value = opts;
    loading.value = false;
  }
});
watchEffect(async () => {
  if (model.value) {
    variaveis.value = model.value.map((item: Option) => item.value);
  }
});
</script>
