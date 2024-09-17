export type Research = {
  id: string;
  nome: string;
  agregados: Aggregated[];
};

type Aggregated = {
  id: string;
  nome: string;
};
