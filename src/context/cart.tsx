import { useReducer, createContext, type ReactNode } from 'react'
import { cartReducer, cartInitialState } from '../reducer/cart.ts'
import { type Producto, type CartContextType } from '../types/types.js'

export const CartContext = createContext<CartContextType | undefined>(undefined)

function useCartReducer() {
  const [state, dispatch] = useReducer(cartReducer, cartInitialState)

  const addToCart = (product: Producto) => dispatch({
    type: 'ADD_TO_CART',
    payload: product
  })

  const removeFromCart = (product: Producto) => dispatch({
    type: 'REMOVE_FROM_CART',
    payload: product
  })

  const clearCart = () => dispatch({ type: 'CLEAR_CART'})

  const restQuantity = (product: Producto) => dispatch({
    type: 'REST_QUANTITY',
    payload: product
  })

  const updateQuantity = (product: Producto, quantity: number) =>
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { product, quantity }
    });
  

  return { state, addToCart, removeFromCart, clearCart, restQuantity, updateQuantity }
}

// la dependencia de usar React Context
// es MÍNIMA
export function CartProvider({ children }: { children: ReactNode }) {
  const { state, addToCart, removeFromCart, clearCart, restQuantity, updateQuantity } = useCartReducer()

  return (
    <CartContext.Provider value={{
      cart: state,
      addToCart,
      removeFromCart,
      clearCart,
      restQuantity,
      updateQuantity
    }}
    >
      {children}
    </CartContext.Provider>
  )
}