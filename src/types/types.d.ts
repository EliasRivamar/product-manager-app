export interface Producto {
  id: string,
  name: string,
  category: string,
  stock: number,
  price: number,
}


export interface CartItem {
  producto: Producto,
  quantity: number
}

export type CartState = CartItem[]

export type CartAction =
  | { type: 'ADD_TO_CART', payload: Producto }
  | { type: 'REMOVE_FROM_CART', payload: Producto }
  | { type: 'CLEAR_CART' }
  | { type: 'REST_QUANTITY', payload: Producto }
  | { type: 'UPDATE_QUANTITY', payload: { product: Producto, quantity: number } }

export interface Carrito {
  items: CartItem[],
  total: number
}

interface FiltersState {
  stock: 'all' | 'yes-stock' | 'no-stock';
}

interface FiltersContextType {
  filters: FiltersState;
  setFilters: React.Dispatch<React.SetStateAction<FiltersState>>;
}

