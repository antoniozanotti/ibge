import { API_URL } from "~/consts";
import { useQuery } from "@tanstack/vue-query";
import axios from 'axios';
import type { Research } from "~/types/api/ibge/Research";

export function useGetAggregatesByResearchQuery() {
  return useQuery({
    queryKey: ["apiIbgeAggregatedByResearch"],
    queryFn: () => fetchData(),
  });
}

async function fetchData(): Promise<Research[]> {
  const response = await axios.get(`${API_URL}agregados`);
  return response.data;
}

