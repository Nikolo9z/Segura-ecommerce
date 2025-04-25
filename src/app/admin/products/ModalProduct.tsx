"use client";

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
import { GetAllCategoriesResponse } from "@/types/GetAllCategoriesResponse";
import { GetAllProductsResponse } from "@/types/GetAllProductsResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const schema = z.object({
  name: z.string().min(1, { message: "El nombre es requerido" }),
  category: z
    .number()
    .min(1, { message: "La categoría es requerida" })
    .optional(),
  description: z.string().min(1, { message: "La descripción es requerida" }),
  price: z
    .number()
    .min(0, { message: "El precio debe ser mayor a 0" })
    .optional(),
  stock: z
    .number()
    .min(0, { message: "El stock debe ser mayor a 0" })
    .optional(),
  image: z
    .string()
    .url({ message: "La URL de la imagen no es válida" })
    .optional(),
  discountPercentage: z
    .number()
    .min(0, { message: "El descuento debe ser mayor a 0" })
    .optional(),
  discountStartDate: z.string().optional(),
  discountEndDate: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

type Props = {
  formOpen: boolean;
  setFormOpen: (open: boolean) => void;
  currentProduct?: GetAllProductsResponse | null;
  iseditMode?: boolean;
  handleSaveProduct?: () => void;
  categories: GetAllCategoriesResponse[];
};

function ModalProduct({
  formOpen,
  setFormOpen,
  currentProduct,
  iseditMode,
  handleSaveProduct,
  categories,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
    control, // Necesario para react-hook-form con componentes controlados
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      category: 0,
      description: "",
      price: 0,
      stock: 0,
      image: "",
      discountPercentage: 0,
      discountStartDate: "",
      discountEndDate: "",
    },
  });

  // Observa los valores del formulario en tiempo real
  const formPrice = watch("price") || 0;
  const formDiscount = watch("discountPercentage") || 0;
  const formImage = watch("image");
  const formName = watch("name");

  // Este useEffect reinicia el formulario cuando cambia el modal o el producto
  useEffect(() => {
    if (formOpen) {
      if (currentProduct && iseditMode) {
        // Si estamos en modo edición y hay un producto, llenamos el form
        reset({
          name: currentProduct.name || "",
          category: currentProduct.category || 0,
          description: currentProduct.description || "",
          price: currentProduct.price || 0,
          stock: currentProduct.stock || 0,
          image: currentProduct.imageUrl || "",
          discountPercentage: currentProduct.discountPercentage || 0,
          discountStartDate: currentProduct.discountStartDate || "",
          discountEndDate: currentProduct.discountEndDate || "",
        });
      } else {
        // Si estamos en modo crear, reseteamos el formulario
        reset({
          name: "",
          category: 0,
          description: "",
          price: 0,
          stock: 0,
          image: "",
          discountPercentage: 0,
          discountStartDate: "",
          discountEndDate: "",
        });
      }
    }
  }, [formOpen, currentProduct, iseditMode, reset]);

  // Maneja el envío del formulario
  const onSubmit = (data: FormData) => {
    if (handleSaveProduct) {
      handleSaveProduct();
    }
  };

  // Calcula el precio con descuento usando valores del formulario
  const discountedPrice =
    formDiscount > 0 ? formPrice - (formPrice * formDiscount) / 100 : formPrice;

  // Añade estas variables de estado para manejar las categorías y subcategorías
  const [selectedParentCategory, setSelectedParentCategory] = useState<
    number | null
  >(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<number | null>(
    null
  );

  const availableSubcategories = selectedParentCategory
    ? categories.find((cat) => cat.id === selectedParentCategory)
        ?.subCategories || []
    : [];

  useEffect(() => {
    if (formOpen && currentProduct && iseditMode) {
      const parentCategory = categories.find((cat) =>
        cat.subCategories.some(
          (subCat) => subCat.id === currentProduct.category
        )
      );

      if (parentCategory) {
        setSelectedParentCategory(parentCategory.id);
        setSelectedSubCategory(currentProduct.category);
      }
    } else if (formOpen && !iseditMode) {
      setSelectedParentCategory(null);
      setSelectedSubCategory(null);
    }
  }, [formOpen, currentProduct, iseditMode, categories]);

  useEffect(() => {
    if (selectedSubCategory) {
      setValue("category", selectedSubCategory);
    }
  }, [selectedSubCategory, setValue]);

  // Maneja el cambio de categoría padre
  const handleParentCategoryChange = (value: string) => {
    const categoryId = parseInt(value);
    setSelectedParentCategory(categoryId);
    setSelectedSubCategory(null); // Reinicia la subcategoría al cambiar la categoría padre
    setValue("category", 0); // Reinicia el valor en el formulario
  };

  const handleSubCategoryChange = (value: string) => {
    const subcategoryId = parseInt(value);
    setSelectedSubCategory(subcategoryId);
    setValue("category", subcategoryId);
  };

  return (
    <Dialog open={formOpen} onOpenChange={setFormOpen}>
      <DialogContent className="sm:max-w-[800px]">
        {" "}
        {/* Aumenté la anchura máxima para tener más espacio */}
        <DialogHeader>
          <DialogTitle>
            {iseditMode ? "Editar Producto" : "Agregar Nuevo Producto"}
          </DialogTitle>
          <DialogDescription>
            {iseditMode
              ? "Modifica los detalles del producto seleccionado."
              : "Completa los detalles para crear un nuevo producto."}
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Columnas 1 y 2: Formulario */}
          <div className="md:col-span-2">
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="name">Nombre</Label>
                  <Input id="name" {...register("name")} />
                  {errors.name && (
                    <p className="text-sm text-red-500">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                {/* Sistema de categorías en 2 pasos */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="parentCategory">Categoría principal</Label>
                    <Select
                      value={selectedParentCategory?.toString() || ""}
                      onValueChange={handleParentCategoryChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona una categoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem
                            key={category.id}
                            value={category.id.toString()}
                          >
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="subCategory">Subcategoría</Label>
                    <Select
                      value={selectedSubCategory?.toString() || ""}
                      onValueChange={handleSubCategoryChange}
                      disabled={
                        !selectedParentCategory ||
                        availableSubcategories.length === 0
                      }
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Selecciona una subcategoría" />
                      </SelectTrigger>
                      <SelectContent>
                        {availableSubcategories.map((subCategory) => (
                          <SelectItem
                            key={subCategory.id}
                            value={subCategory.id.toString()}
                          >
                            {subCategory.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.category && (
                      <p className="text-sm text-red-500">
                        {errors.category.message}
                      </p>
                    )}
                  </div>
                </div>

                {/* Input oculto para mantener el valor de la categoría en el formulario */}
                <input
                  type="hidden"
                  {...register("category", { valueAsNumber: true })}
                />

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea id="description" {...register("description")} />
                  {errors.description && (
                    <p className="text-sm text-red-500">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="price">Precio</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      {...register("price", { valueAsNumber: true })}
                    />
                    {errors.price && (
                      <p className="text-sm text-red-500">
                        {errors.price.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="stock">Stock</Label>
                    <Input
                      id="stock"
                      type="number"
                      {...register("stock", { valueAsNumber: true })}
                    />
                    {errors.stock && (
                      <p className="text-sm text-red-500">
                        {errors.stock.message}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="discountPercentage">Porcentaje desc</Label>
                    <Input
                      id="discountPercentage"
                      type="number"
                      step="0.01"
                      {...register("discountPercentage", {
                        valueAsNumber: true,
                      })}
                    />
                    {errors.discountPercentage && (
                      <p className="text-sm text-red-500">
                        {errors.discountPercentage.message}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="discountStartDate">Inicio Oferta</Label>
                    <Input
                      id="discountStartDate"
                      type="date"
                      {...register("discountStartDate")}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="discountEndDate">Fin Oferta</Label>
                    <Input
                      id="discountEndDate"
                      type="date"
                      {...register("discountEndDate")}
                    />
                  </div>
                </div>

                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="image">URL de Imagen</Label>
                  <Input
                    id="image"
                    {...register("image")}
                    placeholder="Ej: /p1.webp"
                  />
                  {errors.image && (
                    <p className="text-sm text-red-500">
                      {errors.image.message}
                    </p>
                  )}
                </div>

                <DialogFooter className="px-0 mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setFormOpen(false)}
                  >
                    Cancelar
                  </Button>
                  <Button type="submit">
                    {iseditMode ? "Guardar Cambios" : "Crear Producto"}
                  </Button>
                </DialogFooter>
              </div>
            </form>
          </div>

          {/* Columna 3: Previsualización */}
          <div className="md:col-span-1 flex flex-col gap-4">
            {/* Previsualización de imagen */}
            <div className="bg-muted/30 rounded-lg p-4 flex flex-col items-center mb-4">
              <h3 className="text-sm font-medium mb-2 text-muted-foreground">
                Vista previa
              </h3>
              <div className="relative aspect-square w-full overflow-hidden rounded-md border">
                {formImage || (currentProduct?.imageUrl && iseditMode) ? (
                  <img
                    src={formImage || currentProduct?.imageUrl}
                    alt={formName || currentProduct?.name}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-muted">
                    <svg
                      className="h-12 w-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Información de precios - Actualizada para usar valores del formulario */}
            <div className="bg-muted/30 rounded-lg p-4">
              <h3 className="text-sm font-medium mb-2 text-muted-foreground">
                Resumen de precios
              </h3>

              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Precio base:</span>
                  <span className="font-medium">${formPrice.toFixed(2)}</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-sm">Descuento:</span>
                  <span className="font-medium text-orange-600">
                    {formDiscount ? `${formDiscount}%` : "0%"}
                  </span>
                </div>

                <div className="border-t my-2"></div>

                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">Precio final:</span>
                  <span
                    className={`text-lg font-bold ${
                      formDiscount > 0 ? "text-green-600" : ""
                    }`}
                  >
                    ${discountedPrice.toFixed(2)}
                  </span>
                </div>

                {formDiscount > 0 && formPrice > 0 && (
                  <div className="text-xs text-right text-muted-foreground">
                    Ahorras: ${(formPrice - discountedPrice).toFixed(2)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ModalProduct;
