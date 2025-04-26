import { Product } from "../../Product";

export type GetProductByIdResponse = {
  success: boolean;
  message: null;
  data: Product;
};
