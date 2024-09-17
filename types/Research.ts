import type { Aggregated } from "./Aggregated";

export interface Research {
  id: string;
  nome: string;
  agregados: Aggregated[];
}