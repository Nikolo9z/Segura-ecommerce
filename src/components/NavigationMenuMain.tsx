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

// Definir los tipos para las props
type CategoryItem = {
  title: string;
  href: string;
  description: string;
};

type NavigationMenuMainProps = {
  categories: {
    title: string;
    items: CategoryItem[];
  }[];
  navLinks: {
    href: string;
    label: string;
  }[];
};

export default function NavigationMenuMain({ categories, navLinks }: NavigationMenuMainProps) {
  return (
    <NavigationMenu className="z-50">
      <NavigationMenuList>
        {/* Menú desplegable para categorías */}
        <NavigationMenuItem className="relative">
          <NavigationMenuTrigger className="font-clash-medium">
            MUJER
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] relative z-[999]">
              {categories[0].items.map((item) => (
                <ListItem
                  key={item.title}
                  title={item.title}
                  href={item.href}
                  className="cursor-pointer hover:bg-accent hover:text-accent-foreground rounded-md"
                >
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="relative">
          <NavigationMenuTrigger className="font-clash-medium">
            HOMBRE
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] relative z-[999]">
              {categories[0].items.map((item) => (
                <ListItem
                  key={item.title}
                  title={item.title}
                  href={item.href}
                  className="cursor-pointer hover:bg-accent hover:text-accent-foreground rounded-md"
                >
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem className="relative">
          <NavigationMenuTrigger className="font-clash-medium">
            HOGAR
          </NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] relative z-[999]">
              {categories[0].items.map((item) => (
                <ListItem
                  key={item.title}
                  title={item.title}
                  href={item.href}
                  className="cursor-pointer hover:bg-accent hover:text-accent-foreground rounded-md"
                >
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

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
          <div className="text-sm font-clash-semibold leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}