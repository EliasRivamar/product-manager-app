import { useEffect, useRef, useState } from "react"
import { useCart } from "../../hooks/useCart"
import { EliminateIcon } from "../../icons/Eliminate"
import { Button } from "../Button"
import { QuantityInput } from "./QuantityInput"
import { useToast } from "../../hooks/useToast"
import { useSale } from "../../hooks/useSale"
import { useProduct } from "../../hooks/useProduct"
import { useSettings } from "../../hooks/useSettings"



export function Cart({ focusedPanel, setFocusedPanel }: { focusedPanel: "products" | "cart", setFocusedPanel: (panel: "products" | "cart") => void}) {
  const { cart, clearCart, addToCart, removeFromCart, restQuantity } = useCart()
  const [selectedIndex, setSelectedIndex] = useState(0)
  const {productos, setProductos, updateProduct, getAll} = useProduct()
  const {settings} = useSettings()
  const { showToast } = useToast()
  const { addSale } = useSale()
  const { separator } = settings


  const total = cart.reduce(
    (acc, item) => acc + item.producto.price * item.quantity,
    0
  )

  const rowRefs = useRef<(HTMLTableRowElement | undefined)[]>([])
  const containerCart = useRef<HTMLDivElement | undefined>(null)



  // Scroll automático
  useEffect(() => {
    if (focusedPanel !== "cart") return

    function scrollToRow() {
      const row = rowRefs.current[selectedIndex]
      const container = containerCart.current

      if (!row || !container) return

      const rowTop = row.offsetTop
      const rowBottom = rowTop + row.offsetHeight

      const viewTop = container.scrollTop
      const viewBottom = viewTop + container.clientHeight

      // Si la fila está por encima de la vista → scrollear hacia arriba
      if (rowTop < viewTop) {
        container.scrollTo({ top: rowBottom - (90), behavior: "smooth" })
      }

      // Si la fila está por debajo de la vista → scrollear hacia abajo
      else if (rowBottom > viewBottom) {
        container.scrollTo({
          top: rowBottom - container.clientHeight + 8,
          behavior: "smooth"
        })
      }
    }
    scrollToRow()
  }, [selectedIndex])



  // --- Manejar flechas y Enter ---
  useEffect(() => {
    if (focusedPanel !== "cart") return

    function handleKeyDown(e: KeyboardEvent) {


      if (e.key === "ArrowDown") {
        setSelectedIndex(prev => Math.min(prev + 1, cart.length - 1))
      }

      if (e.key === "ArrowUp") {
        setSelectedIndex(prev => Math.max(prev - 1, 0))
      }
      if (e.key === 'ArrowLeft') {
        setFocusedPanel('products')
      }

      if (e.key === "Delete" || e.key === "Backspace") {
        const item = cart[selectedIndex]
        if (item) {
          removeFromCart(item.producto)
        }
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [focusedPanel, cart, selectedIndex, removeFromCart, setFocusedPanel])



  async function handleSubmitBuy() {
    cart.forEach(async (item) => {
      await updateProduct(item.producto.id, {
        stock: item.producto.stock - item.quantity
      })
      const nuevos = await getAll()
      nuevos.forEach(producto => {
        if (settings.lowStock && producto.stock === settings.lowStockValue) {
          showToast(`Quedan solo ${producto.stock} ${producto.name}`, 'error')
        }
      })
    
      setProductos(nuevos)
      const now = new Date();
      const localDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      addSale({
        id: crypto.randomUUID(),
        date: localDate.getTime(),
        total: total,
        items: cart
      });
      clearCart()
      showToast('Compra realizada con exito. Stock actualizado.', 'success')
    })
    
    }
  return (
    <div className={`min-w-[22%] rounded-xl border border-bor-light dark:border-bor-dark bg-surface-light dark:bg-surface-dark min-h-[200px] max-h-[530px] px-4 pb-4 overflow-y-auto ${focusedPanel === "cart" ? "ring-2 ring-primary" : ""}`} ref={containerCart}>
      <header className="flex border-b border-bor-light dark:border-bor-dark bg-surface-light dark:bg-surface-dark justify-center items-center gap-7 sticky top-0 p-4">
        <h2 className='text-xl font-bold'>Ticket</h2>
        <button className="flex items-center gap-3 px-3 py-2 rounded text-danger bg-danger/10 hover:bg-danger/20 dark:bg-danger/20 dark:hover:bg-danger/30 hover:scale-105 text-sm duration-300" onClick={() => clearCart()}>Eliminar Ticket</button>
      </header>
      <hr className="border-bor-light dark:border-bor-dark my-4" />
      <ul className="gap-2 ">
        {
          cart.map((item, index) => {
            const isSelected = index === selectedIndex
            return <li key={item.producto.id} className={`flex flex-col list-items gap-2 ${isSelected ? 'bg-background-light dark:bg-background-dark' : ''}`}
              ref={(el) => rowRefs.current[index] = el}>
              <div className='flex items-center gap-4'>
                <div className='flex-1'>
                  <p className='font-semibold text-sm'>{item.producto.name}</p>
                  <p className='text-sm text-text-secondary-light dark:text-text-secondary-light'>${ separator === 'Punto (.)' ? item.price.toLocaleString("es-AR") : item.price.toLocaleString("en-US") }</p>
                </div>
                <div className="flex gap-3 items-center">
                  <button className={`flex h-7 w-7 items-center justify-center rounded-full border border-bor-light dark:border-bor-dark bg-surface-light dark:bg-surface-dark hover:bg-background-light dark:hover:bg-background-dark`} onClick={() => restQuantity(item.producto)}>-</button>
                  <QuantityInput product={item.producto} quantity={item.quantity}></QuantityInput>
                  <button className='flex h-7 w-7 items-center justify-center rounded-full border border-bor-light dark:border-bor-dark bg-surface-light dark:bg-surface-dark hover:bg-background-light dark:hover:bg-background-dark' onClick={() => addToCart(item.producto)}>+</button>
                </div>
                <div className=''>
                  <button className="bg-danger/10 hover:bg-danger/20 dark:bg-danger/20 dark:hover:bg-danger/30 rounded-lg  text-sm hover:scale-105 duration-300 py-1 px-1 cursor-pointer" onClick={() => removeFromCart(item.producto)}>
                    <span><EliminateIcon className={'h5 w-5 stroke-danger'} /></span>
                  </button>
                </div>
              </div>
              <hr className="border-bor-light dark:border-bor-dark my-4" />
            </li>
          })
        }
      </ul>
      <div className='border-t border-bor-light dark:border-bor-dark bg-surface-light dark:bg-surface-dark sticky -bottom-4 p-3'>
        <div className="text-center text-lg font-semibold mb-4">
          <p>Total: ${separator === 'Punto (.)' ? total.toLocaleString("es-AR") : total.toLocaleString("en-US")}</p>
        </div>
        <footer className='flex justify-center items-center'>

          <Button onClick={() => handleSubmitBuy()}>Generar Ticket</Button>
        </footer>
      </div>

    </div>
  )
}