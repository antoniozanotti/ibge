import { API_URL } from "~/consts";
import { useQuery } from "@tanstack/vue-query";
import type { Ref } from "vue";
import axios from "axios";
import { useLevels } from "~/composables/useLevels";
import type { Localidade } from "~/types/api/ibge/Localidade";

export function useGetLocationsByAggregatedIdAndLevelsQuery(id: Ref<string>) {
  const { data } = useLevels(id);
  const levels = computed(() => data.value);
  const enabled = computed(() => !!data.value);

  return useQuery({
    queryKey: ["apiIbgeLocations", id],
    queryFn: () => fetchData(toValue(id), levels.value),
    enabled,
  });
}

async function fetchData(
  aggregatedId: string,
  levels?: string[]
): Promise<Localidade[]> {
  if (!levels) {
    return Promise.reject();
  }

  const response = await axios.get(
    `${API_URL}agregados/${aggregatedId}/localidades/${levels.join("|")}`
  );
  return response.data;
}
