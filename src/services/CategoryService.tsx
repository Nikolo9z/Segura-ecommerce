import { GetAllCategoriesResponse } from "@/types/DTOs/Category/GetAllCategoriesResponse";
import { GetSubcategoriesResponse } from "@/types/DTOs/Category/GetSubcategoriesResponse";
import { ICategoryService } from "./interfaces/ICategoryService";
import { CreateCategoryRequest } from "@/types/DTOs/Category/CreateCategoryRequest";
import { UpdateCategoryRequest } from "@/types/DTOs/Category/UpdateCategoryRequest";
import { Category } from "@/types/Category";
import apiClient from "@/lib/axios-interceptor";

export const CategoryService: ICategoryService = {
  getCategories: function (): Promise<GetAllCategoriesResponse> {
    return new Promise((resolve, reject) => {
      apiClient
        .get("/categories/root")
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  },
  getSubcategories: function (id: number): Promise<GetSubcategoriesResponse> {
    return new Promise((resolve, reject) => {
      apiClient
        .get(`/categories/${id}/subcategories`)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  },
  getCategoryById: function (id: string): Promise<Category> {
    return new Promise((resolve, reject) => {
      apiClient
        .get(`/categories/${id}`)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  },
  createCategory: function (
    category: CreateCategoryRequest
  ): Promise<Category> {
    return new Promise((resolve, reject) => {
      apiClient
        .post("/categories", category)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  },
  updateCategory: function (
    category: UpdateCategoryRequest
  ): Promise<Category> {
    return new Promise((resolve, reject) => {
      apiClient
        .put("/categories", category)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  },
  deleteCategory: function (id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      apiClient
        .delete(`/categories/${id}`)
        .then(() => resolve())
        .catch((error) => reject(error));
    });
  },
};
