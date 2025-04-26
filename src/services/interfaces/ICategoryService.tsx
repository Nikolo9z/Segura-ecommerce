import { GetAllCategoriesResponse } from "@/types/DTOs/GetAllCategoriesResponse";
import { GetSubcategoriesResponse } from "@/types/DTOs/GetSubcategoriesResponse";

export interface ICategoryService {
  getCategories: () => Promise<GetAllCategoriesResponse>;
  getSubcategories: (id: number) => Promise<GetSubcategoriesResponse>;
  getCategoryById: (id: string) => Promise<any>;
  createCategory: (category: any) => Promise<any>;
  updateCategory: (id: string, category: any) => Promise<any>;
  deleteCategory: (id: string) => Promise<any>;
}
