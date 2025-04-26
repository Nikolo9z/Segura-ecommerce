import { GetAllCategoriesResponse } from "@/types/DTOs/Category/GetAllCategoriesResponse";
import { GetSubcategoriesResponse } from "@/types/DTOs/Category/GetSubcategoriesResponse";
import { ICategoryService } from "./interfaces/ICategoryService";
import { CreateCategoryRequest } from "@/types/DTOs/Category/CreateCategoryRequest";
import { UpdateCategoryRequest } from "@/types/DTOs/Category/UpdateCategoryRequest";
import { Category } from "@/types/Category";

const api_url = "http://localhost:5068";
export const CategoryService: ICategoryService = {
  getCategories: function (): Promise<GetAllCategoriesResponse> {
    return new Promise((resolve, reject) => {
      fetch(`${api_url}/categories/root`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch categories");
          }
          return response.json();
        })
        .then((categories) => resolve(categories))
        .catch((error) => reject(error));
    });
  },
  getSubcategories: function (id: number): Promise<GetSubcategoriesResponse> {
    return new Promise((resolve, reject) => {
      fetch(`${api_url}/categories/${id}/subcategories`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch subcategories");
          }
          return response.json();
        })
        .then((subcategories) => resolve(subcategories))
        .catch((error) => reject(error));
    });
  },
  getCategoryById: function (id: string): Promise<Category> {
    return new Promise((resolve, reject) => {
      fetch(`${api_url}/categories/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch category");
          }
          return response.json();
        })
        .then((category) => resolve(category))
        .catch((error) => reject(error));
    });
  },
  createCategory: function (
    category: CreateCategoryRequest
  ): Promise<Category> {
    return new Promise((resolve, reject) => {
      fetch(`${api_url}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to create category");
          }
          return response.json();
        })
        .then((createdCategory) => resolve(createdCategory))
        .catch((error) => reject(error));
    });
  },
  updateCategory: function (
    category: UpdateCategoryRequest
  ): Promise<Category> {
    return new Promise((resolve, reject) => {
      fetch(`${api_url}/categories`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(category),
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to update category");
          }
          return response.json();
        })
        .then((updatedCategory) => resolve(updatedCategory))
        .catch((error) => reject(error));
    });
  },
  deleteCategory: function (id: number): Promise<void> {
    return new Promise((resolve, reject) => {
      fetch(`${api_url}/categories/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete category");
          }
          resolve();
        })
        .catch((error) => reject(error));
    });
  },
};
