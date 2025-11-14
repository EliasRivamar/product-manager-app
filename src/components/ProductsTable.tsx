import { useEffect, useState } from "react"
import Papa from 'papaparse'
import { type Producto } from "../types/types"
import { Button } from "./Button"

export function ProductsTable() {
  const [productos, setProductos] = useState<Producto[]>([])
  useEffect(() => {
    Papa.parse("/productos.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (result) => {
        setProductos(result.data as Producto[])
      },
    })
  }, [])
  console.log(productos)
  return (
    <div className=" min-w-[60%] rounded-xl border border-bor-light dark:border-bor-dark bg-surface-light dark:bg-surface-dark max-h-[530px] overflow-y-auto">
      <table className="w-full">
        <thead className="bg-surface-light dark:bg-surface-dark sticky top-0">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider" scope="col">Nombre</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider" scope="col">Stock</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider" scope="col">Precio</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider" scope="col">Añadir</th>
          </tr>
        </thead>

        <tbody>
          {
            productos.map(producto => (
              <tr key={producto.key} className='border-t border-bor-light dark:border-bor-dark hover:bg-background-light dark:hover:bg-background-dark '>
                <td className="px-6 py-2 whitespace-nowrap text-sm font-medium">{producto.name}</td>
                <td className="px-6 py-2 whitespace-nowrap text-sm">
                  <div className="flex items-center gap-2">
                    <span className={`h-2 w-2 rounded-full ${producto.stock === 0 ? 'bg-danger' : 'bg-success'}`}></span>
                    <span className={`${producto.stock === 0 ? 'text-danger' : 'text-success'}`}>{producto.stock} unidades</span>
                  </div>
                </td>
                <td className="px-8 py-2 whitespace-nowrap text-sm text-text-primary-light dark:text-text-primary-dark">{producto.price}</td>
                <td className="px-4 py-2">
                  <Button>Añadir</Button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>

    </div>
  )
}