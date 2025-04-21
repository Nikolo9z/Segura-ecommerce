import React from 'react'
import { useRef } from 'react'
import Link from 'next/link'
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Autoplay from "embla-carousel-autoplay"

type OfferProduct = {
  id: string
  name: string
  originalPrice: number
  discountedPrice: number
  discountPercentage: number
  image: string
  slug: string
}

// Array de productos en oferta
const offerProducts: OfferProduct[] = [
  {
    id: "1",
    name: "Camisa Slim Fit",
    originalPrice: 59.99,
    discountedPrice: 39.99,
    discountPercentage: 33,
    image: "/p1.webp",
    slug: "camisa-slim-fit"
  },
  {
    id: "2",
    name: "Pantalón Chino",
    originalPrice: 89.99,
    discountedPrice: 59.99,
    discountPercentage: 33,
    image: "/p2.webp",
    slug: "pantalon-chino"
  },
  {
    id: "3",
    name: "Chaqueta Ligera",
    originalPrice: 129.99,
    discountedPrice: 79.99,
    discountPercentage: 38,
    image: "/p4.webp",
    slug: "chaqueta-ligera"
  },
  {
    id: "4",
    name: "Zapatos Oxford",
    originalPrice: 149.99,
    discountedPrice: 99.99,
    discountPercentage: 33,
    image: "/p5.webp",
    slug: "zapatos-oxford"
  },
  {
    id: "5",
    name: "Corbata de Seda",
    originalPrice: 49.99,
    discountedPrice: 29.99,
    discountPercentage: 40,
    image: "/p6.webp",
    slug: "corbata-seda"
  },
  {
    id: "6",
    name: "Cinturón Cuero",
    originalPrice: 59.99,
    discountedPrice: 34.99,
    discountPercentage: 42,
    image: "/p7.webp",
    slug: "cinturon-cuero"
  }
]

export default function CarrouselOffers() {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }))
  
  return (
    <div className="container mx-auto py-12">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-clash-bold">Ofertas Especiales</h2>
        <Link href="/productos/ofertas" className="text-primary hover:underline font-clash-medium">
          Ver todas las ofertas →
        </Link>
      </div>
      
      <div className="relative">
        <Carousel
          plugins={[plugin.current]}
          className="w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
        >
          <CarouselContent>
            {offerProducts.map((product) => (
              <CarouselItem key={product.id} className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4">
                <Link href={`/product/${product.slug}`}>
                  <Card className="overflow-hidden border-none hover:shadow-lg transition-shadow duration-300 py-0">
                    <CardContent className="p-0 relative">
                      {/* Etiqueta de descuento */}
                      <Badge className="absolute top-3 left-3 bg-red-600 text-white font-clash-medium px-2 py-1 z-10">
                        -{product.discountPercentage}%
                      </Badge>
                      
                      {/* Imagen del producto */}
                      <div className="relative h-64 overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      
                      {/* Información del producto */}
                      <div className="p-4">
                        <h3 className="font-clash-medium text-base line-clamp-1">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="font-clash-semibold text-lg text-red-600">
                            ${product.discountedPrice.toFixed(2)}
                          </span>
                          <span className="font-clash-regular text-sm line-through text-gray-500">
                            ${product.originalPrice.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="" />
          <CarouselNext className="" />
        </Carousel>
      </div>
    </div>
  )
}

