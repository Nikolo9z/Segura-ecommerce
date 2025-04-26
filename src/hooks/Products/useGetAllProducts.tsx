import { ProductService } from "@/services/ProductService";
import { Product } from "@/types/Product";
import { useQuery } from "@tanstack/react-query";

export const useGetAllProducts = () => {
  return useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      const res = await ProductService.getAllProducts();
      return res.data;
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};
