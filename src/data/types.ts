export type Sarga = {
  id: string;
  number: number;
  title: string;
  content: string[];
};

export type Kandam = {
  id: string;
  name: string;
  description: string;
  sargas: Sarga[];
};

export type Pravachanam = {
  id: string;
  number: number | string;
  title: string;
  shloka?: string;
  content: string[];
};
