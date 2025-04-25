"use client";
import { useGetAllProducts } from "@/hooks/Products/useGetAllProducts";
import { GetAllProductsResponse } from "@/types/GetAllProductsResponse";
import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import TableProducts from "../DataTable";
import ModalProduct from "../ModalProduct";
import { useAllCategories } from "@/hooks/Category/useAllCategories";

function ProductsList() {
  const productsData = useGetAllProducts();
  const categories = useAllCategories();
  const [formOpen, setFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] =
    useState<GetAllProductsResponse | null>(null);

  const handleOpenCreateModal = () => {
    setCurrentProduct(null);
    console.log("Creando nuevo producto");
    setIsEditMode(false);
    setFormOpen(true);
  };
  const handleOpenEditModal = (product: GetAllProductsResponse) => {
    setCurrentProduct(product);
    setIsEditMode(true);
    setFormOpen(true);
  };
  const handleSaveProduct = () => {
    // Aquí añadirías la lógica para guardar el producto

    // Ejemplo simple:
    if (isEditMode) {
      // Lógica para actualizar un producto existente
      console.log("Actualizando producto existente");
    } else {
      // Lógica para crear un nuevo producto
      console.log("Creando nuevo producto");
    }

    // Cierra el modal después de guardar
    setFormOpen(false);
  };
  const deleteProduct = (productId: number) => {
    // Aquí añadirías la lógica para eliminar el producto
    console.log(`Eliminando producto con ID: ${productId}`);
  }
  return (
    <div className="container mx-auto h-full overflow-hidden">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-clash-bold">Gestión de Productos</h1>
          <p className="text-muted-foreground">
            Administra el catálogo de productos de tu tienda
          </p>
        </div>
        <Button onClick={handleOpenCreateModal}>
          <PlusCircle className="mr-2 h-4 w-4" /> Nuevo Producto
        </Button>
      </div>
      <TableProducts
        products={productsData.data || []}
        isLoading={productsData.isLoading}
        handleOpenEditModal={handleOpenEditModal}
        deleteProduct={deleteProduct}
      />
      <ModalProduct
        formOpen={formOpen}
        setFormOpen={setFormOpen}
        currentProduct={currentProduct}
        iseditMode={isEditMode}
        handleSaveProduct={handleSaveProduct}
        categories={categories.data || []}
      />
    </div>
  );
}

export default ProductsList;
