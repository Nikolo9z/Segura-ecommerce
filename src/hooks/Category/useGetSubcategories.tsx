import { CategoryService } from "@/app/services/CategoryService"
import { useQuery } from "@tanstack/react-query"

export const useGetSubcategories = (id:number) => {
    return useQuery({
        queryKey: ["subcategories",id],
        queryFn: () => CategoryService.getSubcategories(id),
        refetchOnWindowFocus: false,
        staleTime: 1000 * 60 * 5, // 5 minutes
    })
}