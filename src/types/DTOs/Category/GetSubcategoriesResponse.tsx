import { SubCategory } from "../../Category";
export interface GetSubcategoriesResponse {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  parentCategoryId: number;
  parentCategoryName: string;
  data: SubCategory[];
}
