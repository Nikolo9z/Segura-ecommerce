"use client";

import { useGetAllProducts } from "@/hooks/Products/useGetAllProducts";
import { PlusCircle, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import TableProducts from "../DataTable";
import ModalProduct from "../ModalProduct";
import ModalCategories from "../ModalCategories";
import { useAllCategories } from "@/hooks/Category/useAllCategories";
import { CreateProductRequest } from "@/types/DTOs/Product/CreateProductRequest";
import { Product } from "@/types/Product";
import { useCreateProduct } from "@/hooks/Products/useCreateProduct";
import { UpdateProductRequest } from "@/types/DTOs/Product/UpdateProductRequest";
import { useUpdateProduct } from "@/hooks/Products/useUpdateProduct";
import { useDeleteProduct } from "@/hooks/Products/useDeleteProduct";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

function ProductsList() {
  const productsData = useGetAllProducts();
  const categories = useAllCategories();
  const createProduct = useCreateProduct();
  const updateProductQuery = useUpdateProduct();
  const deleteProductQuery = useDeleteProduct();
  const [formOpen, setFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  // Estados para el diálogo de confirmación de eliminación
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  // Estado para el modal de categorías
  const [categoriesModalOpen, setCategoriesModalOpen] = useState(false);

  const handleOpenCreateModal = () => {
    setCurrentProduct(null);
    setIsEditMode(false);
    setFormOpen(true);
  };
  const handleOpenEditModal = (product: Product) => {
    setCurrentProduct(product);
    setIsEditMode(true);
    setFormOpen(true);
  };
  const handleSaveProduct = (
    newProduct?: CreateProductRequest,
    updateProduct?: UpdateProductRequest
  ) => {
    if (isEditMode) {
      if (updateProduct) {
        updateProductQuery.mutate(updateProduct);
      }
    }
    if (newProduct) {
      createProduct.mutate(newProduct);
    }
    setFormOpen(false);
  };

  const confirmDeleteProduct = (product: Product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirmed = () => {
    if (productToDelete) {
      deleteProductQuery.mutate(productToDelete);
      setDeleteDialogOpen(false);
      setProductToDelete(null);
    }
  };

  const handleDeleteCancelled = () => {
    setDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  // Función para abrir el modal de gestión de categorías
  const handleOpenCategoriesModal = () => {
    setCategoriesModalOpen(true);
  };

  return (
    <div className="container mx-auto h-full overflow-hidden">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-clash-bold">Gestión de Productos</h1>
          <p className="text-muted-foreground">
            Administra el catálogo de productos de tu tienda
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleOpenCategoriesModal}>
            <Layers className="mr-2 h-4 w-4" /> Gestionar Categorías
          </Button>
          <Button onClick={handleOpenCreateModal}>
            <PlusCircle className="mr-2 h-4 w-4" /> Nuevo Producto
          </Button>
        </div>
      </div>
      <TableProducts
        products={productsData.data || []}
        isLoading={productsData.isLoading}
        handleOpenEditModal={handleOpenEditModal}
        deleteProduct={confirmDeleteProduct}
      />
      <ModalProduct
        formOpen={formOpen}
        setFormOpen={setFormOpen}
        currentProduct={currentProduct}
        setCurrentProduct={setCurrentProduct}
        iseditMode={isEditMode}
        handleSaveProduct={handleSaveProduct}
        categories={categories.data || []}
      />

      {/* Modal de gestión de categorías */}
      <ModalCategories
        modalOpen={categoriesModalOpen}
        setModalOpen={setCategoriesModalOpen}
      />

      {/* Modal de confirmación para eliminar producto */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar el producto
              <span className="font-medium"> {productToDelete?.name}</span>?
              Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleDeleteCancelled}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDeleteConfirmed}
              disabled={deleteProductQuery.isPending}
            >
              {deleteProductQuery.isPending ? "Eliminando..." : "Eliminar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ProductsList;
