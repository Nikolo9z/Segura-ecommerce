"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import NotFound from "../not-found";

export default function CatchAllNotFound() {
  const router = useRouter();

  // Este componente simplemente renderiza nuestro NotFound personalizado
  // pero previene la recarga completa al manejar la ruta del lado del cliente
  return <NotFound />;
}
