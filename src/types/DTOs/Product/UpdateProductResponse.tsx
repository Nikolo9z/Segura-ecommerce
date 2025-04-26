export type UpdateProductResponse= {
  success: boolean;
  message: string;
  data: ProductUpdate;
};

interface ProductUpdate {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
  imageUrl: string;
  updatedAt: string;
  categoryId: number;
  categoryName: string;
  discountPercentage: number;
  discountStartDate: string;
  discountEndDate: string;
  finalPrice: number;
}
