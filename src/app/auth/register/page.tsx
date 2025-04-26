"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import React, { useState } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterRequest } from "@/types/DTOs/RegisterRequest";
import { AlertCircle, Check, Eye, EyeOff } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRegister } from "@/hooks/Auth/useRegister";

// Definir una contraseña más segura con requisitos específicos
const schema = z
  .object({
    name: z
      .string()
      .min(6, "El nombre de usuario debe tener al menos 6 caracteres"),
    email: z.string().email("Dirección de correo electrónico inválida"),
    password: z
      .string()
      .min(8, "La contraseña debe tener al menos 8 caracteres")
      .regex(
        /[A-Z]/,
        "La contraseña debe contener al menos una letra mayúscula"
      )
      .regex(
        /[a-z]/,
        "La contraseña debe contener al menos una letra minúscula"
      )
      .regex(/[0-9]/, "La contraseña debe contener al menos un número")
      .regex(
        /[^A-Za-z0-9]/,
        "La contraseña debe contener al menos un carácter especial"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof schema>;

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const RegisterMutation = useRegister(); // Asegúrate de tener un hook para manejar el registro

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  // Observar el valor de la contraseña para la validación en tiempo real
  const watchedPassword = watch("password", "");

  // Validaciones de contraseña
  const hasMinLength = watchedPassword.length >= 8;
  const hasUppercase = /[A-Z]/.test(watchedPassword);
  const hasLowercase = /[a-z]/.test(watchedPassword);
  const hasNumber = /[0-9]/.test(watchedPassword);
  const hasSpecialChar = /[^A-Za-z0-9]/.test(watchedPassword);

  const onSubmit = (data: RegisterRequest) => {
    RegisterMutation.mutate(data);
    if (RegisterMutation.isSuccess) {
      console.log("Registro exitoso:", data);
    }
    if (RegisterMutation.isError) {
      console.error("Error en el registro:", RegisterMutation.error);
    }
  };

  return (
    <div className="flex h-fit w-full items-center justify-center mt-30 p-6 md:p-10 font-clash-regular">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Registro</CardTitle>
          <CardDescription>
            Crea una cuenta para comenzar a comprar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="username">Nombre de usuario</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Tu nombre aquí"
                  className={errors.name ? "border-destructive" : ""}
                  {...register("name")}
                />
                {errors.name && (
                  <div className="flex items-center gap-1 text-destructive text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.name.message}</span>
                  </div>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Correo electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  className={errors.email ? "border-destructive" : ""}
                  {...register("email")}
                />
                {errors.email && (
                  <div className="flex items-center gap-1 text-destructive text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.email.message}</span>
                  </div>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Contraseña</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    className={
                      errors.password ? "border-destructive pr-10" : "pr-10"
                    }
                    {...register("password")}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute inset-y-0 right-0 px-3 py-2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                    <span className="sr-only">
                      {showPassword
                        ? "Ocultar contraseña"
                        : "Mostrar contraseña"}
                    </span>
                  </Button>
                </div>
                {errors.password && (
                  <div className="flex items-center gap-1 text-destructive text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.password.message}</span>
                  </div>
                )}

                {/* Password requirements */}
                <div className="space-y-1 mt-1">
                  <p className="text-sm text-muted-foreground mb-1">
                    Requisitos de contraseña:
                  </p>
                  <div className="grid grid-cols-1 gap-1 sm:grid-cols-2">
                    <RequirementItem
                      text="Al menos 8 caracteres"
                      fulfilled={hasMinLength}
                    />
                    <RequirementItem
                      text="Una letra mayúscula"
                      fulfilled={hasUppercase}
                    />
                    <RequirementItem
                      text="Una letra minúscula"
                      fulfilled={hasLowercase}
                    />
                    <RequirementItem text="Un número" fulfilled={hasNumber} />
                    <RequirementItem
                      text="Un carácter especial"
                      fulfilled={hasSpecialChar}
                    />
                  </div>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    className={
                      errors.confirmPassword
                        ? "border-destructive pr-10"
                        : "pr-10"
                    }
                    {...register("confirmPassword")}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute inset-y-0 right-0 px-3 py-2"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                    <span className="sr-only">
                      {showConfirmPassword
                        ? "Ocultar contraseña"
                        : "Mostrar contraseña"}
                    </span>
                  </Button>
                </div>
                {errors.confirmPassword && (
                  <div className="flex items-center gap-1 text-destructive text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.confirmPassword.message}</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-3">
                <Button type="submit" className="w-full">
                  Registrarse
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              ¿Ya tienes una cuenta?{" "}
              <Link href="/auth/login" className="underline underline-offset-4">
                Iniciar sesión
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

// Componente para los requisitos de contraseña
interface RequirementItemProps {
  text: string;
  fulfilled: boolean;
}

function RequirementItem({ text, fulfilled }: RequirementItemProps) {
  return (
    <div
      className={cn("flex items-center gap-2", {
        "text-muted-foreground": !fulfilled,
        "text-green-500": fulfilled,
      })}
    >
      <Check
        className={cn("h-4 w-4", {
          "opacity-50": !fulfilled,
        })}
      />
      <span className="text-xs">{text}</span>
    </div>
  );
}
