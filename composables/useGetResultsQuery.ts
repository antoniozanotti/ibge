import { API_URL } from "../consts";
import { useQuery } from "@tanstack/vue-query";
import type { Ref } from "vue";
import axios from "axios";
import type { NivelGeografico } from "~/types/NivelGeografico";
import type { GrupoDeClassificacao } from "~/types/GrupoDeClassificacao";

export function useGetResultsQuery(
  agregado: Ref,
  variavel: Ref,
  periodos: Ref,
  localidades: Ref,
  classificacoes: Ref,
  grupoDeDados: Ref,
  isValid: Ref
) {
  return useQuery({
    queryKey: [
      "resultados",
      agregado,
      variavel,
      periodos,
      localidades,
      grupoDeDados,
      classificacoes,
      isValid,
    ],
    queryFn: () =>
      fetchAgregadoById(
        agregado,
        variavel,
        periodos,
        localidades,
        classificacoes,
        grupoDeDados,
        isValid
      ),
  });
}

async function fetchAgregadoById(
  agregado: Ref,
  variavel: Ref,
  periodos: Ref,
  localidades: Ref,
  classificacoes: Ref,
  grupoDeDados: Ref,
  isValid: Ref
) {
  if (!isValid.value) {
    return [];
  }

  const url = prepareUrl(
    agregado.value,
    variavel.value,
    periodos.value,
    localidades.value,
    classificacoes.value
  );

  const response = await axios.get(url);
  return response.data;
}

function prepareUrl(
  agregado: string,
  variavel: string,
  periodos: string[],
  localidades: string[],
  classificacoes: string[]
) {
  const agregadoUrlPart = `agregados/${agregado}`;
  const periodosUrlPart = `/periodos/${periodos.join("|")}`;
  const variaveisUrlPart = `/variaveis/${variavel}`;
  const localidadesUrlPart = prepareLocalidadesUrlPart(localidades);
  const classificacaoUrlPart = prepareClassificacaoUrlPart(classificacoes);
  return `${API_URL}${agregadoUrlPart}${periodosUrlPart}${variaveisUrlPart}${localidadesUrlPart}${classificacaoUrlPart}`;
}

function prepareLocalidadesUrlPart(localidades: string[]) {
  let niveisGeograficos: NivelGeografico[] = [];
  for (const nivelGeograficoAndlocalidade of localidades) {
    const [nivelGeografico, localidade] =
      nivelGeograficoAndlocalidade.split("_");
    const found = niveisGeograficos.find((item) => item.id === nivelGeografico);
    if (found) {
      found["localidades"].push(localidade);
    } else {
      niveisGeograficos.push({
        id: nivelGeografico,
        localidades: [localidade],
      });
    }
  }
  return `?localidades=${niveisGeograficos
    .map((item) => `${item.id}[${item.localidades.join(",")}]`)
    .join("|")}`;
}

function prepareClassificacaoUrlPart(classificacoes: string[]) {
  let grupoDeClassificacao: GrupoDeClassificacao[] = [];
  for (const nivelGeograficoAndlocalidade of classificacoes) {
    const [nivelGeografico, localidade] =
      nivelGeograficoAndlocalidade.split("_");
    const found = grupoDeClassificacao.find(
      (item) => item.id === nivelGeografico
    );
    if (found) {
      found["classificacoes"].push(localidade);
    } else {
      grupoDeClassificacao.push({
        id: nivelGeografico,
        classificacoes: [localidade],
      });
    }
  }
  return classificacoes.length > 0
    ? `&classificacao=${grupoDeClassificacao
        .map((item) => `${item.id}[${item.classificacoes.join(",")}]`)
        .join("|")}`
    : "";
}
