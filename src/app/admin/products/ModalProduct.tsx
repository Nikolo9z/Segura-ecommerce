import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { CreateProductRequest } from "@/types/CreateProductRequest";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1, { message: "El nombre es requerido" }),
  category: z.number().min(1, { message: "La categoría es requerida" }),
  description: z.string().min(1, { message: "La descripción es requerida" }),
  price: z.number().min(0, { message: "El precio debe ser mayor a 0" }),
  stock: z.number().min(0, { message: "El stock debe ser mayor a 0" }),
  image: z.string().url({ message: "La URL de la imagen no es válida" }),
  discountPercentage: z
    .number()
    .min(0, { message: "El descuento debe ser mayor a 0" }),
  discountStartDate: z.date().optional(),
  discountEndDate: z.string().optional(),
});
type FormData = z.infer<typeof schema>;

type Props = {
  formOpen: boolean;
  setFormOpen: (open: boolean) => void;
  currentProduct: CreateProductRequest | null;
  setCurrentProduct: (product: any) => void;
  isEditMode: boolean;
  handleSaveProduct: () => void;
};
function ModalProduct({
  formOpen,
  setFormOpen,
  currentProduct,
  setCurrentProduct,
  isEditMode,
  handleSaveProduct,
}: Props) {
  const {
    register,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  console.log("currentProduct", currentProduct);
  return (
    <Dialog open={formOpen} onOpenChange={setFormOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Editar Producto" : "Agregar Nuevo Producto"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Modifica los detalles del producto seleccionado."
              : "Completa los detalles para crear un nuevo producto."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                value={currentProduct?.name || ""}
                {...register("name")}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="category">Categoría</Label>
              <Input
                id="category"
                value={currentProduct?.categoryId || ""}
                {...register("category")}
              />
            </div>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="description">Descripción</Label>
            <Textarea
              id="description"
              value={currentProduct?.description || ""}
              {...register("description")}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="price">Precio</Label>
              <Input
                id="price"
                step="0.01"
                value={currentProduct?.price || 0}
                {...register("price")}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                value={currentProduct?.stock}
                {...register("stock")}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="price">Porcentaje desc</Label>
              <Input
                id="price"
                step="0.01"
                value={currentProduct?.discountPercentage}
                {...register("discountPercentage")}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="IOffer">Inicio Oferta</Label>
              <Input
                id="IOffer"
                value={currentProduct?.discountStartDate}
                {...register("discountStartDate")}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="EOffer">Fin Oferta</Label>
              <Input
                id="EOffer"
                value={currentProduct?.discountStartDate}
                {...register("discountEndDate")}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            Precio con descuento:{" "}
            {currentProduct?.discountPercentage && (
                <span className="text-green-500">
                    {currentProduct.price -
                    (currentProduct.price *
                        currentProduct.discountPercentage) /
                        100}
                </span>
                )}
        </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="image">URL de Imagen</Label>
            <Input
              id="image"
              value={currentProduct?.imageUrl || ""}
              {...register("image")}
              placeholder="Ej: /p1.webp"
            />
            {currentProduct?.imageUrl && (
              <div className="mt-2 flex justify-center">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src={currentProduct.imageUrl}
                    alt="Vista previa"
                  />
                  <AvatarFallback>IMG</AvatarFallback>
                </Avatar>
              </div>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setFormOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={handleSaveProduct}>
            {isEditMode ? "Guardar Cambios" : "Crear Producto"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ModalProduct;
