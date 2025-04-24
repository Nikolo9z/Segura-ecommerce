import { IProductService } from "./interfaces/IProductService";

export const ProductService: IProductService = {
    getProducts: function (): Promise<any> {
        throw new Error("Function not implemented.");
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
    }
}