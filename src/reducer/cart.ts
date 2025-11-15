import type { CartAction, CartState } from '../types/types'

export const cartInitialState: CartState = JSON.parse(
  window.localStorage.getItem('cart') || '[]'
)

export const updateLocalStorage = (state: CartState): void => {
  window.localStorage.setItem('cart', JSON.stringify(state))
}

const UPDATE_STATE_BY_ACTION = (state: CartState, action: CartAction) => {
  if (action.type === 'ADD_TO_CART') {
    const { id } = action.payload
    const index = state.findIndex((item) => item.producto.id === id)
    if (index >= 0) {
      const newState = [...state]
      newState[index] = {
        ...newState[index],
        quantity: newState[index].quantity + 1,
      }
      updateLocalStorage(newState)
      return newState
    }
    const newState = [
      ...state,
      {
        producto: action.payload,
        quantity: 1,
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

    const newState = state.map((item) =>
      item.producto.id === product.id ? { ...item, quantity } : item
    )

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
    }
    updateLocalStorage(newState)
    return newState
  }
  return state
}
//   []: (state: CartState, action: CartAction) => {
//     const { id } = action.payload
//     const index = state.findIndex(item => item.producto.id === id)

//     if (index >= 0) {
//       const newState = [...state]
//       newState[index] = {
//         ...newState[index],
//         quantity: newState[index].quantity + 1
//       }
//       updateLocalStorage(newState)
//       return newState
//     }

//     const newState = [
//       ...state,
//       {
//         producto: action.payload,
//         quantity: 1
//       }
//     ]

//     updateLocalStorage(newState)
//     return newState
//   },

//   [CART_ACTION_TYPES.REMOVE_FROM_CART]: (state: CartState, action: CartAction) => {
//     const { id } = action.payload
//     const newState = state.filter(item => item.producto.id !== id)
//     updateLocalStorage(newState)
//     return newState
//   },

//   [CART_ACTION_TYPES.CLEAR_CART]: () => {
//     updateLocalStorage([])
//     return []
//   },

//   [CART_ACTION_TYPES.REST_QUANTITY]: (state: CartState, action: CartAction) => {
//     const { id } = action.payload
//     const index = state.findIndex(item => item.producto.id === id)

//     if (index < 0) return state

//     const item = state[index]

//     if (item.quantity === 1) return state

//     const newState = [...state]
//     newState[index] = {
//       ...item,
//       quantity: item.quantity - 1
//     }

//     updateLocalStorage(newState)
//     return newState
//   }
//   [CART_ACTION_TYPES.UPDATE_QUANTITY] : (state: CartState, action: CartAction) => {
//     return state.map(item =>
//       item.producto.id === action.payload.producto
//           ? { ...item, quantity: action.payload.quantity }
//           : item
//   );
//   }
// }

export const cartReducer = (state: CartState, action: CartAction) => {
  const updateState = UPDATE_STATE_BY_ACTION(state, action)
  return updateState || state
}
