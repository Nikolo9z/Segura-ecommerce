export type GetAllProductsResponse = {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  category: number;
  categoryName: string;
  discountPercentage: number;
  finalPrice: number;
}