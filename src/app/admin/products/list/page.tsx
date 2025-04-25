"use client";
import { useGetAllProducts } from "@/hooks/Products/useGetAllProducts";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GetAllProductsResponse } from "@/types/GetAllProductsResponse";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertCircle, PlusCircle, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ModalProduct from "../ModalProduct";
import { useState } from "react";
import { CreateProductRequest } from "@/types/CreateProductRequest";

function ProductsTable() {
  const productsData = useGetAllProducts();
  const [formOpen, setFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentProduct, setCurrentProduct] =
    useState<CreateProductRequest | null>(null);
  const products = (productsData.data || []) as GetAllProductsResponse[];
  const columnHelper = createColumnHelper<GetAllProductsResponse>();

  const handleOpenCreateModal = () => {
    setCurrentProduct(null); // Limpia cualquier producto que estuviera seleccionado
    setIsEditMode(false); // No es modo edición
    setFormOpen(true); // Abre el modal
  };
  const handleOpenEditModal = (product: GetAllProductsResponse) => {
    // Convierte el producto al formato requerido por el modal
    const editProduct: CreateProductRequest = {
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock,
      categoryId: product.category,
      imageUrl: product.imageUrl,
      discountPercentage: product.discountPercentage,
      discountStartDate: product.discountStartDate,
      discountEndDate: product.discountEndDate,
      // Añade otros campos según necesites
    };

    setCurrentProduct(editProduct);
    setIsEditMode(true);
    setFormOpen(true);
  };
  const handleSaveProduct = () => {
    // Aquí añadirías la lógica para guardar el producto
    console.log("Guardando producto:", currentProduct);

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
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return "Fecha inválida";
      }

      return date.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch (error) {
      return "Error de formato";
    }
  };
  const columns = [
    columnHelper.accessor("id", {
      header: "ID",
      cell: (info) => (
        <span className="font-mono text-xs">{info.getValue()}</span>
      ),
      size: 60,
    }),
    columnHelper.accessor((row) => row, {
      id: "product",
      header: "Producto",
      cell: (info) => {
        const product = info.getValue();
        return (
          <div className="flex items-center gap-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={product.imageUrl || ""} alt={product.name} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {product.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{product.name}</p>
              <p className="text-xs text-muted-foreground line-clamp-1 max-w-[200px]">
                {product.description}
              </p>
            </div>
          </div>
        );
      },
      size: 100,
    }),
    columnHelper.accessor("categoryName", {
      header: "Categoría",
      cell: (info) => (
        <Badge variant="outline" className="font-normal">
          {info.getValue()}
        </Badge>
      ),
      size: 80,
    }),
    columnHelper.accessor("stock", {
      header: "Stock",
      cell: (info) => {
        const stock = info.getValue();
        let badgeVariant = "outline";
        if (stock <= 0) badgeVariant = "destructive";
        else if (stock < 10) badgeVariant = "secondary";
        return (
          <Badge variant={badgeVariant as any} className="font-medium">
            {stock}
          </Badge>
        );
      },
      size: 40,
    }),
    columnHelper.accessor((row) => row, {
      id: "pricing",
      header: "Precio",
      cell: (info) => {
        const product = info.getValue();
        return (
          <div className="flex gap-2 items-center">
            {product.discountPercentage > 0 ? (
              <>
                <div className="font-medium">
                  ${product.finalPrice.toFixed(2)}
                </div>
                <div className="text-xs text-muted-foreground line-through">
                  ${product.price.toFixed(2)}
                </div>
                <Badge variant="destructive" className="mt-1 text-xs">
                  -{product.discountPercentage}%
                </Badge>
              </>
            ) : (
              <div className="font-medium">${product.price.toFixed(2)}</div>
            )}
          </div>
        );
      },
      size: 80,
    }),
    columnHelper.accessor("createdAt", {
      header: "Creado",
      cell: (info) => formatDate(info.getValue()),
      size: 80,
    }),
    columnHelper.accessor("updatedAt", {
      header: "Actualizado",
      cell: (info) => formatDate(info.getValue()),
      size: 80,
    }),
    columnHelper.accessor((row) => row.id, {
      id: "actions",
      header: "Acciones",
      cell: (info) => {
        const product = info.row.original;
        return (
          <div className="flex gap-2 items-center">
            <Button
              variant="outline"
              size="sm"
              className="h-8 px-2"
              onClick={() => handleOpenEditModal(product)}
            >
              Editar
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="h-8 px-2"
              onClick={() => console.log("Eliminar producto", product.id)}
            >
              Eliminar
            </Button>
          </div>
        );
      },
      size: 80,
    }),
  ];

  // Crear la tabla
  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

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
      <div className="relative mb-6">
        <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Buscar productos..." className="pl-8" />
      </div>
      <div className="rounded-md">
        <Card>
          <CardHeader>
            <CardTitle>Productos ({productsData.data?.length || 0})</CardTitle>
            <CardDescription>
              Lista completa de productos en tu inventario
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader className="bg-muted/50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className="hover:bg-transparent"
                  >
                    {headerGroup.headers.map((header) => (
                      <TableHead
                        key={header.id}
                        style={{
                          width:
                            header.getSize() !== 150
                              ? header.getSize()
                              : undefined,
                        }}
                        className="font-medium"
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {productsData.isLoading ? (
                  // Estado de carga
                  Array.from({ length: 5 }).map((_, index) => (
                    <TableRow
                      key={`loading-${index}`}
                      className="animate-pulse"
                    >
                      {columns.map((col, colIndex) => (
                        <TableCell
                          key={`loading-cell-${index}-${colIndex}`}
                          className="py-3"
                        >
                          <div className="h-4 bg-muted rounded w-full max-w-[100px]"></div>
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : table.getRowModel().rows.length ? (
                  // Renderizar filas cuando hay datos
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      className="hover:bg-muted/40 transition-colors"
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="py-3">
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell
                      colSpan={columns.length}
                      className="h-32 text-center"
                    >
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <AlertCircle className="h-12 w-12 mb-2 text-muted" />
                        <p className="text-lg font-medium">
                          No hay productos disponibles
                        </p>
                        <p className="text-sm">
                          Intenta modificar los filtros o agrega nuevos
                          productos
                        </p>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <ModalProduct
          formOpen={formOpen}
          setFormOpen={setFormOpen}
          currentProduct={currentProduct}
          setCurrentProduct={setCurrentProduct}
          isEditMode={isEditMode}
          handleSaveProduct={handleSaveProduct}
        />
      </div>
    </div>
  );
}

export default ProductsTable;
