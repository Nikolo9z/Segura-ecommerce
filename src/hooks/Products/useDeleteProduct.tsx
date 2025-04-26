import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Product } from "../../types/Product";
import { ProductService } from "@/services/ProductService";

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (product: Product) => {
      return ProductService.deleteProduct(product.id);
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      queryClient.invalidateQueries({
        queryKey: ["products", variables.category],
      });
    },
  });
};
