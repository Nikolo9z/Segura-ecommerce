import { ProductService } from "@/services/ProductService";
import { Product } from "@/types/Product";
import { useQuery } from "@tanstack/react-query";

export const useGetProductById = (id: string | number) => {
  return useQuery<Product>({
    queryKey: ["product", id],
    queryFn: async () => {
      const res = await ProductService.getProductById(id.toString());
      return res.data;
    },
    enabled: !!id,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};
