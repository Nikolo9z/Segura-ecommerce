"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="container mx-auto flex flex-col items-center justify-center min-h-[70vh] py-10">
      <h1 className="text-6xl font-clash-bold text-primary mb-4">404</h1>
      <h2 className="text-3xl font-clash-semibold mb-6">
        Página no encontrada
      </h2>
      <p className="text-lg text-muted-foreground mb-8 text-center max-w-md">
        Lo sentimos, la página que estás buscando no existe o ha sido movida.
      </p>
      <div className="flex gap-4">
        <Button onClick={() => router.push("/")} variant="default">
          Ir al inicio
        </Button>
        <Button onClick={() => router.back()} variant="outline">
          Volver atrás
        </Button>
      </div>
    </div>
  );
}
