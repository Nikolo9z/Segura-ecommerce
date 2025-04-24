export type GetAllCategoriesResponse = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  parentCategoryId: null;
  parentCategoryName: null;
  subCategories: SubCategory[];
}

interface SubCategory {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  parentCategoryId: number;
  parentCategoryName: string;
  subCategories: any[];
}
