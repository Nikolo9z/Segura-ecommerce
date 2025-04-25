export type CreateProductRequest = {
  name: string;
  price: number;
  description: string;
  stock: number;
  imageUrl: string;
  categoryId: number;
  discountPercentage: number;
  discountStartDate: string;
  discountEndDate: string;
}