import { API_URL } from "../consts";
import { useQuery } from "@tanstack/vue-query";
import type { Ref } from "vue";
import axios from 'axios';

async function fetchPeriodosByAgregadoId(id: Ref) {
  if (!id.value) {
    return {};
  }
  const response = await axios.get(`${API_URL}agregados/${id.value}/periodos`);
  return response.data;
}

export function usePeriodosByAgregadoIdQuery(id: Ref) {
  return useQuery({
    queryKey: ["periodos", id],
    queryFn: () => fetchPeriodosByAgregadoId(id),
  });
}
