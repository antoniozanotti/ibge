import { API_URL } from "../consts";
import { useQuery } from "@tanstack/vue-query";
import axios from 'axios';

async function fetchAgregadosByPesquisa() {
  const response = await axios.get(`${API_URL}agregados`);
  return response.data;
}

export function useAgregadosByPesquisaQuery() {
  return useQuery({
    queryKey: ["agregadosByPesquisa"],
    queryFn: () => fetchAgregadosByPesquisa(),
  });
}
