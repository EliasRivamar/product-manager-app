import { type Producto } from "../../types/types"
import { useCart } from "../../hooks/useCart"
import { AddToCartIcon } from "../../icons/AddCart"
import { useScroll } from "../../hooks/useScroll"
import { useSettings } from "../../hooks/useSettings"


export function ProductsTable({ productos, focusedPanel, setFocusedPanel }: { productos: Producto[], focusedPanel: "products" | "cart", setFocusedPanel: (panel: "products" | "cart") => void }) {
  const { cart, addToCart } = useCart()
  const {rowRefs, containerRef, selectedIndex, setSelectedIndex} = useScroll({productos, focusedPanel, cart, addToCart, setFocusedPanel, setProductToEdit: () => (null) , setProductToDelete: () => (null), productToEdit: null, productToDelete: null, addProduct: false})
  const { settings } = useSettings()
  const { separator } = settings


  
  return (
    <div className={` min-w-[60%] rounded-xl border border-bor-light dark:border-bor-dark bg-surface-light dark:bg-surface-dark max-h-[530px] overflow-y-auto ${focusedPanel === "products" ? "ring-2 ring-primary" : ""}`} ref={containerRef as React.RefObject<HTMLDivElement>}>
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
            productos.map((producto, index) => {
              const isSelected = index === selectedIndex
              const inCart = cart.some(item => item.producto.id === producto.id)
              return (
                <tr key={producto.id}
                  ref={(el) => {if (el) rowRefs.current[index] = el;}}
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
                  <td className="px-8 py-2 whitespace-nowrap text-sm text-text-primary-light dark:text-text-primary-dark">${ separator === 'Punto (.)' ? producto.price.toLocaleString("es-AR") : producto.price.toLocaleString("en-US") }</td>
                  <td className="px-4 py-2">
                    <button
                      disabled={producto.stock === 0 || inCart}
                      className={`bg-primary/20 rounded-lg text-text-primary-dark hover:bg-primary/30 text-sm hover:scale-105 duration-300 py-2 px-3 ${producto.stock === 0 || cart.some(item => item.producto.id === producto.id) ? 'opacity-10' : 'opacity-100 cursor-pointer'}`}
                      onClick={() => addToCart(producto)}>
                      <span><AddToCartIcon className={'stroke-primary'} /></span>
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