import { Category } from "../Category";

export type GetAllCategoriesResponse = {
  success: boolean;
  message: null;
  data: Category[];
};
