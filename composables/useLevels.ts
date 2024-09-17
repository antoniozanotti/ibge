import { useQuery } from "@tanstack/vue-query";
import { useGetAggregatedByIdQuery } from "./api/ibge/useGetAggregatedByIdQuery";
import type { NivelTerritorial } from "~/types/api/ibge/Metadado";

export function useLevels(id: Ref<string>) {
  const { data: metadado } = useGetAggregatedByIdQuery(id);
  const nivelTerritorial = computed(() => metadado.value?.nivelTerritorial);
  const enabled = computed(() => !!metadado.value?.nivelTerritorial);

  return useQuery({
    queryKey: ["levels", nivelTerritorial],
    queryFn: () => getOptions(nivelTerritorial.value),
    enabled,
  });
}

async function getOptions(
  geographicalLevels?: NivelTerritorial
): Promise<string[]> {
  if (geographicalLevels === undefined) {
    return Promise.resolve([]);
  }
  let opts = [];
  let geographicalLevel: keyof NivelTerritorial;
  for (geographicalLevel in geographicalLevels) {
    opts.push(...geographicalLevels[geographicalLevel]);
  }
  return Promise.resolve(opts);
}
