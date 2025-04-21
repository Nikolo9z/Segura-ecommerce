"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"

export default function Header() {
  const navLinks = [
    { href: "/productos", label: "Productos" },
    { href: "/carrito", label: "Carrito" },
    { href: "/contacto", label: "Contacto" },
  ]

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-background/70 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Logo */}
      <Link href="/" className="text-xl font-semibold tracking-tight">
        🛍️ MiTienda
      </Link>

      {/* Navegación en desktop */}
      <nav className="hidden md:flex items-center gap-6 text-sm">
        {navLinks.map((link) => (
          <Link key={link.href} href={link.href} className="hover:underline">
            {link.label}
          </Link>
        ))}
      </nav>

      {/* Acciones */}
      <div className="flex items-center gap-4">
        <ModeToggle />
        <Link href="/auth/login" className="hidden md:inline-block">
          <Button variant="outline">Login</Button>
        </Link>
        <Link href="/auth/register" className="hidden md:inline-block">
          <Button variant="outline">Register</Button>
        </Link>
      </div>
    </header>
  )
}
