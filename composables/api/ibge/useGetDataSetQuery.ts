import { API_URL } from "~/consts";
import { useQuery } from "@tanstack/vue-query";
import type { Ref } from "vue";
import axios from "axios";
import type { GeographicalLevel } from "~/types/GeographicalLevel";
import type { ClassificationGroup } from "~/types/ClassificationGroup";
import type { Variavel } from "~/types/api/ibge/Variavel";

export function useGetDataSetQuery(
  aggregated: Ref<string>,
  variable: Ref<string>,
  periods: Ref<string[]>,
  locations: Ref<string[]>,
  classifications: Ref<string[]>,
  isValid: Ref<boolean>
) {
  const enabled = computed(() => toValue(isValid));

  return useQuery({
    queryKey: [
      "apiIbgeDataset",
      aggregated,
      variable,
      periods,
      locations,
      isValid,
      classifications,
    ],
    queryFn: () =>
      fetchData(
        toValue(aggregated),
        toValue(variable),
        toValue(periods),
        toValue(locations),
        toValue(classifications)
      ),
    enabled,
  });
}

async function fetchData(
  aggregated: string,
  variable: string,
  periods: string[],
  locations: string[],
  classifications: string[]
): Promise<Variavel[]> {
  const url = prepareUrl(
    aggregated,
    variable,
    periods,
    locations,
    classifications
  );
  const response = await axios.get(url);
  return response.data;
}

function prepareUrl(
  aggregated: string,
  variable: string,
  periods: string[],
  locations: string[],
  classifications: string[]
) {
  const aggregatedUrlPart = `agregados/${aggregated}`;
  const periodsUrlPart = `/periodos/${periods.join("|")}`;
  const variablesUrlPart = `/variaveis/${variable}`;
  const locationsUrlPart = prepareLocationsUrlPart(locations);
  const classificationUrlPart = prepareClassificationUrlPart(classifications);
  return `${API_URL}${aggregatedUrlPart}${periodsUrlPart}${variablesUrlPart}${locationsUrlPart}${classificationUrlPart}`;
}

function prepareLocationsUrlPart(locations: string[]) {
  let geographicalLevels: GeographicalLevel[] = [];
  for (const geographicalLevelAndLocation of locations) {
    const [geographicalLevel, location] =
      geographicalLevelAndLocation.split("_");
    const found = geographicalLevels.find(
      (item) => item.id === geographicalLevel
    );
    if (found) {
      found["locations"].push(location);
    } else {
      geographicalLevels.push({
        id: geographicalLevel,
        locations: [location],
      });
    }
  }
  return `?localidades=${geographicalLevels
    .map((item) => `${item.id}[${item.locations.join(",")}]`)
    .join("|")}`;
}

function prepareClassificationUrlPart(classifications: string[]) {
  let classificationGroup: ClassificationGroup[] = [];
  for (const geographicalLevelAndLocation of classifications) {
    const [geographicalLevel, location] =
      geographicalLevelAndLocation.split("_");
    const found = classificationGroup.find(
      (item) => item.id === geographicalLevel
    );
    if (found) {
      found["classifications"].push(location);
    } else {
      classificationGroup.push({
        id: geographicalLevel,
        classifications: [location],
      });
    }
  }
  return classifications.length > 0
    ? `&classificacao=${classificationGroup
        .map((item) => `${item.id}[${item.classifications.join(",")}]`)
        .join("|")}`
    : "";
}
