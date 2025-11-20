import { useEffect, useRef, useState } from 'react'
import type { CartState, Producto } from '../types/types'

export const useScroll = ({
  productos,
  focusedPanel,
  cart,
  addToCart,
  setFocusedPanel,
  setProductToEdit,
  setProductToDelete,
  productToEdit,
  productToDelete,
  addProduct
}: {
  productos: Producto[]
  focusedPanel: 'products' | 'productsControl' | 'cart'
  cart: CartState
  addToCart: (p: Producto) => void
  setFocusedPanel: (panel: 'products' | 'cart') => void
  setProductToEdit: (p: Producto) => void
  setProductToDelete: (p: Producto) => void
  productToEdit: Producto | null
  productToDelete: Producto | null
  addProduct: boolean
}) => {
  const rowRefs = useRef<(HTMLTableRowElement | undefined)[]>([])
  const containerRef = useRef<HTMLDivElement | undefined>(null)
  const [selectedIndex, setSelectedIndex] = useState(0)
  
  // Scroll automático
  useEffect(() => {
    if ((focusedPanel !== 'products' && focusedPanel !== 'productsControl') || (productToEdit !== null || productToDelete !== null))
      return

    function scrollToRow() {
      const row = rowRefs.current[selectedIndex]
      const container = containerRef.current

      if (!row || !container) return

      const rowTop = row.offsetTop
      const rowBottom = rowTop + row.offsetHeight

      const viewTop = container.scrollTop
      const viewBottom = viewTop + container.clientHeight

      // Si la fila está por encima de la vista → scrollear hacia arriba
      if (rowTop < viewTop) {
        container.scrollTo({ top: rowTop - 50, behavior: 'smooth' })
      }

      // Si la fila está por debajo de la vista → scrollear hacia abajo
      else if (rowBottom > viewBottom) {
        container.scrollTo({
          top: rowBottom - container.clientHeight + 8,
          behavior: 'smooth',
        })
      }
    }
    scrollToRow()
  }, [selectedIndex])
  useEffect(() => {
    if (((focusedPanel === 'cart') || (productToEdit !== null || productToDelete !== null)) || addProduct === true) return
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'ArrowDown') {
        setSelectedIndex((prev) => Math.min(prev + 1, productos.length - 1))
      }

      if (e.key === 'ArrowUp') {
        setSelectedIndex((prev) => Math.max(prev - 1, 0))
      }
      if (e.key === 'ArrowRight') {
        setFocusedPanel('cart')
      }

      if ((e.key === 'Enter' && focusedPanel === 'products') && (productToEdit === null || productToDelete === null) && addProduct === false) {
        const producto = productos[selectedIndex]
        if (!producto) return

        const inCart = cart.some((item) => item.producto.id === producto.id)
        if (producto.stock > 0 && !inCart) {
          addToCart(producto)
        }
      } else if ((e.key === 'Enter' && focusedPanel === 'productsControl') && (productToEdit === null || productToDelete === null) && addProduct === false) {
        const producto = productos[selectedIndex]
        if (!producto) return
        setProductToEdit(producto)
      }
      if ((e.key === 'Backspace' && focusedPanel === 'productsControl')  && (productToEdit === null || productToDelete === null) && addProduct === false) {
        const producto = productos[selectedIndex]
        if (!producto) return
        setProductToDelete(producto)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [focusedPanel, productos, selectedIndex, cart, addToCart, setFocusedPanel, productToDelete, productToEdit, addProduct])

  return { rowRefs, containerRef, selectedIndex, setSelectedIndex }
}
