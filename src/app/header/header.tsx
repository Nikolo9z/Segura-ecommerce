"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import NavigationMenuMain from "@/components/NavigationMenuMain";
import { ModeToggle } from "@/components/ModeToggle";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useAuthStore } from "@/stores/AuthStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAllCategories } from "@/hooks/Category/useAllCategories";
import { useRouter } from "next/navigation";

export default function Header() {
  const user = useAuthStore((state) => state);
  const categories = useAllCategories();
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();

  // Este efecto solo se ejecuta en el cliente
  useEffect(() => {
    setIsClient(true);
  }, []);

  const navLinks = [
    { href: "/buscar", label: "BUSCAR", isSearch: true },
    { href: "/ofertas", label: "OFERTAS" },
    { href: "/mas-vendidos", label: "MAS VENDIDOS" },
    { href: "/quienes-somos", label: "QUIENES SOMOS" },
    { href: "/contacto", label: "CONTACTO" },
  ];

  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Este efecto se ejecuta solo en el lado del cliente
  useEffect(() => {
    setMounted(true);
  }, []);

  // Maneja la búsqueda
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementa tu lógica de búsqueda aquí
    console.log("Buscando:", searchQuery);
    // Opcional: redireccionar a la página de resultados
    // router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
  };

  // Determina qué logo usar basado en el tema
  const logoSrc =
    mounted && theme === "dark" ? "/logodark.webp" : "/logowhite.webp";

  return (
    <header className="flex font-clash items-center justify-between px-6 py-4 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60 relative z-50">
      {/* Logo condicional */}
      <Link href="/" className="text-xl font-semibold tracking-tight">
        <img className="h-14" src={logoSrc} alt="Logo" />
      </Link>

      {/* Menú de navegación */}
      <div className="flex items-center">
        <NavigationMenuMain
          categories={categories.data || []}
          navLinks={navLinks.filter((link) => !link.isSearch)}
        />
        {/* Buscador expandible */}
        <div
          className={`transition-all duration-300 overflow-hidden ${
            searchOpen ? "w-60 opacity-100 mr-4" : "w-0 opacity-0"
          }`}
        >
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="text"
              placeholder="Buscar productos..."
              className="pr-8 h-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              aria-label="Buscar"
            >
              <Search className="h-4 w-4" />
            </button>
          </form>
        </div>

        {/* Botón de búsqueda */}
        <Button
          variant="ghost"
          size="sm"
          className="mr-2"
          onClick={() => setSearchOpen(!searchOpen)}
        >
          <Search className="h-4 w-4 mr-1" />
          Buscar
        </Button>
      </div>

      {/* Acciones: tema y botones de autenticación */}
      <div className="flex items-center gap-4">
        <ModeToggle />
        {isClient ? (
          user.isLoggedIn() ? (
            <DropdownMenu>
              <DropdownMenuTrigger className="cursor-pointer bg-primary p-2 rounded w-20">
                {user.user?.username}
              </DropdownMenuTrigger>
              <DropdownMenuContent className="cursor-pointer">
                <DropdownMenuLabel>{user.user?.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => router.push("/admin/products/list")}
                >
                  Productos
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => user.logout()}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/auth/login" className="hidden md:inline-block">
                <Button className="text-white">Login</Button>
              </Link>
              <Link href="/auth/register" className="hidden md:inline-block">
                <Button className="text-white">Register</Button>
              </Link>
            </>
          )
        ) : (
          // Mostrar un placeholder mientras se determina el estado de autenticación
          <>
            <Link href="/auth/login" className="hidden md:inline-block">
              <Button className="text-white">Login</Button>
            </Link>
            <Link href="/auth/register" className="hidden md:inline-block">
              <Button className="text-white">Register</Button>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}
