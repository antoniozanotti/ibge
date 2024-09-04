<template>
  <UFormGroup label="Pesquisa" name="pesquisa">
    <Multiselect
      v-model="model"
      :options="options"
      :show-labels="false"
      :loading="isPending"
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
import { useAgregadosByPesquisaQuery } from "@/composables/useAgregadosByPesquisaQuery";
import type { Pesquisa } from "~/types/Pesquisa";

const { isPending, data } = useAgregadosByPesquisaQuery();
const formStore = useFormStore();
const { pesquisa, agregado, variaveis } = storeToRefs(formStore);
const placeholder = ref("Carregando...");
const options = ref([{ label: "", value: "" }]);
const model = ref();

watchEffect(async () => {
  if (!isPending.value) {
    let opts = [];
    opts.push(
      ...data.value.map((pesquisa: Pesquisa) => {
        return { label: pesquisa.nome, value: pesquisa.id };
      })
    );
    placeholder.value = "Selecione uma pesquisa";
    options.value = opts;
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
