import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

type Category = {
  id: string;
  name: string;
  description: string;
  image: string;
  slug: string;
  productCount: number;
};

const categories: Category[] = [
  {
    id: "1",
    name: "Camisas",
    description: "Camisas formales e informales para toda ocasión",
    image: "/p1.webp",
    slug: "camisas",
    productCount: 24,
  },
  {
    id: "2",
    name: "Pantalones",
    description: "Pantalones de calidad para un look impecable",
    image: "/p2.webp",
    slug: "pantalones",
    productCount: 18,
  },
  {
    id: "3",
    name: "Trajes",
    description: "Trajes elegantes para ocasiones especiales",
    image: "/p3.webp",
    slug: "trajes",
    productCount: 12,
  },
  {
    id: "4",
    name: "Accesorios",
    description: "Complementos para elevar tu estilo",
    image: "/p4.webp",
    slug: "accesorios",
    productCount: 35,
  },
  {
    id: "5",
    name: "Calzado",
    description: "Zapatos de alta calidad para todo tipo de eventos",
    image: "/p5.webp",
    slug: "calzado",
    productCount: 20,
  },
  {
    id: "6",
    name: "Colección Sport",
    description: "Prendas deportivas con estilo y comodidad",
    image: "/p6.webp",
    slug: "coleccion-sport",
    productCount: 16,
  },
  {
    id: "7",
    name: "Temporada",
    description: "Lo último para esta temporada",
    image: "/p7.webp",
    slug: "temporada",
    productCount: 22,
  },
];

export default function Categories() {
  return (
    <div className="container mx-auto py-12">
      <h2 className="text-3xl font-clash-bold mb-8 text-center">Encuentra lo que estas buscando</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {categories.map((category) => (
          <Link href={`/category/${category.slug}`} key={category.id}>
            <motion.div
              className="relative h-40 rounded-lg overflow-hidden cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {/* Imagen de fondo */}
              <div className="absolute inset-0">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>

              {/* Solo el nombre */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                <h3 className="font-clash-medium text-center text-white text-lg">
                  {category.name}
                </h3>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
