export type Tag = {
  id?: number;
  name: string;
};

export type Category = {
  id: string;
  name: string;
};

export type Value = {
  value1: number;
  value2: number;
  value3: number;
  value4: number;
  value5: number;
};

export type Stat = {
  id?: string;
  contents: string;
  values?: Value;
};

export type Item = {
  id?: number;
  categoryId: string;
  stats: Array<Stat>;
  tags: Array<Tag>;
};
