<template>
  <div class="bg-gray-100 rounded p-2 mt-4" v-if="ibgeData">
    <h2 class="bg-gray-200 text-primary-500 p-2 rounded">
      Resultado
    </h2>
    {{ ibgeData }}
    <table>
      <thead>
        <tr>
          <th scope="col"></th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row"></th>
          <td></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { useFormStore } from "@/stores/form";
import { storeToRefs } from "pinia";

const formStore = useFormStore();
const {
  tipoMontagem,
  estiloGrafico,
  grupoDeDados,
  largura,
  ibgeData
} = storeToRefs(formStore);
</script>
