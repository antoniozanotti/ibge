export interface MultiSelectOption {
  id: string;
  label: string;
  options: Options;
}

interface Options {
  label: string;
  value: string;
}
