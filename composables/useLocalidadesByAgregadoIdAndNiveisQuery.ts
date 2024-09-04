import { API_URL } from "../consts";
import { useQuery } from "@tanstack/vue-query";
import type { Ref } from "vue";
import axios from "axios";

async function fetchLocalidadesByAgregadoIdAndNiveis(id: Ref, niveis: Ref) {
  if (id.value == "" || niveis.value.length === 0) {
    return [];
  }
  const response = await axios.get(
    `${API_URL}agregados/${id.value}/localidades/${niveis.value.join("|")}`
  );
  return response.data;
}

export function useLocalidadesByAgregadoIdAndNiveisQuery(id: Ref, niveis: Ref) {
  return useQuery({
    queryKey: ["localidades", id, niveis],
    queryFn: () => fetchLocalidadesByAgregadoIdAndNiveis(id, niveis),
  });
}
