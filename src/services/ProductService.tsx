import { GetProductsByCategoryResponse } from "@/types/DTOs/Product/GetProductsCategoryResponse";
import { IProductService } from "./interfaces/IProductService";
import { GetAllProductsResponse } from "@/types/DTOs/Product/GetAllProductsResponse";
import { CreateProductRequest } from "@/types/DTOs/Product/CreateProductRequest";
import { CreateProductResponse } from "@/types/DTOs/Product/CreateProductResponse";
import { UpdateProductRequest } from "@/types/DTOs/Product/UpdateProductRequest";
import { UpdateProductResponse } from "@/types/DTOs/Product/UpdateProductResponse";
import { DeleteProductResponse } from "@/types/DTOs/Product/DeleteProductResponse";
import { GetProductByIdResponse } from "@/types/DTOs/Product/GetProductByIdResponse";
import { apiClient } from "@/lib/axios-interceptor";

export const ProductService: IProductService = {
  getProducts: function (
    idCategory: number
  ): Promise<GetProductsByCategoryResponse> {
    return new Promise((resolve, reject) => {
      apiClient
        .get(`/Product/getallbycategory/${idCategory}`)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  },
  getAllProducts: function (): Promise<GetAllProductsResponse> {
    return new Promise((resolve, reject) => {
      apiClient
        .get("/Product/getall")
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  },
  getProductById: function (id: string): Promise<GetProductByIdResponse> {
    return new Promise((resolve, reject) => {
      apiClient
        .get(`/Product/get/${id}`)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  },
  createProduct: function (
    product: CreateProductRequest
  ): Promise<CreateProductResponse> {
    return new Promise((resolve, reject) => {
      apiClient
        .post("/Product/create", product)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  },
  updateProduct: function (
    product: UpdateProductRequest
  ): Promise<UpdateProductResponse> {
    return new Promise((resolve, reject) => {
      apiClient
        .put("/Product/update", product)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  },
  deleteProduct: function (id: number): Promise<DeleteProductResponse> {
    return new Promise((resolve, reject) => {
      apiClient
        .delete(`/Product/delete/${id}`)
        .then((response) => resolve(response.data))
        .catch((error) => reject(error));
    });
  },
};
