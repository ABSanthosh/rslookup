export interface ICredit {
  name: string;
  email: string;
  role: string;
  image: string;
  date: string;
  description: string;
}

export interface IConsolidatedCredit {
  name: string;
  email: string;
  role: string;
  image: string;
  changes: { email: string, date: string; description?: string }[];
}