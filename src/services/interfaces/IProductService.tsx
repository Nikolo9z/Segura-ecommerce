import { CreateProductRequest } from "@/types/DTOs/CreateProductRequest";
import { CreateProductResponse } from "@/types/DTOs/CreateProductResponse";
import { DeleteProductResponse } from "@/types/DTOs/DeleteProductResponse";
import { GetAllProductsResponse } from "@/types/DTOs/GetAllProductsResponse";
import { GetProductsByCategoryResponse } from "@/types/DTOs/GetProductsCategoryResponse";
import { UpdateProductRequest } from "@/types/DTOs/UpdateProductRequest";
import { UpdateProductResponse } from "@/types/DTOs/UpdateProductResponse";

export interface IProductService {
  getProducts: (idCategory: number) => Promise<GetProductsByCategoryResponse>;
  getAllProducts: () => Promise<GetAllProductsResponse>;
  getProductById: (id: string) => Promise<any>;
  createProduct: (
    product: CreateProductRequest
  ) => Promise<CreateProductResponse>;
  updateProduct: (
    product: UpdateProductRequest
  ) => Promise<UpdateProductResponse>;
  deleteProduct: (id: number) => Promise<DeleteProductResponse>;
}
