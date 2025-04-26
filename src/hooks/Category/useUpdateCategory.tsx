import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CategoryService } from "@/services/CategoryService";
import { UpdateCategoryRequest } from "@/types/DTOs/Category/UpdateCategoryRequest";

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updateCategory: UpdateCategoryRequest) => {
      return CategoryService.updateCategory(updateCategory);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
