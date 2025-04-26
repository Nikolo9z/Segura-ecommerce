export type CreateProductResponse = {
  success: boolean;
  message: string;
  data: Data;
}

interface Data {
  id: number;
  name: string;
  price: number;
  description: string;
  stock: number;
  imageUrl: string;
  category: string;
  discountPercentage: number;
  discountStartDate: string;
  discountEndDate: string;
  finalPrice: number;
}