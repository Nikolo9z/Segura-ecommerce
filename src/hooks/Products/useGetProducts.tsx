import { ProductService } from "@/app/services/IProductService";
import { useQuery } from "@tanstack/react-query";

export const useGetProducts = (idCategory: number) => {
  return useQuery({
    queryKey: ["products", idCategory],
    queryFn: () => ProductService.getProducts(idCategory),
    enabled: !!idCategory,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
  });
};
