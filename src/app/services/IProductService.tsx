import { GetProductsCategoryResponse } from "@/types/GetProductsCategoryResponse";
import { IProductService } from "./interfaces/IProductService";
import { GetAllProductsResponse } from "@/types/GetAllProductsResponse";
const api_url = "http://localhost:5068";
export const ProductService: IProductService = {
    getProducts: function (idCategory: number): Promise<GetProductsCategoryResponse[]> {
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
    getAllProducts: function (): Promise<GetAllProductsResponse[]> {
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
    createProduct: function (product: any): Promise<any> {
        throw new Error("Function not implemented.");
    },
    updateProduct: function (id: string, product: any): Promise<any> {
        throw new Error("Function not implemented.");
    },
    deleteProduct: function (id: string): Promise<any> {
        throw new Error("Function not implemented.");
    },
};
