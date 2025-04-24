import { GetAllCategoriesResponse } from "@/types/GetAllCategoriesResponse";

export interface ICategoryService {
    getCategories: () => Promise<GetAllCategoriesResponse[]>;
    getCategoryById: (id: string) => Promise<any>;
    createCategory: (category: any) => Promise<any>;
    updateCategory: (id: string, category: any) => Promise<any>;
    deleteCategory: (id: string) => Promise<any>;
}