import { ProductService } from "@/services/ProductService";
import { UpdateProductRequest } from "@/types/DTOs/UpdateProductRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (product: UpdateProductRequest) => {
      return ProductService.updateProduct(product);
    },
    onSuccess: (data, variables) => {
      if (variables.categoryId) {
        queryClient.invalidateQueries({
          queryKey: ["products", variables.categoryId],
        });
      }
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};
