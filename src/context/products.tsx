import { createContext, useEffect, useState, type ReactNode } from "react";
import { productRepository } from "../db/productRepository";
import { type ProductContextType, type Producto } from "../types/types";
import { initDatabase } from "../db/init";

export const ProductsContext = createContext<ProductContextType | undefined>(undefined);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [productos, setProductos] = useState<Producto[]>([]);

  useEffect(() => {
      initDatabase().then(() => {
        console.log("DB lista");
        productRepository.getAll().then(setProductos);
      });
    }, []);

  async function getAll() {
    return await productRepository.getAll()
  }

  async function addProduct(product: Producto): Promise<void> {
    await productRepository.add(product)
    const updated = await productRepository.getAll();
    setProductos(updated);
  }

  async function updateProduct(id: string, updates: Partial<Producto>): Promise<void> {
    await productRepository.update(id, updates)
    const updated = await productRepository.getAll();
    setProductos(updated);
  }

  async function deleteProduct(id: string): Promise<void> {
    await productRepository.delete(id)
    const updated = await productRepository.getAll();
    setProductos(updated);
  }

  async function resetProduct() {
    await productRepository.reset()
    const updated = await productRepository.getAll();
    setProductos(updated);
  }


  return (
    <ProductsContext.Provider value={{
      productos, setProductos, addProduct, updateProduct, deleteProduct, resetProduct, getAll
    }}>
      {children}
    </ProductsContext.Provider>
  );
}