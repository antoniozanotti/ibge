<template>
  <UFormGroup label="Montagem" name="montagem">
    <UFormGroup
      label="Grupo de Dados *"
      name="grupoDeDados"
      class="pl-5 pt-3"
      help="O item no plural irá aparecer na tabela ou gráfico, os demais serão considerados apenas como filtros da consulta."
    >
      <URadioGroup v-model="grupoDeDados" :options="grupoDeDadosOptions" />
    </UFormGroup>
    <UFormGroup
      label="Largura *"
      name="largura"
      class="pl-5 pt-3"
      help="A largura da tabela ou gráfico em pixels."
    >
      <UInput v-model="largura" />
    </UFormGroup>
    <UFormGroup
      label="Tipo de Montagem *"
      name="tipoMontagem"
      class="pl-5 pt-3"
    >
      <URadioGroup v-model="tipoMontagem" :options="tipoMontagemOptions" />
    </UFormGroup>
    <UFormGroup
      label="Estilo do Gráfico *"
      name="estiloGrafico"
      class="pl-5 pt-3"
      v-if="tipoMontagem == 'grafico'"
    >
      <URadioGroup v-model="estiloGrafico" :options="estiloGraficoOptions" />
    </UFormGroup>
  </UFormGroup>
</template>

<script setup lang="ts">
import { useFormStore } from "@/stores/form";
import { storeToRefs } from "pinia";

const formStore = useFormStore();
const {
  classificacoes,
  tipoMontagem,
  estiloGrafico,
  grupoDeDados,
  largura,
} = storeToRefs(formStore);

const tipoMontagemOptions = [
  {
    value: "tabela",
    label: "Tabela",
  },
  {
    value: "grafico",
    label: "Gráfico",
  },
];
const estiloGraficoOptions = [
  {
    value: "barras",
    label: "Barras",
  },
  {
    value: "linhas",
    label: "Linhas",
  },
  {
    value: "pizza",
    label: "Pizza",
  },
];
const grupoDeDadosOptions = computed(() => {
  return classificacoes.value
    ? [
        {
          value: "1P1LNC",
          label: "Variável, Período, Localidade, Classificações",
        },
        {
          value: "1PNL1C",
          label: "Variável, Período, Localidades, Classificação",
        },
        {
          value: "NP1L1C",
          label: "Variável, Períodos, Localidade, Classificação",
        },
      ]
    : [
        {
          value: "1PNL",
          label: "Variável, Período, Localidades",
        },
        {
          value: "NP1L",
          label: "Variável, Períodos, Localidade",
        },
      ];
});
</script>
