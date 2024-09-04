import { API_URL } from "../consts";
import { useQuery } from "@tanstack/vue-query";
import type { Ref } from "vue";
import axios from 'axios';

async function fetchAgregadoById(id: Ref) {
  if (id.value == "") {
    return {};
  }
  const response = await axios.get(`${API_URL}agregados/${id.value}/metadados`);
  return response.data;
}

export function useAgregadoByIdQuery(id: Ref) {
  return useQuery({
    queryKey: ["agregado", id],
    queryFn: () => fetchAgregadoById(id),
  });
}
