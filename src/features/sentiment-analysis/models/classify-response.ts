export interface ClassifyResponse {
  categories: Category[];
}

export interface Category {
  name: string;
  confidence: number;
}
