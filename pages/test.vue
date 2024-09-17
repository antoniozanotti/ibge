<template>
  <table v-if="data">
    <thead>
      <tr>
        <th v-for="label in data.headerSet">{{ label }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="row in data.resultSet">
        <td v-for="col in row">{{ col }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { useGetDataSet } from "@/composables/useGetDataSet";
import { DataGroup } from "~/types/DataGroup";

const aggregated = ref("2869");
const variable = ref("630");
const periods = ref(["2004", "2005", "2006"]);
const locations = ref(["N1_1", "N2_1", "N2_2", "N2_3"]);
const classifications = ref([
  "11939_96897",
  "11939_96898",
  "319_7823",
  "319_7824",
  "2703_107315",
  "2703_107316",
]);
const dataGroup = ref(DataGroup["NP1L"]);
const isValid = ref(true);
const { suspense, data } = useGetDataSet(
  aggregated,
  variable,
  periods,
  locations,
  classifications,
  dataGroup,
  isValid
);

onServerPrefetch(async () => {
  await suspense();
})
</script>
