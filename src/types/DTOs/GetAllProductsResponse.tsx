import { Product } from "../Product";

export type GetAllProductsResponse = {
  success: boolean;
  message: null;
  data: Product[];
};
