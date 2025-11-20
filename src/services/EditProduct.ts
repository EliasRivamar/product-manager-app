import { productRepository } from "../db/productRepository"
import type { Producto } from "../types/types"

export async function EditProduct({producto, setProductos}: {producto: Producto, setProductos:(p: Producto[]) => void}) {
    // Ejemplo rápido de edición con un prompt (para test)
    const newName = prompt("Nuevo nombre:", producto.name)
    const newPrice = prompt("Nuevo precio:", producto.price.toString())
    const newStock = prompt("Nuevo STOCK:", producto.stock.toString())
    if (!newName) return
    if (!newPrice) return
    if (!newStock) return
  
    await productRepository.update(producto.id, {
      name: newName,
      price: Number(newPrice),
      stock: Number(newStock)
    })
  
    const nuevos = await productRepository.getAll()
    setProductos(nuevos)
  }