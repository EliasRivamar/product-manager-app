import { useEffect, useState } from "react"
import Papa from 'papaparse'

interface Producto {
  name: string,
  key: string,
  stock: number,
  "Precio ($)": number,
  category: string,
}


export function ProductsTable() {
  const [productos, setProductos] = useState<Producto[]>([])
  useEffect(() => {
    Papa.parse("/productos.csv", {
      download: true,
      header: true,
      complete: (result) => {
        setProductos(result.data as Producto[])
      },
    })
  }, [])
  console.log(productos)
  return (
    <table className="min-w-[60%]">
      <thead className="bg-surface-light dark:bg-surface-dark">
        <tr>
          <th>Nombre</th>
          <th>Stock</th>
          <th>Precio</th>
        </tr>
      </thead>
      <tbody>
        {
          productos.map( producto => (
            <tr key={producto.key} className="hover:bg-surface-light/50">
                <td className="p-2 border-b border-border-light">{producto.name}</td>
                <td className="p-2 border-b border-border-light">{producto.category}</td>
                <td className="p-2 border-b border-border-light">{producto.stock}</td>
                <td className="p-2 border-b border-border-light">{producto["Precio ($)"]}</td>
              </tr>
            ))}
      </tbody>
    </table>
  )
}