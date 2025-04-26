import { CreateProductRequest } from "@/types/DTOs/CreateProductRequest";
import { CreateProductResponse } from "@/types/DTOs/CreateProductResponse";
import { GetAllProductsResponse } from "@/types/DTOs/GetAllProductsResponse";
import { GetProductsByCategoryResponse } from "@/types/DTOs/GetProductsCategoryResponse";

export interface IProductService {
  getProducts: (idCategory: number) => Promise<GetProductsByCategoryResponse>;
  getAllProducts: () => Promise<GetAllProductsResponse>;
  getProductById: (id: string) => Promise<any>;
  createProduct: (product: CreateProductRequest) => Promise<CreateProductResponse>;
  updateProduct: (id: string, product: any) => Promise<any>;
  deleteProduct: (id: string) => Promise<any>;
}
