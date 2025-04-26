import { Home, Inbox, Calendar, Search, Settings } from "lucide-react";
import {
  SidebarProvider,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  Sidebar,
} from "./ui/sidebar";
import { GetAllCategoriesResponse } from "@/types/DTOs/Category/GetAllCategoriesResponse";
import { GetSubcategoriesResponse } from "@/types/DTOs/Category/GetSubcategoriesResponse";
import { SubCategory } from "@/types/Category";

type Props = {
  categories: SubCategory[];
  onSelectSubcategory: (subcategoryId: number) => void;
};
function SidebarProducts({ categories, onSelectSubcategory }: Props) {
  return (
    <SidebarProvider className="w-fit">
      <Sidebar className="z-50  relative border-r-background ">
        <SidebarContent className="bg-background border-r-none  font-clash-semibold ">
          <SidebarGroup>
            <SidebarGroupLabel className="text-lg">
              Categorias {categories[0]?.parentCategoryName}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="">
                {categories.map((category) => (
                  <SidebarMenuItem key={category.id} className="relative">
                    <SidebarMenuButton
                      className="font-clash-medium"
                      onClick={() => onSelectSubcategory(category.id)}
                    >
                      {category.name.toUpperCase()}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  );
}

export default SidebarProducts;
