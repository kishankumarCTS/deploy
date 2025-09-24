export type PlanBenefit = {
  id: number;
  label: string;
};

export type Product = {
  id: number;
  osName: string;
  osVersion: string;
  planBenifits: PlanBenefit[];
  architecture: string;
  lastUpdate: string;
};

export type MarketImageData = {
  id: number;
  type: string;
  total_results: number;
  products: Product[];
};

export type MarketImagesData = MarketImageData;
