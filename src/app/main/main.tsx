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

export function Main() {
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
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex h-95 items-center justify-center">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10 border-none "  />
        <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10 border-none " />
      </Carousel>
    </div>
  );
}
