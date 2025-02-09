export interface ILabel {
  value: number | string;
  label: string;
}

export type CompareParams = {
  standard: Array<string>;
  target: Array<string>;
  type?: string;
  onlyPositive?: boolean;
};

export type Similar = {
  type?: string;
  text: string;
  rate: number;
  distance: number;
  values: Array<number>;
};

export type ResultStat = {
  text: string;
  similar: Array<Similar>;
};

export type ResultFile = {
  origin: ImageBitmap;
  processed: Blob;
};

export type CreateParam = {
  account?: string;
  name: string;
  rarity: string;
  category: string;
  statics: Array<string>;
  staticsValues: Array<Array<number>>;
  stats: Array<string>;
  statValues: Array<Array<number>>;
};

type Option = {
  options: Array<{ id: string; text: string }>;
};

type Entry = {
  flags: { unique: string };
  name?: string;
  type?: string;
  text: string;
  id: string;
};

export type FilterGroup = {
  id: string;
  minMax: boolean;
  tip?: string;
  option?: Option;
  filters: Array<Filter>;
};

export type Filter = {
  id: string;
  text: string;
  option?: Option;
  label: string;
  entries: Array<Entry>;
  filters: Array<string>;
};

type Label = {
  value: string;
  label: string;
};

export type FilterData = {
  rarity: Array<Label>;
  category: Array<Label>;
  stats: Array<Label>;
  items: Array<Label>;
  uniques: Array<Label>;
};

export type ResultData = {
  origin: ImageBitmap;
  param: CreateParam;
};
