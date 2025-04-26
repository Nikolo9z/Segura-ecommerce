import { CreateProductRequest } from "@/types/DTOs/Product/CreateProductRequest";
import { CreateProductResponse } from "@/types/DTOs/Product/CreateProductResponse";
import { DeleteProductResponse } from "@/types/DTOs/Product/DeleteProductResponse";
import { GetAllProductsResponse } from "@/types/DTOs/Product/GetAllProductsResponse";
import { GetProductsByCategoryResponse } from "@/types/DTOs/Product/GetProductsCategoryResponse";
import { UpdateProductRequest } from "@/types/DTOs/Product/UpdateProductRequest";
import { UpdateProductResponse } from "@/types/DTOs/Product/UpdateProductResponse";

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
