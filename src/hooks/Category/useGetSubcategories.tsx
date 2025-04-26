import { CategoryService } from "@/services/CategoryService";
import { SubCategory } from "@/types/Category";
import { useQuery } from "@tanstack/react-query";

export const useGetSubcategories = (id: number) => {
  return useQuery<SubCategory[]>({
    queryKey: ["subcategories", id],
    queryFn: async () => {
      const res = await CategoryService.getSubcategories(id);
      console.log("Subcategories", res);
      return res.data;
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
