import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card'
import React from 'react'

type Props = {}
const products = [
    {
      id: 1,
      name: "Camisa Oxford Azul",
      originalPrice: 1200,
      price: 70,
      discount: 70,
      image: "/p1.webp",
    },
    {
      id: 2,
      name: "Pantalón Slim Fit",
      originalPrice: 1500,
      price: 120,
      discount: 50,
      image: "/p2.webp",
    },
    {
      id: 3,
      name: "Chaqueta de Cuero Premium",
      originalPrice: 2200,
      price: 150,
      discount: 45,
      image: "/p3.webp",
    },
    {
      id: 4,
      name: "Zapatos Derby de Cuero",
      originalPrice: 1800,
      price: 100,
      discount: 65,
      image: "/p4.webp",
    },
    {
      id: 5,
      name: "Corbata de Seda Italiana",
      originalPrice: 900,
      price: 60,
      discount: 35,
      image: "/p5.webp",
    },
    {
      id: 6,
      name: "Cinturón de Cuero Marrón",
      originalPrice: 950,
      price: 70,
      discount: 30,
      image: "/p6.webp",
    },
  ];
function ProductsCards({}: Props) {
  return (
        <div className="flex-1 p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 h-100">
            {products.map((product) => (
              <Card
                key={product.id}
                className="overflow-hidden py-0 cursor-pointer border-none bg-transparent hover:bg-card hover:shadow-lg transition-shadow duration-300 h-[440px] flex flex-col"
              >
                <CardContent className="p-0 relative flex-1 flex flex-col">
                  {/* Etiqueta de descuento */}
                  <Badge className="absolute top-3 left-3 bg-red-600 text-white font-clash-medium px-2 py-1 z-10">
                    -{product.discount}%
                  </Badge>

                  {/* Imagen del producto - altura fija */}
                  <div className="h-90 overflow-hidden flex-grow">
                    <img
                      src={product.image}
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
                      <span className="font-clash-semibold text-lg text-red-600">
                        ${product.price}
                      </span>
                      <span className="font-clash-regular text-sm line-through text-gray-500">
                        ${product.originalPrice}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
  )
}

export default ProductsCards