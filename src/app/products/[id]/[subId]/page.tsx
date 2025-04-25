"use client";

import { useState } from "react";
import SidebarProducts from "@/components/SidebarProducts";
import ProductsCards from "../../ProductsCards";
import { useGetSubcategories } from "@/hooks/Category/useGetSubcategories";
import { useParams } from "next/navigation";
import { useGetProducts } from "@/hooks/Products/useGetProducts";

function Page() {
  const params = useParams();
  const categoryId = Number(params.id);
  const subcategoryId = Number(params.subId);
  const [selectedSubcategory, setSelectedSubcategory] = useState<number | null>(
    isNaN(subcategoryId) ? null : subcategoryId
  );

  const subcategoriesQuery = useGetSubcategories(categoryId);
  const productsQuery = useGetProducts(selectedSubcategory ?? 0);

  const handleSubcategoryClick = (subcategoryId: number) => {
    setSelectedSubcategory(subcategoryId);
  };

  return (
    <div className="container mx-auto">
      <div className="flex">
        <SidebarProducts
          categories={subcategoriesQuery.data ?? []}
          onSelectSubcategory={handleSubcategoryClick}
        />
        <ProductsCards products={productsQuery.data ?? []} />
      </div>
    </div>
  );
}

export default Page;
