export interface AllSubcategories {
  results: number;
  metadata: Metadata;
  data: Subcategory[];
}

export interface Metadata {
  currentPage: number;
  numberOfPages: number;
  limit: number;
  nextPage?: number;
}

export interface Subcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface SpecificSubcategory {
  data: Subcategory;
}

