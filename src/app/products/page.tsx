"use client"; 

import SidebarProducts from "@/components/SidebarProducts";
import ProductsCards from "./ProductsCards";

function page() {
  return (
    <div className="container mx-auto">
      <div className="flex">
        <SidebarProducts />
        <ProductsCards />
      </div>
    </div>
  );
}

export default page;
