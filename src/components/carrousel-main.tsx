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
import React, { useRef } from 'react'
import { Card, CardContent } from './ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

export default function CarrouselMain() {
    const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: false }));
    return (
      <div className="relative min-w-full">
        <Carousel
          plugins={[plugin.current]}
          className="min-w-full"
          onMouseEnter={plugin.current.stop}
          onMouseLeave={plugin.current.reset}
          aria-hidden="true"
        >
          <CarouselContent>
            {carouselItems.map((item, index) => (
              <CarouselItem key={index}>
                <Card className='py-0 rounded overflow-hidden'>
                  {item.type === "single-image" && (
                    <CardContent className="flex max-h-[25vw] w-full relative m-0 p-0">
                      <img
                        src={item.image}
                        alt={`Slide ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute  text-4xl top-8 left-0 right-0 text-center font-clash-bold">
                        {item.text}
                      </span>
                    </CardContent>
                  )}
  
                  {item.type === "double-image" && (
                    <CardContent className="flex max-h-[25vw] w-full relative p-0">
                      <div className="flex w-full">
                        <div className="w-1/2">
                          <img
                            src={item.image1}
                            alt={`Slide ${index + 1} - Image 1`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="w-1/2">
                          <img
                            src={item.image2}
                            alt={`Slide ${index + 1} - Image 2`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <span className="absolute  text-4xl top-8 left-0 right-0 text-center font-semibold font-clash-bold">
                        {item.text}
                      </span>
                    </CardContent>
                  )}
  
                  {item.type === "text-only" && (
                    <CardContent
                      className={`relative flex max-h-[25vw] w-full ${item.backgroundColor} p-0`}
                    >
                      {/* Una imagen */}
                      {item.image && !item.image1 && !item.image2 && (
                        <div className="w-full">
                          <img
                            src={item.image}
                            alt={`Slide ${index + 1} - Image`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
  
                      {/* Dos imágenes */}
                      {item.image1 && item.image2 && (
                        <div className="flex w-full">
                          <div className="w-1/2">
                            <img
                              src={item.image1}
                              alt={`Slide ${index + 1} - Image 1`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="w-1/2">
                            <img
                              src={item.image2}
                              alt={`Slide ${index + 1} - Image 2`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      )}
  
                      {/* Texto encima de la imagen, posicionado según textPosition */}
                      <div
                        className={`absolute top-0 bottom-0 ${
                          item.textPosition === "right" ? "right-0" : "left-0"
                        } w-1/2 flex flex-col items-center justify-center p-8 `}
                      >
                        <h2 className=" text-5xl mb-4 font-bold">
                          {item.title}
                        </h2>
                        <p className=" text-xl mb-6">{item.subtitle}</p>
                        <button className="bg-white text-gray-800 px-6 py-3 rounded-md font-semibold hover:bg-gray-200 transition-colors">
                          {item.buttonText}
                        </button>
                      </div>
                    </CardContent>
                  )}
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 border-none" />
          <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 border-none" />
        </Carousel>
      </div>
    );
  
}

