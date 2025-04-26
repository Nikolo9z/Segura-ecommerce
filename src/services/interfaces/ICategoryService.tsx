import { Category } from "@/types/Category";
import { CreateCategoryRequest } from "@/types/DTOs/Category/CreateCategoryRequest";
import { GetAllCategoriesResponse } from "@/types/DTOs/Category/GetAllCategoriesResponse";
import { GetSubcategoriesResponse } from "@/types/DTOs/Category/GetSubcategoriesResponse";
import { UpdateCategoryRequest } from "@/types/DTOs/Category/UpdateCategoryRequest";

export interface ICategoryService {
  getCategories(): Promise<GetAllCategoriesResponse>;
  getSubcategories(id: number): Promise<GetSubcategoriesResponse>;
  getCategoryById(id: string): Promise<Category>;
  createCategory(category: CreateCategoryRequest): Promise<Category>;
  updateCategory(category: UpdateCategoryRequest): Promise<Category>;
  deleteCategory(id: number): Promise<void>;
}
