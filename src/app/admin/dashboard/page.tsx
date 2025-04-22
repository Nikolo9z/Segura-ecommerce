"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowUpRight,
  DollarSign,
  PackageOpen,
  ShoppingBag,
  Users,
} from "lucide-react";
import {
  BarChart,
  LineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  Bar,
  Cell,
  ResponsiveContainer,
} from "recharts";

// Datos simulados para el dashboard
const topProducts = [
  {
    id: 1,
    name: "Camisa Oxford Azul",
    price: 59.99,
    sales: 124,
    image: "/p1.webp",
  },
  {
    id: 2,
    name: "Pantalón Slim Fit",
    price: 89.99,
    sales: 98,
    image: "/p2.webp",
  },
  {
    id: 3,
    name: "Chaqueta de Cuero",
    price: 199.99,
    sales: 76,
    image: "/p4.webp",
  },
  { id: 4, name: "Zapatos Derby", price: 129.99, sales: 68, image: "/p5.webp" },
  {
    id: 5,
    name: "Corbata de Seda",
    price: 45.99,
    sales: 52,
    image: "/p6.webp",
  },
];

const recentProducts = [
  {
    id: 10,
    name: "Camisa Lino Blanca",
    price: 69.99,
    stock: 45,
    date: "2025-04-18",
    image: "/p7.webp",
  },
  {
    id: 11,
    name: "Blazer Estructurado",
    price: 149.99,
    stock: 30,
    date: "2025-04-15",
    image: "/p6.webp",
  },
  {
    id: 12,
    name: "Cinturón de Cuero",
    price: 39.99,
    stock: 65,
    date: "2025-04-12",
    image: "/p5.webp",
  },
  {
    id: 13,
    name: "Calcetines Pack 3",
    price: 19.99,
    stock: 120,
    date: "2025-04-10",
    image: "/p4.webp",
  },
  {
    id: 14,
    name: "Gemelos Plateados",
    price: 29.99,
    stock: 25,
    date: "2025-04-08",
    image: "/p3.webp",
  },
];

// Datos para gráficos de Recharts
const salesData = [
  { name: "Ene", ventas: 12450 },
  { name: "Feb", ventas: 19800 },
  { name: "Mar", ventas: 15600 },
  { name: "Abr", ventas: 21300 },
];

const productCategoryData = [
  { name: "Camisas", ventas: 320 },
  { name: "Pantalones", ventas: 245 },
  { name: "Chaquetas", ventas: 187 },
  { name: "Accesorios", ventas: 390 },
  { name: "Calzado", ventas: 210 },
];

export default function Dashboard() {
  return (
    <div className="container mx-auto py-10">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-clash-bold">Dashboard</h1>
          <p className="text-muted-foreground">
            Una visión general de tu tienda
          </p>
        </div>
        <Button>Descargar Reporte</Button>
      </div>

      {/* Tarjetas de resumen */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Ventas Totales
            </CardTitle>
            <ShoppingBag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,284</div>
            <p className="text-xs text-muted-foreground">
              +12% respecto al mes anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ingresos</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$69,150.00</div>
            <p className="text-xs text-muted-foreground">
              +8% respecto al mes anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inventario</CardTitle>
            <PackageOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">982</div>
            <p className="text-xs text-muted-foreground">
              12 productos con bajo stock
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Clientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground">
              +24 clientes nuevos este mes
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Pestañas para gráficos */}
      <Tabs defaultValue="overview" className="mb-8">
        <TabsList>
          <TabsTrigger value="overview">Visión General</TabsTrigger>
          <TabsTrigger value="categories">Por Categorías</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Ventas Mensuales</CardTitle>
              <CardDescription>
                Comparativa de ventas en los últimos meses
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <LineChart
                  data={salesData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="ventas"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                    name="Ventas 2025"
                  />
                </LineChart>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="categories" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>Ventas por Categoría</CardTitle>
              <CardDescription>
                Distribución de productos vendidos por categoría
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full">
                <BarChart
                  data={productCategoryData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar
                    dataKey="ventas"
                    fill="#8884d8"
                    name="Ventas por categoría"
                  />
                </BarChart>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Tablas de productos */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Productos Más Vendidos</CardTitle>
            <CardDescription>
              Los 5 productos con mayor número de ventas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Producto</TableHead>
                  <TableHead className="text-right">Precio</TableHead>
                  <TableHead className="text-right">Ventas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={product.image} alt={product.name} />
                          <AvatarFallback>
                            {product.name.substring(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{product.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      ${product.price}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="outline" className="font-medium">
                        {product.sales}{" "}
                        <ArrowUpRight className="ml-1 h-3 w-3" />
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="outline" size="sm">
              Ver todos
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Productos Recientes</CardTitle>
            <CardDescription>
              Últimos productos añadidos al catálogo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Producto</TableHead>
                  <TableHead className="text-right">Precio</TableHead>
                  <TableHead className="text-right">Stock</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentProducts.map((product) => (
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
                          <p className="text-xs text-muted-foreground">
                            {product.date}
                          </p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      ${product.price}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge
                        variant={product.stock > 50 ? "outline" : "destructive"}
                        className="font-medium"
                      >
                        {product.stock}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button variant="outline" size="sm">
              Ver todos
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
