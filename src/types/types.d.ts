export interface Producto {
  id: string
  name: string
  category: string
  stock: number
  price: number
}

export interface CartItem {
  producto: Producto
  price: number
  quantity: number
}

export type CartState = CartItem[]

export type CartAction =
  | { type: 'ADD_TO_CART'; payload: Producto }
  | { type: 'REMOVE_FROM_CART'; payload: Producto }
  | { type: 'CLEAR_CART' }
  | { type: 'REST_QUANTITY'; payload: Producto }
  | {
      type: 'UPDATE_QUANTITY'
      payload: { product: Producto; quantity: number }
    }

export interface Carrito {
  items: CartItem[]
  total: number
}

interface FiltersState {
  stock: 'all' | 'yes-stock' | 'no-stock'
}

interface FiltersContextType {
  filters: FiltersState
  setFilters: React.Dispatch<React.SetStateAction<FiltersState>>
}
interface SaleContextType {
  sales: Sale[]
  addSale: (s: Sale) => void
}

export interface Sale {
  id: string;
  date: number; // YYYY-MM-DD
  total: number;
  items: any[];
}

type CustomTooltipProps = {
  active?: boolean;
  payload?: { total: number, ventas: number,}[];
  label?: string | number;
};

