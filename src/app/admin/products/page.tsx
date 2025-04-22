"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  PlusCircle,
  MoreHorizontal,
  Pencil,
  Trash2,
  Search,
  X,
} from "lucide-react";

// Tipo para los productos
type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category: string;
  image: string;
};

// Datos de ejemplo de productos
const initialProducts: Product[] = [
  {
    id: "1",
    name: "Camisa Oxford Azul",
    description: "Camisa formal de algodón premium para ocasiones especiales",
    price: 59.99,
    stock: 45,
    category: "Camisas",
    image: "/p1.webp",
  },
  {
    id: "2",
    name: "Pantalón Slim Fit",
    description: "Pantalón elegante con corte moderno y ajustado",
    price: 89.99,
    stock: 30,
    category: "Pantalones",
    image: "/p2.webp",
  },
  {
    id: "3",
    name: "Chaqueta de Cuero",
    description: "Chaqueta de cuero genuino con acabado premium",
    price: 199.99,
    stock: 15,
    category: "Chaquetas",
    image: "/p4.webp",
  },
  {
    id: "4",
    name: "Zapatos Derby",
    description: "Zapatos clásicos de cuero para un look impecable",
    price: 129.99,
    stock: 25,
    category: "Calzado",
    image: "/p5.webp",
  },
  {
    id: "5",
    name: "Corbata de Seda",
    description: "Corbata de seda italiana con diseño elegante",
    price: 45.99,
    stock: 50,
    category: "Accesorios",
    image: "/p6.webp",
  },
];

export default function ProductsAdmin() {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  // Producto vacío para crear uno nuevo
  const emptyProduct: Product = {
    id: "",
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
    image: "",
  };

  // Filtrar productos según la búsqueda
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Manejo de cambios en los campos del formulario
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (currentProduct) {
      setCurrentProduct({
        ...currentProduct,
        [e.target.name]:
          e.target.name === "price" || e.target.name === "stock"
            ? parseFloat(e.target.value)
            : e.target.value,
      });
    }
  };

  // Guardar producto (crear o actualizar)
  const handleSaveProduct = () => {
    if (currentProduct) {
      if (isEditMode) {
        // Actualizar producto existente
        setProducts(
          products.map((p) => (p.id === currentProduct.id ? currentProduct : p))
        );
      } else {
        // Crear nuevo producto
        const newProduct = {
          ...currentProduct,
          id: Date.now().toString(), // Generar ID único
        };
        setProducts([...products, newProduct]);
      }

      setFormOpen(false);
      setCurrentProduct(null);
      setIsEditMode(false);
    }
  };

  // Eliminar producto
  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  // Abrir modal para editar
  const openEditModal = (product: Product) => {
    setCurrentProduct(product);
    setIsEditMode(true);
    setFormOpen(true);
  };

  // Abrir modal para crear
  const openCreateModal = () => {
    setCurrentProduct(emptyProduct);
    setIsEditMode(false);
    setFormOpen(true);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-clash-bold">Gestión de Productos</h1>
          <p className="text-muted-foreground">
            Administra el catálogo de productos de tu tienda
          </p>
        </div>
        <Button onClick={openCreateModal}>
          <PlusCircle className="mr-2 h-4 w-4" /> Nuevo Producto
        </Button>
      </div>

      {/* Barra de búsqueda */}
      <div className="relative mb-6">
        <Search className="absolute left-2 top-3 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Buscar productos..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-2 top-3"
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </button>
        )}
      </div>

      {/* Tabla de productos */}
      <Card>
        <CardHeader>
          <CardTitle>Productos ({filteredProducts.length})</CardTitle>
          <CardDescription>
            Lista completa de productos en tu inventario
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Producto</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead className="text-right">Precio</TableHead>
                <TableHead className="text-right">Stock</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={product.image} alt={product.name} />
                        <AvatarFallback>
                          {product.name.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-xs text-muted-foreground truncate max-w-[250px]">
                          {product.description}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.category}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    ${product.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Badge
                      variant={product.stock > 20 ? "outline" : "destructive"}
                      className="font-medium"
                    >
                      {product.stock}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Acciones</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => openEditModal(product)}
                        >
                          <Pencil className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-destructive focus:text-destructive"
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filteredProducts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10">
                    No se encontraron productos con los criterios de búsqueda.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Modal para crear/editar producto */}
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
                  name="name"
                  value={currentProduct?.name || ""}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="category">Categoría</Label>
                <Input
                  id="category"
                  name="category"
                  value={currentProduct?.category || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="description">Descripción</Label>
              <Textarea
                id="description"
                name="description"
                value={currentProduct?.description || ""}
                onChange={handleInputChange}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="price">Precio</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  step="0.01"
                  value={currentProduct?.price || 0}
                  onChange={handleInputChange}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="stock">Stock</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  value={currentProduct?.stock || 0}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="image">URL de Imagen</Label>
              <Input
                id="image"
                name="image"
                value={currentProduct?.image || ""}
                onChange={handleInputChange}
                placeholder="Ej: /p1.webp"
              />
              {currentProduct?.image && (
                <div className="mt-2 flex justify-center">
                  <Avatar className="h-20 w-20">
                    <AvatarImage
                      src={currentProduct.image}
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
    </div>
  );
}
