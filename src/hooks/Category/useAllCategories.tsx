import { CategoryService } from "@/app/services/CategoryService";
import { useQuery } from "@tanstack/react-query";

export const useAllCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => CategoryService.getCategories(),
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 5,
  });
};
