<template>
  <div class="bg-gray-100 rounded p-2 mt-4" v-if="data">
    <h2 class="bg-gray-200 text-primary-500 p-2 rounded">Resultado</h2>
    <UTable
      :columns="
        data.headerSet.map((item, index) => {
          return { key: index.toString(), label: item };
        })
      "
      :rows="data.resultSet"
      v-if="compositionType == CompositionType.TABLE"
    />
    <component
      :is="chartComponent"
      v-if="compositionType == CompositionType.CHART"
      id="my-chart-id"
      :options="chartOptions"
      :data="{
        labels: data.headerSet,
        datasets: [{ label:data.variable, data: data.resultSet[0].map((item) => parseInt(item)) }],
      }"
    ></component>
  </div>
</template>

<script setup lang="ts">
import { useFormStore } from "@/stores/form";
import { storeToRefs } from "pinia";
import { useGetDataSet } from "@/composables/useGetDataSet";
import { CompositionType } from "@/types/CompositionType";
import { Line, Bar, Pie } from "vue-chartjs";
import {
  Chart as ChartJS,
  Colors,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  SubTitle,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { ChartStyle } from "~/types/ChartStyle";

ChartJS.register(
  Colors,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  SubTitle,
  Tooltip,
  Legend,
  ChartDataLabels,
  BarElement,
  ArcElement
);

const formStore = useFormStore();
const {
  aggregated,
  variable,
  periods,
  locations,
  classifications,
  dataGroup,
  legend,
  compositionType,
  chartStyle,
  isValid,
} = storeToRefs(formStore);

const { data } = useGetDataSet(
  aggregated,
  variable,
  periods,
  locations,
  classifications,
  dataGroup,
  isValid
);

const chartComponent = computed(() => {
  if (chartStyle.value == ChartStyle.BARS) {
    return Bar;
  }
  if (chartStyle.value == ChartStyle.LINES) {
    return Line;
  }
  if (chartStyle.value == ChartStyle.PIZZA) {
    return Pie;
  }
});

const chartOptions = computed(() => {
  return {
    plugins: {
      title: {
        display: true,
        text: legend.value,
      },
    },
  };
});
</script>
