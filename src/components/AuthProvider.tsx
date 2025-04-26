"use client";

import { useAuthStore } from "@/stores/AuthStore";
import { ReactNode, useEffect, useState } from "react";

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Componente que gestiona la autenticación del usuario de manera eficiente
 * para evitar recargas innecesarias durante la navegación
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const user = useAuthStore((state) => state.user);

  // Solo verificamos la autenticación una vez al cargar la aplicación
  useEffect(() => {
    // El usuario ya está cargado desde el localStorage por el middleware persist de Zustand
    setIsAuthChecked(true);
  }, []);

  // No mostramos nada hasta que se verifique la autenticación por primera vez
  if (!isAuthChecked) {
    return null; // O un spinner muy sutil si lo prefieres
  }

  return <>{children}</>;
}
