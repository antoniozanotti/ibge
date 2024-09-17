<template>
  <UFormGroup label="Montagem" name="composition">
    <UFormGroup
      label="Grupo de Dados *"
      name="dataGroup"
      class="pl-5 pt-3"
      help="O item no plural irá aparecer na tabela ou gráfico, os demais serão considerados apenas como filtros da consulta."
    >
      <URadioGroup v-model="dataGroup" :options="dataGroupOptions" />
    </UFormGroup>
    <UFormGroup
      label="Legenda"
      name="legend"
      class="pl-5 pt-3"
    >
      <UInput v-model="legend" />
    </UFormGroup>
    <UFormGroup
      label="Tipo de Montagem *"
      name="compositionType"
      class="pl-5 pt-3"
    >
      <URadioGroup
        v-model="compositionType"
        :options="compositionTypeOptions"
      />
    </UFormGroup>
    <UFormGroup
      label="Estilo do Gráfico *"
      name="chartStyle"
      class="pl-5 pt-3"
      v-if="compositionType == CompositionType.CHART"
    >
      <URadioGroup v-model="chartStyle" :options="chartStyleOptions" />
    </UFormGroup>
  </UFormGroup>
</template>

<script setup lang="ts">
import { useFormStore } from "@/stores/form";
import { storeToRefs } from "pinia";
import { CompositionType } from "~/types/CompositionType";
import { ChartStyle } from "~/types/ChartStyle";
import { DataGroup } from "~/types/DataGroup";

const formStore = useFormStore();
const { classifications, dataGroup, legend, compositionType, chartStyle } =
  storeToRefs(formStore);

const dataGroupOptions = computed(() => {
  return classifications.value.length > 0
    ? [
        {
          value: DataGroup["1P1LNC"],
          label: "Variável, Período, Localidade, Classificações",
        },
        {
          value: DataGroup["1PNL1C"],
          label: "Variável, Período, Localidades, Classificação",
        },
        {
          value: DataGroup["NP1L1C"],
          label: "Variável, Períodos, Localidade, Classificação",
        },
      ]
    : [
        {
          value: DataGroup["1PNL"],
          label: "Variável, Período, Localidades",
        },
        {
          value: DataGroup["NP1L"],
          label: "Variável, Períodos, Localidade",
        },
      ];
});

const compositionTypeOptions = [
  {
    value: CompositionType.TABLE,
    label: "Tabela",
  },
  {
    value: CompositionType.CHART,
    label: "Gráfico",
  },
];

const chartStyleOptions = [
  {
    value: ChartStyle.BARS,
    label: "Barras",
  },
  {
    value: ChartStyle.LINES,
    label: "Linhas",
  },
  {
    value: ChartStyle.PIZZA,
    label: "Pizza",
  },
];
</script>
