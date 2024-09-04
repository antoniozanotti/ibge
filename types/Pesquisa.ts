import type { Agregado } from "./Agregado";

export interface Pesquisa {
  id: string;
  nome: string;
  agregados: Agregado[];
}