import React, { useRef } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Card, CardContent } from "./ui/card";
import Link from "next/link";
import Autoplay from "embla-carousel-autoplay";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  slug: string;
};

// Array de productos de ejemplo
const products: Product[] = [
  {
    id: "1",
    name: "Camisa Casual",
    price: 29.99,
    image: "/p1.webp",
    slug: "camisa-casual",
  },
  {
    id: "2",
    name: "Pantalón Slim",
    price: 49.99,
    image: "/p2.webp",
    slug: "pantalon-slim",
  },
  {
    id: "3",
    name: "Chaqueta de Cuero",
    price: 89.99,
    image: "/p4.webp",
    slug: "chaqueta-cuero",
  },
  {
    id: "4",
    name: "Zapatos Elegantes",
    price: 69.99,
    image: "/p5.webp",
    slug: "zapatos-elegantes",
  },
  {
    id: "5",
    name: "Corbata Seda",
    price: 19.99,
    image: "/p6.webp",
    slug: "corbata-seda",
  },
  {
    id: "6",
    name: "Cinturón Negro",
    price: 24.99,
    image: "/p7.webp",
    slug: "cinturon-negro",
  },
];

export default function CarrouselProducts() {
  const plugin = useRef(Autoplay({ delay: 1000, stopOnInteraction: false }));
  return (
    <div className="container mx-auto py-10">
      <h2 className="text-2xl font-clash-bold mb-6 text-center">
        Productos Destacados
      </h2>
      <div className="relative">
        <Carousel
          plugins={[plugin.current]}
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {products.map((product) => (
              <CarouselItem
                key={product.id}
                className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
              >
                <Link href={`/product/${product.slug}`}>
                  <Card className="border overflow-auto hover:shadow-md transition-shadow duration-300 py-0">
                    <CardContent className="p-0">
                      <div className="overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-clash-medium text-base line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="font-clash-semibold text-lg mt-2">
                          ${product.price.toFixed(2)}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious  />
          <CarouselNext  />
        </Carousel>
      </div>
    </div>
  );
}
