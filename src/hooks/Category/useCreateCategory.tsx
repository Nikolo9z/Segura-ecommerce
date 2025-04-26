import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CategoryService } from "@/services/CategoryService";
import { CreateCategoryRequest } from "@/types/DTOs/Category/CreateCategoryRequest";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newCategory: CreateCategoryRequest) => {
      return CategoryService.createCategory(newCategory);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
