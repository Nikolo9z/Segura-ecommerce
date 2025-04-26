import { CategoryService } from "@/services/CategoryService";
import { Category } from "@/types/Category";
import { useQuery } from "@tanstack/react-query";

export const useAllCategories = () => {
  return useQuery<Category[]>({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await CategoryService.getCategories();
      return res.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};
