import { ProductService } from "@/services/ProductService";
import { CreateProductRequest } from "@/types/DTOs/CreateProductRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (product: CreateProductRequest) => {
      return ProductService.createProduct(product);
    },
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["products", variables.categoryId],
      });
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
    },
  });
};
