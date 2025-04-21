"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
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

export default function Header() {
  // Definición de enlaces y categorías para el menú de navegación
  const categories = [
    {
      title: "Categorías",
      items: [
        {
          title: "Camisas",
          href: "/category/camisas",
          description: "Camisas para toda ocasión",
        },
        {
          title: "Pantalones",
          href: "/category/pantalones",
          description: "Pantalones de calidad para un look impecable",
        },
        {
          title: "Trajes",
          href: "/category/trajes",
          description: "Trajes elegantes para ocasiones especiales",
        },
        {
          title: "Accesorios",
          href: "/category/accesorios",
          description: "Complementos para elevar tu estilo",
        },
      ],
    },
  ];

  const navLinks = [
    { href: "/productos", label: "Productos" },
    { href: "/contacto", label: "Contacto" },
  ];

  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Este efecto se ejecuta solo en el lado del cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  // Determina qué logo usar basado en el tema
  const logoSrc =
    mounted && theme === "dark" ? "/logodark.webp" : "/logowhite.webp";

  return (
    <header className="flex font-clash items-center justify-between px-6 py-4 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 relative z-50">
      {/* Logo condicional */}
      <Link href="/" className="text-xl font-semibold tracking-tight">
        <img className="h-14" src={logoSrc} alt="Logo" />
      </Link>

      {/* Navegación principal */}
      <NavigationMenu className="z-50">
        <NavigationMenuList>
          {/* Menú desplegable para categorías */}
          <NavigationMenuItem className="relative">
            <NavigationMenuTrigger className="font-clash-medium">Categorías</NavigationMenuTrigger>
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
              <Link href={link.href} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {link.label}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}

          {/* Carrito con badge de cantidad */}
          <NavigationMenuItem>
            <Link href="/carrito" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                <div className="flex items-center">
                  <span>Carrito</span>
                  {/* Badge opcional para mostrar cantidad */}
                  <span className="ml-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    3
                  </span>
                </div>
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      {/* Acciones: tema y botones de autenticación */}
      <div className="flex items-center gap-4">
        <ModeToggle />
        <Link href="/auth/login" className="hidden md:inline-block">
          <Button className="text-white">Login</Button>
        </Link>
        <Link href="/auth/register" className="hidden md:inline-block">
          <Button className="text-white">Register</Button>
        </Link>
      </div>
    </header>
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
