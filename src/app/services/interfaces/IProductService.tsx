import { GetProductsCategoryResponse } from "@/types/GetProductsCategoryResponse";

export interface IProductService {
  getProducts: (idCategory: number) => Promise<GetProductsCategoryResponse[]>;
  getProductById: (id: string) => Promise<any>;
  createProduct: (product: any) => Promise<any>;
  updateProduct: (id: string, product: any) => Promise<any>;
  deleteProduct: (id: string) => Promise<any>;
}
