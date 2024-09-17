import { API_URL } from "~/consts";
import { useQuery } from "@tanstack/vue-query";
import type { Ref } from "vue";
import axios from "axios";
import type { Metadado } from "~/types/api/ibge/Metadado";

export function useGetAggregatedByIdQuery(id: Ref<string>) {
  const enabled = computed(() => !!toValue(id));
  return useQuery({
    queryKey: ["apiIbgeAggregated", id],
    queryFn: () => fetchData(toValue(id)),
    enabled,
  });
}

async function fetchData(id: string): Promise<Metadado> {
  const response = await axios.get(`${API_URL}agregados/${id}/metadados`);
  return response.data;
}
