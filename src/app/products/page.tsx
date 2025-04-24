"use client"; 

import SidebarProducts from "@/components/SidebarProducts";
import ProductsCards from "./ProductsCards";
import { useAllCategories } from "@/hooks/Category/useAllCategories";

function page() {
    const { data: categories } = useAllCategories();
  return (
    <div className="container mx-auto">
      <div className="flex">
        <SidebarProducts categories={categories || []} />
        <ProductsCards />
      </div>
    </div>
  );
}

export default page;
