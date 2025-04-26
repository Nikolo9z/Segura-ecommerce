"use client";
import CarrouselMain from "@/components/CarrouselMain";
import CarrouselOffers from "@/components/CarrouselOffers";
import CarrouselProducts from "@/components/CarrouselProducts";
import Categories from "@/components/Categories";

export function Main() {
  return (
    <>
      <CarrouselMain />
      <CarrouselProducts />
      <Categories />
      <CarrouselOffers />
    </>
  );
}
