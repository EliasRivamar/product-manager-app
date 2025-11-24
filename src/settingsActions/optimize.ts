import type { Producto, Sale } from "../types/types";

export function optimizeDatabase(
  productos: Producto[],
  setProductos: (p: Producto[]) => void,
  sales: Sale[],
  setSales: (s: Sale[]) => void
) {
  // 1. Quitar productos con stock negativo
  const cleanedProducts = productos.filter((p) => p.stock >= 0);

  // 2. Quitar ventas corruptas
  const cleanedSales = sales.filter(
    (s) => s.total > 0 && s.items && s.items.length > 0
  );

  setProductos(cleanedProducts);
  setSales(cleanedSales);

  return {
    removedProducts: productos.length - cleanedProducts.length,
    removedSales: sales.length - cleanedSales.length,
  };
}