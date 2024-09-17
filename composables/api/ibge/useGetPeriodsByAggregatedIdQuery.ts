import { API_URL } from "~/consts";
import { useQuery } from "@tanstack/vue-query";
import type { Ref } from "vue";
import axios from "axios";
import type { Periodo } from "~/types/api/ibge/Periodo";

export function useGetPeriodsByAggregatedIdQuery(id: Ref<string>) {
  const enabled = computed(() => !!toValue(id));
  return useQuery({
    queryKey: ["apiIbgePeriods", id],
    queryFn: () => fetchData(toValue(id)),
    enabled,
  });
}

async function fetchData(id: string): Promise<Periodo[]> {
  const response = await axios.get(`${API_URL}agregados/${id}/periodos`);
  return response.data;
}
