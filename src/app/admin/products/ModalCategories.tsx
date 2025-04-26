import { useState } from "react";
import { Category, SubCategory } from "@/types/Category";
import { useAllCategories } from "@/hooks/Category/useAllCategories";
import { useCreateCategory } from "@/hooks/Category/useCreateCategory";
import { useUpdateCategory } from "@/hooks/Category/useUpdateCategory";
import { useDeleteCategory } from "@/hooks/Category/useDeleteCategory";
import { CreateCategoryRequest } from "@/types/DTOs/Category/CreateCategoryRequest";
import { UpdateCategoryRequest } from "@/types/DTOs/Category/UpdateCategoryRequest";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Trash2, Edit, Plus, Loader2, ChevronRight } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ModalCategoriesProps {
  modalOpen: boolean;
  setModalOpen: (open: boolean) => void;
}

const ModalCategories = ({ modalOpen, setModalOpen }: ModalCategoriesProps) => {
  const categoriesQuery = useAllCategories();
  const createCategoryMutation = useCreateCategory();
  const updateCategoryMutation = useUpdateCategory();
  const deleteCategoryMutation = useDeleteCategory();

  const [categoryName, setCategoryName] = useState("");
  const [subcategoryName, setSubcategoryName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [editingCategory, setEditingCategory] = useState<
    Category | SubCategory | null
  >(null);
  const [editName, setEditName] = useState("");

  // Estado para el modal de confirmación de eliminación
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState<
    Category | SubCategory | null
  >(null);

  const handleCreateRootCategory = () => {
    if (!categoryName.trim()) return;

    const newCategory: CreateCategoryRequest = {
      name: categoryName.trim(),
    };

    createCategoryMutation.mutate(newCategory, {
      onSuccess: () => {
        setCategoryName("");
      },
    });
  };

  const handleCreateSubcategory = () => {
    if (!subcategoryName.trim() || !selectedCategory) return;

    const newSubcategory: CreateCategoryRequest = {
      name: subcategoryName.trim(),
      parentCategoryId: selectedCategory.id,
    };

    createCategoryMutation.mutate(newSubcategory, {
      onSuccess: () => {
        setSubcategoryName("");
      },
    });
  };

  const handleEditCategory = (category: Category | SubCategory) => {
    setEditingCategory(category);
    setEditName(category.name);
  };

  const handleSaveEdit = () => {
    if (!editingCategory || !editName.trim()) return;

    const updateRequest: UpdateCategoryRequest = {
      id: editingCategory.id,
      name: editName.trim(),
    };

    updateCategoryMutation.mutate(updateRequest, {
      onSuccess: () => {
        setEditingCategory(null);
        setEditName("");
      },
    });
  };

  const confirmDeleteCategory = (category: Category | SubCategory) => {
    setCategoryToDelete(category);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirmed = () => {
    if (!categoryToDelete) return;

    deleteCategoryMutation.mutate(categoryToDelete as Category, {
      onSuccess: () => {
        setCategoryToDelete(null);
        setDeleteDialogOpen(false);
        if (selectedCategory && selectedCategory.id === categoryToDelete.id) {
          setSelectedCategory(null);
        }
      },
    });
  };

  const renderSubcategories = (subcategories: SubCategory[]) => (
    <div className="pl-4">
      {subcategories.map((subcat) => (
        <div
          key={subcat.id}
          className="flex items-center justify-between p-2 border-b"
        >
          {editingCategory && editingCategory.id === subcat.id ? (
            <div className="flex gap-2 items-center w-full">
              <Input
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="py-1 h-8"
              />
              <Button
                size="sm"
                onClick={handleSaveEdit}
                disabled={updateCategoryMutation.isPending}
              >
                {updateCategoryMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  "Guardar"
                )}
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setEditingCategory(null)}
              >
                Cancelar
              </Button>
            </div>
          ) : (
            <>
              <span>{subcat.name}</span>
              <div className="flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  onClick={() => handleEditCategory(subcat)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  onClick={() => confirmDeleteCategory(subcat)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );

  return (
    <>
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>Gestión de Categorías</DialogTitle>
            <DialogDescription>
              Administra las categorías y subcategorías de tus productos.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-6">
            {/* Sección para crear categoría principal */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Nueva Categoría Principal</h3>
              <div className="flex gap-2">
                <Input
                  placeholder="Nombre de la categoría"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
                <Button
                  onClick={handleCreateRootCategory}
                  disabled={
                    createCategoryMutation.isPending || !categoryName.trim()
                  }
                >
                  {createCategoryMutation.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Plus className="h-4 w-4 mr-2" />
                  )}
                  Crear
                </Button>
              </div>
            </div>

            {/* Separador */}
            <div className="border-t" />

            {/* Sección para crear subcategoría */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Nueva Subcategoría</h3>
              <div className="grid gap-2">
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="text-sm" htmlFor="select-category">
                      Seleccionar Categoría Principal
                    </label>
                    <select
                      id="select-category"
                      className="w-full border rounded p-2 bg-background"
                      value={selectedCategory?.id || ""}
                      onChange={(e) => {
                        const catId = parseInt(e.target.value);
                        const cat =
                          categoriesQuery.data?.find((c) => c.id === catId) ||
                          null;
                        setSelectedCategory(cat);
                      }}
                    >
                      <option value="">Seleccionar categoría</option>
                      {categoriesQuery.data?.map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Nombre de la subcategoría"
                    value={subcategoryName}
                    onChange={(e) => setSubcategoryName(e.target.value)}
                    disabled={!selectedCategory}
                  />
                  <Button
                    onClick={handleCreateSubcategory}
                    disabled={
                      createCategoryMutation.isPending ||
                      !subcategoryName.trim() ||
                      !selectedCategory
                    }
                  >
                    {createCategoryMutation.isPending ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Plus className="h-4 w-4 mr-2" />
                    )}
                    Crear
                  </Button>
                </div>
              </div>
            </div>

            {/* Separador */}
            <div className="border-t" />

            {/* Lista de categorías */}
            <div>
              <h3 className="text-lg font-medium mb-4">
                Listado de Categorías
              </h3>
              {categoriesQuery.isLoading ? (
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
              ) : categoriesQuery.data?.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  No hay categorías disponibles
                </p>
              ) : (
                <ScrollArea className="h-[300px]">
                  <Accordion type="single" collapsible className="w-full">
                    {categoriesQuery.data?.map((category) => (
                      <AccordionItem
                        key={category.id}
                        value={category.id.toString()}
                      >
                        <div className="flex items-center justify-between">
                          <AccordionTrigger className="flex-1">
                            {editingCategory &&
                            editingCategory.id === category.id ? (
                              <div className="flex gap-2 items-center w-full mr-4">
                                <Input
                                  value={editName}
                                  onChange={(e) => setEditName(e.target.value)}
                                  className="py-1 h-8"
                                  onClick={(e) => e.stopPropagation()}
                                />
                                <Button
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleSaveEdit();
                                  }}
                                  disabled={updateCategoryMutation.isPending}
                                >
                                  {updateCategoryMutation.isPending ? (
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                  ) : (
                                    "Guardar"
                                  )}
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setEditingCategory(null);
                                  }}
                                >
                                  Cancelar
                                </Button>
                              </div>
                            ) : (
                              <span>{category.name}</span>
                            )}
                          </AccordionTrigger>
                          <div className="flex gap-2 mr-4">
                            {!(
                              editingCategory &&
                              editingCategory.id === category.id
                            ) && (
                              <>
                                <Button
                                  size="icon"
                                  variant="outline"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditCategory(category);
                                  }}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="icon"
                                  variant="destructive"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    confirmDeleteCategory(category);
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </>
                            )}
                          </div>
                        </div>
                        <AccordionContent>
                          {category.subCategories.length === 0 ? (
                            <p className="text-muted-foreground pl-4 py-2">
                              No hay subcategorías
                            </p>
                          ) : (
                            renderSubcategories(category.subCategories)
                          )}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </ScrollArea>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setModalOpen(false)}>
              Cerrar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de confirmación para eliminar categoría */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar la categoría
              <span className="font-medium"> {categoryToDelete?.name}</span>?
              {/* {categoryToDelete?.subCategories?.length > 0 && (
                <span className="text-destructive block mt-2">
                  ¡Atención! Esta categoría tiene subcategorías que también
                  serán eliminadas.
                </span>
              )} */}
              Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Cancelar
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDeleteConfirmed}
              disabled={deleteCategoryMutation.isPending}
            >
              {deleteCategoryMutation.isPending ? "Eliminando..." : "Eliminar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ModalCategories;
