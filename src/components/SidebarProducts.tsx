import { Home, Inbox, Calendar, Search, Settings } from 'lucide-react'
import { SidebarProvider, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarGroupContent, SidebarMenu, SidebarMenuItem, SidebarMenuButton, Sidebar } from './ui/sidebar'

type Props = {}
const items = [
    {
      title: "Home",
      url: "#",
      icon: Home,
    },
    {
      title: "Inbox",
      url: "#",
      icon: Inbox,
    },
    {
      title: "Calendar",
      url: "#",
      icon: Calendar,
    },
    {
      title: "Search",
      url: "#",
      icon: Search,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
  ]
function SidebarProducts({}: Props) {
  return (
    <SidebarProvider>
      <Sidebar className="z-50 w-64 relative ">
        <SidebarContent className="bg-background border-r-none  font-clash-semibold ">
          <SidebarGroup>
            <SidebarGroupLabel>Categorias</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="">
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
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