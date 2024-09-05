<template>
  <UFormGroup label="Localidades *" name="localidades" v-if="agregado">
    <UFormGroup
      :label="option.label"
      :name="`localidades[${option.id}]`"
      v-for="option of options"
      class="pl-5 pt-3"
    >
      <USelectMenu
        v-model="localidades"
        :options="option.options"
        valueAttribute="value"
        :loading="isPending"
        :placeholder="placeholder"
        :multiple="true"
      />
    </UFormGroup>
  </UFormGroup>
</template>

<script setup lang="ts">
import { useFormStore } from "@/stores/form";
import { storeToRefs } from "pinia";
import { useAgregadoByIdQuery } from "~/composables/useAgregadoByIdQuery";
import { useLocalidadesByAgregadoIdAndNiveisQuery } from "~/composables/useLocalidadesByAgregadoIdAndNiveisQuery";
import type { Localidade } from "~/types/Localidade";

const formStore = useFormStore();
const { agregado, localidades } = storeToRefs(formStore);

const placeholder = computed(() =>
  isPending.value ? "Carregando..." : "Selecione um ou mais"
);

const {
  isPending: isPendingAgregadosByPesquisa,
  data: dataAgregadosByPesquisa,
} = useAgregadoByIdQuery(agregado);

const niveis = computed(() => {
  let opts = [];
  if (agregado.value && !isPendingAgregadosByPesquisa.value) {
    const niveisTerritoriais = dataAgregadosByPesquisa.value.nivelTerritorial;
    for (const nivelTerritorial in niveisTerritoriais) {
      opts.push(...niveisTerritoriais[nivelTerritorial]);
    }
  }
  return opts;
});

const { isPending, data } = useLocalidadesByAgregadoIdAndNiveisQuery(
  agregado,
  niveis
);

const options = ref();
watch(data, () => {
  if (data.value && data.value.length > 0) {
    let opts = [];
    for (const nivel of niveis.value) {
      opts.push({
        id: nivel,
        label: data.value.find((item: Localidade) => item.nivel.id === nivel)
          .nivel.nome,
        options: data.value
          .filter((item: Localidade) => item.nivel.id === nivel)
          .map((item: Localidade) => {
            return { label: item.nome, value: `${nivel}_${item.id}` };
          }),
      });
    }
    options.value = opts;
  }
});
</script>
