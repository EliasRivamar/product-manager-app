import Dexie, { type Table } from 'dexie'
import { type Producto, type Sale } from '../types/types'

export class AppDB extends Dexie {
  products!: Table<Producto, string>
  sales!: Table<Sale, string>

  constructor() {
    super('LocalCommerceDB')
    this.version(1).stores({
      products: 'id, name, category, stock, price',
      sales: 'id, date'
    })
  }
}

export const db = new AppDB()
