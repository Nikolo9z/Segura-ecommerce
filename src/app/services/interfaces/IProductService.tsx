export interface IProductService {
    getProducts: () => Promise<any>;
    getProductById: (id: string) => Promise<any>;
    createProduct: (product: any) => Promise<any>;
    updateProduct: (id: string, product: any) => Promise<any>;
    deleteProduct: (id: string) => Promise<any>;
    }