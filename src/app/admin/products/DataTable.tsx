import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import { GetAllProductsResponse } from "@/types/GetAllProductsResponse";
import { formatDate } from "@/utils/formatDate";
import {
  createColumnHelper,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowDownWideNarrow,
  ArrowUpWideNarrow,
  AlertCircle,
  Search,
} from "lucide-react";
import React, { useState } from "react";

type Props = {
  products: GetAllProductsResponse[];
  isLoading: boolean;
  handleOpenEditModal: (product: GetAllProductsResponse) => void;
  deleteProduct: (productId: number) => void;
};

function TableProducts({
  products,
  isLoading,
  handleOpenEditModal,
  deleteProduct,
}: Props) {
  const columnHelper = createColumnHelper<GetAllProductsResponse>();
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filtering, setFiltering] = useState("");
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
      enableSorting: false,
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
              onClick={() => deleteProduct(product.id)}
            >
              Eliminar
            </Button>
          </div>
        );
      },
      size: 80,
    }),
  ];
  const fuzzyFilter: FilterFn<GetAllProductsResponse> = (row, filterValue) => {
    const searchValue = String(filterValue).toLowerCase();
    const product = row.original;
    if (product.id.toString().toLowerCase().includes(searchValue)) return true;
    if (product.name.toLowerCase().includes(searchValue)) return true;
    if (product.description.toLowerCase().includes(searchValue)) return true;
    if (product.categoryName.toLowerCase().includes(searchValue)) return true;
    return false;
  };
  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    globalFilterFn: fuzzyFilter,
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setFiltering,
  });
  return (
    <>
      <div className="relative mb-6">
        <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar productos..."
          className="pl-8"
          onChange={(e) => setFiltering(e.target.value)}
        />
      </div>
      <div className="rounded-md">
        <Card>
          <CardHeader>
            <CardTitle>Productos ({products.length || 0})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader className="bg-muted/50">
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow
                    key={headerGroup.id}
                    className="hover:bg-transparent cursor-pointer"
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
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <div className="flex gap-2">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {header.column.getIsSorted() && (
                            <>
                              {header.column.getIsSorted() === "desc" && (
                                <ArrowDownWideNarrow className="w-4" />
                              )}
                              {header.column.getIsSorted() === "asc" && (
                                <ArrowUpWideNarrow className="w-4" />
                              )}
                              {!header.column.getIsSorted() && (
                                <ArrowUpWideNarrow className="w-4 opacity-30" />
                              )}
                            </>
                          )}
                        </div>
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {isLoading ? (
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
      </div>
    </>
  );
}

export default TableProducts;
