export type Category = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  parentCategoryId: null;
  parentCategoryName: null;
  subCategories: SubCategory[];
};
export type SubCategory = {
    id: number;
    name: string;
    createdAt: string;
    updatedAt: string;
    parentCategoryId: null;
    parentCategoryName: null;
    subCategories: SubCategory[];
};
