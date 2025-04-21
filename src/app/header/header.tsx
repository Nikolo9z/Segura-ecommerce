"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import NavigationMenuMain from "@/components/NavigationMenuMain";
import { ModeToggle } from "@/components/ModeToggle";

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
    { href: "/productos", label: "PRODUCTOS" },
    { href: "/contacto", label: "CONTACTO" },
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

      {/* Menú de navegación */}
      <NavigationMenuMain categories={categories} navLinks={navLinks} />

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
