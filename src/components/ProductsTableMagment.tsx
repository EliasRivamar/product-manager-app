import { type Producto } from "../types/types"
import { useCart } from "../hooks/useCart"
import { EditIcon } from "../icons/Edit"
import { EliminateIcon } from "../icons/Eliminate"
import { useScroll } from "../hooks/useScroll"
import { useState } from "react"
import { CartDelete } from "./CartDelete"
import { CartEdit } from "./CartEdit"


export function ProductsTableMagment({ productos, setProductos, focusedPanel, setFocusedPanel }: { productos: Producto[], setProductos: (p: Producto[]) => void, focusedPanel: "products" | "productsControl" | "cart", setFocusedPanel: (panel: "products" | "productsControl" | "cart") => void }) {
  const { cart, addToCart } = useCart()
  const [productToEdit, setProductToEdit] = useState<Producto | null>(null)
  const [productToDelete, setProductToDelete] = useState<Producto | null>(null)
  const { rowRefs, containerRef, selectedIndex, setSelectedIndex } = useScroll(
    {
      productos,
      focusedPanel,
      cart,
      addToCart,
      setFocusedPanel,
      setProductToEdit,
      setProductToDelete,
      productToEdit,
      productToDelete
    })

  async function handleDelete(producto: Producto) {
    if (!producto) return
    setProductToDelete(producto)
  }

  async function handleEdit(producto: Producto) {
    if (!producto) return
    setProductToEdit(producto)
  }

  return (
    <div className={`min-w-full rounded-xl border border-bor-light dark:border-bor-dark bg-surface-light dark:bg-surface-dark max-h-[530px] overflow-y-auto ${focusedPanel === "products" ? "ring-2 ring-primary" : ""}`} ref={containerRef}>
      {productToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <CartDelete producto={productToDelete} setProductos={setProductos} setProductToDelete={setProductToDelete} />
        </div>
      )}
      {productToEdit && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <CartEdit producto={productToEdit} setProductos={setProductos} setProductToEdit={setProductToEdit} />
        </div>
      )}
      <table className="w-full">
        <thead className="bg-surface-light dark:bg-surface-dark sticky top-0">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider" scope="col">Nombre</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider" scope="col">Stock</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider" scope="col">Precio</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider" scope="col">Editar</th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-text-secondary-light dark:text-text-secondary-dark uppercase tracking-wider" scope="col">Borrar</th>
          </tr>
        </thead>

        <tbody>
          {
            productos.map((producto, index) => {
              const isSelected = index === selectedIndex
              return (
                <tr key={producto.id}
                  ref={(el) => rowRefs.current[index] = el}
                  onMouseDown={() => setSelectedIndex(index)}
                  onContextMenu={(e) => {
                    e.preventDefault()
                    setSelectedIndex(index)
                  }}
                  className={`border-t border-bor-light dark:border-bor-dark hover:bg-background-light dark:hover:bg-background-dark ${isSelected ? 'bg-background-light dark:bg-background-dark' : ''}`}>
                  <td className="px-6 py-2 whitespace-nowrap text-sm font-medium">{producto.name}</td>
                  <td className="px-6 py-2 whitespace-nowrap text-sm">
                    <div className="flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${producto.stock === 0 ? 'bg-danger' : 'bg-success'}`}></span>
                      <span className={`${producto.stock === 0 ? 'text-danger' : 'text-success'}`}>{producto.stock} unidades</span>
                    </div>
                  </td>
                  <td className="px-8 py-2 whitespace-nowrap text-sm text-text-primary-light dark:text-text-primary-dark">${producto.price}</td>
                  <td className="px-6 py-2 place-items-center justify-center">
                    <button
                      className={`bg-primary/20 rounded-lg text-text-primary-dark hover:bg-primary/30 text-sm hover:scale-105 duration-300 py-2 px-3 cursor-pointer`}
                      onClick={() => handleEdit(producto)}>
                      <span><EditIcon /></span>
                    </button>
                  </td>
                  <td className="px-7 py-2">
                      <button
                        className={`bg-danger/20 rounded-lg text-text-primary-dark hover:bg-danger/30 text-sm hover:scale-105 duration-300 py-2 px-3 cursor-pointer`}
                        onClick={() => handleDelete(producto)}>
                        <span><EliminateIcon className={'stroke-danger'} /></span>
                      </button>

                  </td>
                </tr>
              )
            })}
        </tbody>
      </table>

    </div >
  )
}