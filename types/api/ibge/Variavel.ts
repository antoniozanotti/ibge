export type Variavel = {
  id: string;
  variavel: string;
  unidade: string;
  resultados: Resultado[];
};

type Resultado = {
  classificacoes: Classificacao[];
  series: Serie[];
};

type Classificacao = {
  id: string;
  nome: string;
  categoria: Categoria;
};

type Categoria = Record<number, string> & { length: 1 };

type Serie = {
  localidade: Localidade;
  serie: Valores;
};

type Localidade = {
  id: string;
  nivel: Nivel;
  nome: string;
};

type Nivel = {
  id: string;
  nome: string;
};

type Valores = {
  [periodo: string]: string;
};
