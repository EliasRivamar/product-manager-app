import type { CartAction, CartState } from '../types/types'

export const cartInitialState: CartState = (() => {
  const raw = window.localStorage.getItem("cart");

  try {
    const parsed = JSON.parse(raw || "[]");

    // Limpia datos corruptos
    return Array.isArray(parsed)
      ? parsed.filter(item => item && item.producto && item.quantity != null)
      : [];
  } catch {
    return [];
  }
})();


export const updateLocalStorage = (state: CartState): void => {
  window.localStorage.setItem('cart', JSON.stringify(state))
}

const UPDATE_STATE_BY_ACTION = (state: CartState, action: CartAction) => {
  if (action.type === 'ADD_TO_CART') {
    const { id } = action.payload
    const index = state.findIndex((item) => item.producto.id === id)
    if (index >= 0) {
      const newState = [...state]
      if(newState[index].producto.stock <= newState[index].quantity){
         return state
      }
      newState[index] = {
        ...newState[index],
        quantity: newState[index].quantity + 1,
        price: (newState[index].producto.price + newState[index].price)
      }
      updateLocalStorage(newState)
      return newState
    }
    const newState = [
      ...state,
      {
        producto: action.payload,
        quantity: 1,
        price: action.payload.price
      },
    ]
    updateLocalStorage(newState)
    return newState
  }
  if (action.type === 'REMOVE_FROM_CART') {
    const { id } = action.payload
    const newState = state.filter((item) => item.producto.id !== id)
    updateLocalStorage(newState)
    return newState
  }
  if (action.type === 'CLEAR_CART') {
    updateLocalStorage([])
    return []
  }
  if (action.type === 'UPDATE_QUANTITY') {
    const { product, quantity } = action.payload
    const index = state.findIndex((item) => item.producto.id === product.id)
    if(index < 0) return
    const newState = [...state]
      newState[index] = {
        ...newState[index],
        quantity: quantity,
        price: product.price * quantity
      }
    updateLocalStorage(newState)
    return newState
  }
  if (action.type === 'REST_QUANTITY') {
    const { id } = action.payload
    const index = state.findIndex((item) => item.producto.id === id)
    if (index < 0) return state
    const item = state[index]
    if (item.quantity === 1) return state
    const newState = [...state]
    newState[index] = {
      ...item,
      quantity: item.quantity - 1,
      price: (item.price - item.producto.price)
    }
    updateLocalStorage(newState)
    return newState
  }
  return state
}
export const cartReducer = (state: CartState, action: CartAction) => {
  const updateState = UPDATE_STATE_BY_ACTION(state, action)
  return updateState || state
}
