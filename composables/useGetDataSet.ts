import { useQuery } from "@tanstack/vue-query";
import type { Ref } from "vue";
import { DataGroup } from "~/types/DataGroup";
import type { Dataset } from "~/types/Dataset";
import { useGetDataSetQuery } from "./api/ibge/useGetDataSetQuery";
import type { Variavel } from "~/types/api/ibge/Variavel";

export function useGetDataSet(
  aggregated: Ref<string>,
  variable: Ref<string>,
  periods: Ref<string[]>,
  locations: Ref<string[]>,
  classifications: Ref<string[]>,
  dataGroup: Ref<DataGroup>,
  isValid: Ref<boolean>
) {
  const { data: resultSetData } = useGetDataSetQuery(
    aggregated,
    variable,
    periods,
    locations,
    classifications,
    isValid
  );
  const enabled = computed(() => toValue(isValid) && !!resultSetData.value);
  return useQuery({
    queryKey: [
      "dataset",
      aggregated,
      variable,
      periods,
      locations,
      dataGroup,
      isValid,
      classifications,
    ],
    queryFn: () => generateDataSet(dataGroup.value, resultSetData.value),
    enabled,
  });
}

function generateDataSet(
  dataGroup: DataGroup,
  resultSetData?: Variavel[]
): Promise<Dataset> {
  if (resultSetData === undefined) {
    return Promise.resolve({ unit: "", variable:"", headerSet: [""], resultSet: [[""]] });
  }
  switch (dataGroup) {
    case DataGroup["1P1LNC"]:
      return generateDataSetByClassifications(resultSetData);

    case DataGroup["1PNL1C"]:
    case DataGroup["1PNL"]:
      return generateDataSetByLocations(resultSetData);

    case DataGroup["NP1L1C"]:
    case DataGroup["NP1L"]:
      return generateDataSetByPeriods(resultSetData);
  }

  throw new Error("Sem resultados");
}

function generateDataSetByClassifications(
  resultSetData: Variavel[]
): Promise<Dataset> {
  let headerSet: string[] = [];
  let resultSet: string[] = [];
  for (const item of resultSetData[0].resultados) {
    let labels = [];
    for (const classification of item.classificacoes) {
      labels.push(Object.values(classification.categoria)[0]);
    }
    headerSet.push(labels.join(" + "));
    resultSet.push(Object.values(item.series[0].serie)[0]);
  }
  return Promise.resolve({
    unit: resultSetData[0].unidade,
    variable: `${resultSetData[0].variavel} (${resultSetData[0].unidade})`,
    headerSet: headerSet,
    resultSet: [resultSet],
  });
}

function generateDataSetByLocations(
  resultSetData: Variavel[]
): Promise<Dataset> {
  let headerSet: string[] = [];
  let resultSet: string[] = [];
  for (const serie of resultSetData[0].resultados[0].series) {
    headerSet.push(serie.localidade.nome);
    resultSet.push(Object.values(serie.serie)[0]);
  }
  return Promise.resolve({
    unit: resultSetData[0].unidade,
    variable: `${resultSetData[0].variavel} (${resultSetData[0].unidade})`,
    headerSet: headerSet,
    resultSet: [resultSet],
  });
}

function generateDataSetByPeriods(resultSetData: Variavel[]): Promise<Dataset> {
  let headerSet: string[] = Object.keys(
    resultSetData[0].resultados[0].series[0].serie
  );
  let resultSet: string[] = Object.values(
    resultSetData[0].resultados[0].series[0].serie
  );
  return Promise.resolve({
    unit: resultSetData[0].unidade,
    variable: `${resultSetData[0].variavel} (${resultSetData[0].unidade})`,
    headerSet: headerSet,
    resultSet: [resultSet],
  });
}
