"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function Header() {
  const navLinks = [
    { href: "/productos", label: "Productos" },
    { href: "/carrito", label: "Carrito" },
    { href: "/contacto", label: "Contacto" },
  ]

  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  
  // Este efecto se ejecuta solo en el lado del cliente
  useEffect(() => {
    setMounted(true)
  }, [])

  // Determina qué logo usar basado en el tema
  const logoSrc = mounted && theme === "dark" ? "/logodark.webp" : "/logowhite.webp"
  console.log(theme)

  return (
    <header className="flex font-clash items-center justify-between px-6 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Logo condicional */}
      <Link href="/" className="text-xl font-semibold tracking-tight">
        <img className="w-45 h-22" src={logoSrc} alt="Logo" />
      </Link>

      {/* Navegación en desktop */}
      <nav className="hidden md:flex items-center gap-6 text-lg">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className="hover:underline">
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Acciones */}
      <div className="flex items-center gap-4 ">
        <ModeToggle />
        <Link href="/auth/login" className="hidden md:inline-block">
          <Button className="text-white" >Login</Button>
        </Link>
        <Link href="/auth/register" className="hidden md:inline-block">
          <Button className="text-white" >Register</Button>
        </Link>
      </div>
    </header>
  )
}
