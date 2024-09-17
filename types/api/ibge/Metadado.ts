export type Metadado = {
  id: string;
  nome: string;
  URL: string;
  pesquisa: string;
  assunto: string;
  periodicidade: Periodicidade;
  nivelTerritorial: NivelTerritorial;
  variaveis: Variavel[];
  classificacoes: Classificacao[];
};

type Periodicidade = {
  frequencia: string;
  inicio: string;
  fim: string;
};

export type NivelTerritorial = {
  Administrativo: string[];
  Especial: string[];
  IBGE: string[];
};

type Variavel = {
  id: string;
  nome: string;
  unidade: string;
  sumarizacao: string[];
};

type Classificacao = {
  id: string;
  nome: string;
  sumarizacao: Sumarizacao;
  categorias: Categoria[];
};

type Sumarizacao = {
  status: boolean;
  excecao: string[];
};

type Categoria = {
  id: string;
  nome: string;
  unidade: string;
  nivel: number;
};
