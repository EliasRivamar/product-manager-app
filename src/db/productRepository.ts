import { db } from './index'
import { type Producto } from '../types/types'

export const productRepository = {
  async getAll(): Promise<Producto[]> {
    return await db.products.toArray()
  },

  async getById(id: string): Promise<Producto | undefined> {
    return await db.products.get(id)
  },
  async add(product: Producto): Promise<void> {
    await db.products.add(product)
  },

  async update(id: string, updates: Partial<Producto>): Promise<void> {
    await db.products.update(id, updates)
  },

  async delete(id: string): Promise<void> {
    await db.products.delete(id)
  },

  /** Importación desde CSV al iniciar */
  async bulkInsert(products: Producto[]): Promise<void> {
    await db.products.bulkAdd(products)
  },
}
