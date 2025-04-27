"use client";

import { useState } from "react";
import { useCartStore } from "@/stores/CartStore";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  CreditCard,
  Truck,
  ArrowLeft,
  Check,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, addToCart, removeFromCart, removeItem, clearCart, totalCart } =
    useCartStore();

  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  // Si no hay productos en el carrito, redirigir al inicio
  if (cart.length === 0 && !orderComplete) {
    return (
      <div className="container mx-auto py-12 px-4">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl font-clash-bold">
              Carrito vacío
            </CardTitle>
            <CardDescription>No tienes productos en tu carrito</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <ShoppingBag size={64} className="text-muted-foreground mb-4" />
            <p className="text-lg mb-6">Tu carrito está vacío</p>
            <Button
              onClick={() => router.push("/")}
              className="font-clash-medium"
            >
              Ir a comprar
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {};

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simular procesamiento del pago
    setTimeout(() => {
      clearCart();
      setIsProcessing(false);
      setOrderComplete(true);
    }, 1500);
  };

  // Si la orden está completa, mostrar la confirmación
  if (orderComplete) {
    return (
      <div className="container mx-auto py-12 px-4">
        <Card className="max-w-3xl mx-auto">
          <CardHeader className="text-center">
            <div className="mx-auto bg-green-100 dark:bg-green-900/30 rounded-full p-3 w-16 h-16 flex items-center justify-center mb-4">
              <Check size={32} className="text-green-600 dark:text-green-500" />
            </div>
            <CardTitle className="text-2xl font-clash-bold">
              ¡Compra exitosa!
            </CardTitle>
            <CardDescription className="text-lg">
              Tu pedido ha sido procesado correctamente
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center py-8">
            <p className="mb-6">
              Recibirás un correo electrónico con los detalles de tu compra.
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Número de pedido: #{Math.floor(Math.random() * 10000000)}
            </p>
            <Button
              onClick={() => router.push("/")}
              className="font-clash-medium"
            >
              Volver a la tienda
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="font-clash-medium"
        >
          <ArrowLeft className="mr-2" size={18} />
          Volver
        </Button>
      </div>

      <h1 className="text-3xl font-clash-bold mb-8">Finalizar compra</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Resumen del pedido */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-clash-semibold">
                Resumen del pedido
              </CardTitle>
              <CardDescription>
                Revisa los productos en tu carrito
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {cart.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start border-b border-border pb-4 last:border-0 last:pb-0"
                  >
                    <div className="w-20 h-20 bg-muted/50 rounded overflow-hidden flex-shrink-0">
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.name || "Producto"}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-200">
                          <ShoppingBag size={24} className="text-gray-400" />
                        </div>
                      )}
                    </div>

                    <div className="ml-4 flex-1">
                      <h4 className="font-clash-medium text-base">
                        {item.name}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {item.description}
                      </p>
                      <div className="mt-2 flex justify-between items-center">
                        <span className="font-clash-medium">
                          ${item.price?.toFixed(2)}
                        </span>

                        <div className="flex items-center">
                          <button
                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                            onClick={() => removeFromCart(item)}
                          >
                            <Minus
                              size={16}
                              className="text-gray-600 dark:text-gray-400"
                            />
                          </button>
                          <span className="mx-3 font-clash-medium">
                            {item.quantity}
                          </span>
                          <button
                            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
                            onClick={() => addToCart(item)}
                          >
                            <Plus
                              size={16}
                              className="text-gray-600 dark:text-gray-400"
                            />
                          </button>
                          <button
                            className="p-1 ml-4 hover:bg-gray-100 dark:hover:bg-gray-800 rounded text-red-500"
                            onClick={() => removeItem(item)}
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={clearCart}
                className="font-clash-medium"
              >
                <Trash2 size={16} className="mr-2" />
                Vaciar carrito
              </Button>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Subtotal:</p>
                <p className="text-xl font-clash-semibold">
                  ${totalCart().toFixed(2)}
                </p>
              </div>
            </CardFooter>
          </Card>

          <div className="mt-8">
            <h2 className="text-lg font-clash-semibold mb-4">
              Método de envío
            </h2>
            <Card>
              <CardContent className="py-4">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="envio-estandar"
                    name="envio"
                    defaultChecked
                    className="mr-2"
                  />
                  <Label
                    htmlFor="envio-estandar"
                    className="flex items-center cursor-pointer"
                  >
                    <Truck className="mr-2" size={18} />
                    <div>
                      <p className="font-clash-medium">Envío estándar</p>
                      <p className="text-sm text-muted-foreground">
                        Entrega en 3-5 días hábiles
                      </p>
                    </div>
                  </Label>
                  <span className="ml-auto font-clash-medium">Gratis</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Datos de pago */}
        <div>
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="text-xl font-clash-semibold">
                Resumen
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal:</span>
                  <span className="font-clash-medium">${totalCart()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Envío:</span>
                  <span className="font-clash-medium">Gratis</span>
                </div>
                <div className="border-t border-border mt-4 pt-4">
                  <div className="flex justify-between">
                    <span className="font-clash-bold">Total:</span>
                    <span className="font-clash-bold">${(totalCart())}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    Impuestos incluidos
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <form onSubmit={handleSubmit}>
                  <Button
                    type="submit"
                    className="w-full mt-8 font-clash-medium"
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <>
                        <span className="animate-spin mr-2">
                          <svg
                            className="h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                        </span>
                        Procesando...
                      </>
                    ) : (
                      <>
                        <CreditCard className="mr-2" size={18} />
                        Pagar Ahora
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
