import { Product } from "../../Product";

export type GetProductsByCategoryResponse = {
  success: boolean;
  message: null;
  data: Product[];
};
