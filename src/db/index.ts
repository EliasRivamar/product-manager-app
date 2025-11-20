import Dexie, { type Table } from 'dexie'
import { type Producto } from '../types/types'

export class AppDB extends Dexie {
  products!: Table<Producto, string>

  constructor() {
    super('LocalCommerceDB')
    this.version(1).stores({
      products: 'id, name, category, stock, price',
    })
  }
}

export const db = new AppDB()
