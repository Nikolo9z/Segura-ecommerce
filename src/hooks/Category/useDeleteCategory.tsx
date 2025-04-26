import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CategoryService } from "@/services/CategoryService";
import { Category } from "@/types/Category";

export const useDeleteCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (category: Category) => {
      return CategoryService.deleteCategory(category.id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });
};
