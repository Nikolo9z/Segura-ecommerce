import { GetProductsByCategoryResponse } from "@/types/DTOs/GetProductsCategoryResponse";
import { IProductService } from "./interfaces/IProductService";
import { GetAllProductsResponse } from "@/types/DTOs/GetAllProductsResponse";
import { CreateProductRequest } from "@/types/DTOs/CreateProductRequest";
import { CreateProductResponse } from "@/types/DTOs/CreateProductResponse";
import { UpdateProductRequest } from "@/types/DTOs/UpdateProductRequest";
import { UpdateProductResponse } from "@/types/DTOs/UpdateProductResponse";
import { DeleteProductResponse } from "@/types/DTOs/DeleteProductResponse";
const api_url = "http://localhost:5068";
export const ProductService: IProductService = {
  getProducts: function (
    idCategory: number
  ): Promise<GetProductsByCategoryResponse> {
    return new Promise((resolve, reject) => {
      fetch(`${api_url}/Product/getallbycategory/${idCategory}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch products");
          }
          return response.json();
        })
        .then((products) => resolve(products))
        .catch((error) => reject(error));
    });
  },
  getAllProducts: function (): Promise<GetAllProductsResponse> {
    return new Promise((resolve, reject) => {
      fetch(`${api_url}/Product/getall`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch products");
          }
          return response.json();
        })
        .then((products) => resolve(products))
        .catch((error) => reject(error));
    });
  },
  getProductById: function (id: string): Promise<any> {
    throw new Error("Function not implemented.");
  },
  createProduct: function (
    product: CreateProductRequest
  ): Promise<CreateProductResponse> {
    return new Promise((resolve, reject) => {
      fetch(`${api_url}/Product/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(product),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to create product");
          }
          return response.json();
        })
        .then((product) => resolve(product))
        .catch((error) => reject(error));
    });
  },
  updateProduct: function (
    product: UpdateProductRequest
  ): Promise<UpdateProductResponse> {
    return new Promise((resolve, reject) => {
      fetch(`${api_url}/Product/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(product),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to update product");
          }
          return response.json();
        })
        .then((product) => resolve(product))
        .catch((error) => reject(error));
    });
  },
  deleteProduct: function (id: number): Promise<DeleteProductResponse> {
    return new Promise((resolve, reject) => {
      fetch(`${api_url}/Product/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete product");
          }
          return response.json();
        })
        .then((product) => resolve(product))
        .catch((error) => reject(error));
    });
  },
};
