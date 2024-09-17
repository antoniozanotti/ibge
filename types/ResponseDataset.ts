export interface ResponseDataset extends Array<Dataset> {}

interface Dataset {
  id: string;
  variavel: string;
  unidade: string;
  resultados: Result[];
}

interface Result {
  classificacoes: Classification[];
  series: Sequence[];
}

interface Classification {
  id: string;
  nome: string;
  categoria: Category;
}

interface Category {
  <Type>(arg: Type): string;
}

interface Sequence {
  localidade: Location;
  serie: HistoricalData;
}

interface Location {
  id: string;
  nivel: GeographicalLevel;
  nome: string;
}

interface GeographicalLevel {
  id: string;
  nome: string;
}

interface HistoricalData {
  <Type>(arg: Type): string;
}