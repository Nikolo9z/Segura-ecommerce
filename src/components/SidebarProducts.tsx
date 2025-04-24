import { Home, Inbox, Calendar, Search, Settings } from 'lucide-react'
import { SidebarProvider, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, Sidebar } from './ui/sidebar'
import { GetAllCategoriesResponse } from '@/types/GetAllCategoriesResponse';

type Props = {
  categories: GetAllCategoriesResponse[];

}
function SidebarProducts({categories}: Props) {
  return (
    <SidebarProvider className='w-fit'>
      <Sidebar className="z-50  relative border-r-background ">
        <SidebarContent className="bg-background border-r-none  font-clash-semibold ">
          <SidebarGroup>
            <SidebarGroupLabel className='text-lg'>Categorias</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="">
                {categories.map((category) => (
                  <SidebarMenuItem key={category.id} className="relative">
                    <SidebarMenuButton className="font-clash-medium">
                      {category.name.toUpperCase()}
                    </SidebarMenuButton>
                    <SidebarGroupContent> 
                      <ul className="grid w-[200px] gap-1 md:w-[300px] md:grid-cols-2 lg:w-[300px] relative z-[999]">
                        {category.subCategories.map((subCategory) => (
                          <SidebarMenuItem key={subCategory.id} className="cursor-pointer hover:bg-accent hover:text-accent-foreground rounded-md">
                            {subCategory.name}
                          </SidebarMenuItem>
                        ))}
                      </ul>
                    </SidebarGroupContent>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  )
}

export default SidebarProducts