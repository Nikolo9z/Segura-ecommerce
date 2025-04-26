"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useGetProductById } from "@/hooks/Products/useGetProductById";
import { useParams, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ShoppingCart, Loader2 } from "lucide-react";
import { notFound } from "next/navigation";
import { useCartStore } from "@/stores/CartStore";

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.productId as string;
  const cartStore = useCartStore((state) => state);
  // Obtener los detalles del producto
  const { data: product, isLoading, error } = useGetProductById(productId);

  // Función para volver a la página anterior
  const handleGoBack = () => {
    router.back();
  };

  // Función para agregar al carrito (implementación básica)
  const handleAddToCart = () => {
    alert("Producto añadido al carrito");
    // Aquí se implementaría la lógica real para añadir al carrito
  };

  if (isLoading) {
    return (
      <div className="container mx-auto flex flex-col items-center justify-center py-10">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <p className="mt-4 text-lg text-muted-foreground">
          Cargando producto...
        </p>
      </div>
    );
  }

  if (error || !product) {
    // Usar la función notFound() para activar nuestra página 404 personalizada
    return notFound();
  }

  return (
    <div className="container mx-auto py-4">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Botón de regreso (ahora en el lado izquierdo) */}
        <div className="md:w-1/12">
          <Button
            variant="ghost"
            onClick={handleGoBack}
            className="hover:bg-transparent hover:text-primary sticky top-20"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="sr-only md:not-sr-only md:ml-2">Volver</span>
          </Button>
        </div>

        {/* Contenedor principal del producto */}
        <div className="md:w-11/12">
          <div className="grid grid-cols-1 md:grid-cols-2 overflow-hidden rounded-lg">
            {/* Imagen del producto - sin padding ni bg-muted */}
            <div className="relative aspect-square">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Información del producto - solo esta sección tiene el fondo gris */}
            <div className="bg-muted/30 p-6">
              <div className="space-y-5">
                {/* Encabezado */}
                <div>
                  <h1 className="text-3xl font-clash-bold mb-2">
                    {product.name}
                  </h1>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-clash-semibold text-primary">
                      ${product.finalPrice}
                    </span>

                    {/* Precio con descuento */}
                    {product.isDiscountActive &&
                      product.price !== product.finalPrice && (
                        <>
                          <span className="text-lg text-muted-foreground line-through">
                            ${product.price.toFixed(2)}
                          </span>
                          <Badge className="bg-red-600 text-white hover:bg-red-700">
                            -{product.discountPercentage}%
                          </Badge>
                        </>
                      )}
                  </div>

                  {/* Banner de descuento */}
                  {product.isDiscountActive &&
                    product.price !== product.finalPrice && (
                      <div className="mt-2 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 px-3 py-2 rounded-md flex items-center">
                        <span className="text-sm font-clash-medium">
                          ¡Oferta especial! Ahorra $$
                          {(product.price - product.finalPrice).toFixed(2)}
                        </span>
                      </div>
                    )}
                </div>

                {/* Categoría */}
                <div>
                  <Badge variant="outline" className="font-clash-medium">
                    {product.categoryName}
                  </Badge>
                </div>

                {/* Descripción */}
                <div>
                  <h2 className="text-lg font-clash-medium mb-2">
                    Descripción
                  </h2>
                  <p className="text-muted-foreground">{product.description}</p>
                </div>

                {/* Disponibilidad */}
                <div>
                  <h2 className="text-lg font-clash-medium mb-2">
                    Disponibilidad
                  </h2>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={product.stock > 0 ? "default" : "destructive"}
                    >
                      {product.stock > 0
                        ? `En stock (${product.stock})`
                        : "Agotado"}
                    </Badge>
                  </div>
                </div>

                {/* Botón de compra */}
                <div className="pt-4">
                  <Button
                    size="lg"
                    onClick={() => cartStore.addToCart({
                      ...product,
                      quantity: 0
                    })}
                    disabled={product.stock <= 0}
                    className="w-full font-clash-medium"
                  >
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    {product.stock > 0
                      ? "Añadir al carrito"
                      : "Producto agotado"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
