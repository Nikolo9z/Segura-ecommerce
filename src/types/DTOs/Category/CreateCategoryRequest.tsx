export interface CreateCategoryRequest {
  name: string;
  parentCategoryId?: number | null;
}
