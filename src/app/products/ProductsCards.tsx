import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Product } from "@/types/Product";
import React from "react";

type Props = {
  products: Product[];
};

function ProductsCards({ products }: Props) {
  const productItems = products || [];

  return (
    <div className="flex-1 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 h-100">
        {productItems.map((product) => (
          <Card
            key={product.id}
            className="overflow-hidden py-0 cursor-pointer border-none bg-transparent hover:bg-card hover:shadow-lg transition-shadow duration-300 h-[440px] flex flex-col"
          >
            <CardContent className="p-0 relative flex-1 flex flex-col">
              {/* Mostrar etiqueta de descuento solo si hay descuento activo */}
              {product.isDiscountActive && product.discountPercentage && (
                <Badge className="absolute top-3 left-3 bg-red-600 text-white font-clash-medium px-2 py-1 z-10">
                  -{product.discountPercentage}%
                </Badge>
              )}

              {/* Imagen del producto - altura fija */}
              <div className="h-90 overflow-hidden flex-grow">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Información del producto */}
              <div className="p-4 flex flex-col flex-1 justify-between">
                <h3 className="font-clash-medium text-lg line-clamp-2 mb-2">
                  {product.name}
                </h3>
                <div className="flex items-center gap-2 mt-auto">
                  {/* Mostrar precio con descuento si aplica */}
                  <span className="font-clash-semibold text-lg text-red-600">
                    ${product.finalPrice}
                  </span>
                  {/* Mostrar precio original tachado solo si hay descuento */}
                  {product.isDiscountActive &&
                    product.finalPrice !== product.price && (
                      <span className="font-clash-regular text-sm line-through text-gray-500">
                        ${product.price.toFixed(2)}
                      </span>
                    )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ProductsCards;
