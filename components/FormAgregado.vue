<template>
  <UFormGroup label="Agregado" name="agregado" v-if="pesquisa">
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
import type { Agregado } from "~/types/Agregado";

const { isPending, data } = useAgregadosByPesquisaQuery();
const formStore = useFormStore();
const { pesquisa, agregado, variaveis } = storeToRefs(formStore);
const placeholder = ref("Carregando...");
const options = ref([{ label: "", value: "" }]);
const loading = ref(true);
const model = ref();

watchEffect(async () => {
  if (isPending && pesquisa.value) {
    let opts = [];
    opts.push(
      ...data.value
      .filter((p: Pesquisa) => p.id === pesquisa.value)[0]
      .agregados.map((a: Agregado) => {
        return { label: a.nome, value: a.id };
      })
    );
    options.value = opts;
    loading.value = false;
    model.value = null;
    agregado.value = "";
    placeholder.value = "Selecione uma pesquisa";
  }
});

watchEffect(async () => {
  if (model.value) {
    variaveis.value = [];
    agregado.value = model.value.value;
  }
});
</script>
