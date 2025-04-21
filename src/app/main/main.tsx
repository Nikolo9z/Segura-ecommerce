"use client";

import { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import CarrouselMain from "@/components/carrousel-main";

// Define los diferentes tipos de slides
const carouselItems = [
  {
    type: "single-image",
    image: "p1.webp",
    text: "RENUEVA TU CLOSET",
  },
  {
    type: "double-image",
    image1: "p4.webp",
    image2: "p5.webp",
    text: "NUEVAS COLECCIONES",
  },
  {
    type: "text-only",
    backgroundColor: "transparent",
    title: "OFERTAS ESPECIALES",
    subtitle: "Hasta 50% de descuento en selección de productos",
    buttonText: "Ver ofertas",
    // Puedes añadir imágenes opcionales
    image: "p2.webp", // Opcional: una sola imagen
    textPosition: "left", // 'left' o 'right' para posicionar el texto
    // O dos imágenes
    // image1: "oferta1.webp",
    // image2: "oferta2.webp",
    // textPosition: "right", // 'left' o 'right' para posicionar el texto
  },
  {
    type: "double-image",
    image1: "p6.webp",
    image2: "p7.webp",
    text: "ACCESORIOS",
  },
];

export function Main() {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));
  return (
    <CarrouselMain/>
  );
}
