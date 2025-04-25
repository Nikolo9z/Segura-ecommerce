"use client";

import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { GetAllCategoriesResponse } from "@/types/GetAllCategoriesResponse";

type NavigationMenuMainProps = {
  categories: GetAllCategoriesResponse[];
  navLinks: {
    label: string;
    href: string;
  }[];
};

export default function NavigationMenuMain({
  categories,
  navLinks,
}: NavigationMenuMainProps) {
  return (
    <NavigationMenu className="z-50">
      <NavigationMenuList>
        {/* Menú desplegable para categorías */}
        {categories.map((category) => (
          <NavigationMenuItem key={category.id} className="relative">
            <NavigationMenuTrigger className="font-clash-medium">
              {category.name.toUpperCase()}
            </NavigationMenuTrigger>
            <NavigationMenuContent> 
              <ul className="grid w-[200px] gap-1 md:w-[300px] md:grid-cols-2 lg:w-[300px] relative z-[999]">
                {category.subCategories.map((subCategory) => (
                  <ListItem
                    key={subCategory.id}
                    title={subCategory.name}
                    href={`/products/${category.id}/${subCategory.id}`}
                    className="cursor-pointer hover:bg-accent hover:text-accent-foreground rounded-md"
                  >
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        ))}

        {/* Enlaces directos del menú */}
        {navLinks.map((link) => (
          <NavigationMenuItem key={link.href}>
            <NavigationMenuLink asChild>
              <Link href={link.href} className={navigationMenuTriggerStyle()}>
                {link.label}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

// Componente auxiliar para los elementos de la lista del menú desplegable
function ListItem({
  className,
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"a"> & {
  title: string;
}) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href || "#"}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors",
            className
          )}
          {...props}
        >
          <div className="text-sm font-clash-semibold leading-none">
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
