import { GetAllCategoriesResponse } from "@/types/DTOs/GetAllCategoriesResponse";
import { GetSubcategoriesResponse } from "@/types/DTOs/GetSubcategoriesResponse";
import { ICategoryService } from "./interfaces/ICategoryService";
const api_url = "http://localhost:5068";
export const CategoryService: ICategoryService = {
  getCategories: function (): Promise<GetAllCategoriesResponse> {
    return new Promise((resolve, reject) => {
      fetch(`${api_url}/Product/category/root`, {
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
      fetch(`${api_url}/Product/category/${id}/subcategories`, {
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
  getCategoryById: function (id: string): Promise<any> {
    throw new Error("Function not implemented.");
  },
  createCategory: function (category: any): Promise<any> {
    throw new Error("Function not implemented.");
  },
  updateCategory: function (id: string, category: any): Promise<any> {
    throw new Error("Function not implemented.");
  },
  deleteCategory: function (id: string): Promise<any> {
    throw new Error("Function not implemented.");
  },
};
