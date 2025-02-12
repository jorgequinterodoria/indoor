export interface Item {
  id: string;          // Identificador único del artículo
  name: string;        // Nombre del artículo
  category: string;    // Categoría del artículo
  stock: number;       // Cantidad en stock
  minStock: number;    // Stock mínimo requerido
  price: number;       // Precio del artículo
  supplier: string;    // Proveedor del artículo
} 