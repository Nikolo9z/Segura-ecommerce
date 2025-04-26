import { ProductService } from "@/services/ProductService";
import { Product } from "@/types/Product";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = (idCategory: number) => {
  return useQuery<Product[]>({
    queryKey: ["products", idCategory],
    queryFn: async () => {
      const res = await ProductService.getProducts(idCategory);
      return res.data;
    },
    enabled: !!idCategory,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};
