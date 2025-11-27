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

export type ProductContextType = {
  productos: Producto[]
  setProductos: React.Dispatch<React.SetStateAction<Producto[]>>
  addProduct: (product: Producto) => void
  updateProduct: (id: string, update: Partial<Producto>) => Promise<void>
  deleteProduct: (id: string) => Promise<void>
  resetProduct: (product: Producto) => void
  getAll: () => Promise<Producto[]>
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

export interface FiltersState {
  stock: 'all' | 'yes-stock' | 'no-stock'
}

export interface FiltersContextType {
  filters: FiltersState
  setFilters: React.Dispatch<React.SetStateAction<FiltersState>>
}
export interface SaleContextType {
  sales: Sale[]
  addSale: (s: Sale) => void
  setSales: React.Dispatch<React.SetStateAction<Sale[]>>
}

export interface Sale {
  id: string;
  date: number; // YYYY-MM-DD
  total: number;
  items: any[];
}

export type CartContextType = {
  cart: CartState
  addToCart: (product: Producto) => void
  removeFromCart: (product: Producto) => void
  clearCart: () => void
  restQuantity: (product: Producto) => void
  updateQuantity: (product: Producto, quantity: number) => void
}

export type CustomTooltipProps = {
  active?: boolean;
  payload?: {
    [x: string]: { total: any; ventas: any }
}[];
  label?: string | number;
  separator?: 'Coma (,)' | 'Punto (.)';
};

export type SettingsState = {
  theme: 'dark' | "light";
  lowStock: boolean;
  lowStockValue: number;
  roundingEnabled: boolean;
  roundingMode: "up" | "down" | "nearest" | null;
  language: string;
  automaticBackup: 'Nunca' | 'Diario' | 'Semanal'  | 'Mensual';
  lastBackup: number | null;
  currency: 'ARS' | 'USD' | 'EUR';
  separator: 'Coma (,)' | 'Punto (.)';
  password: boolean;
  passwordValue: string | null;
};

export interface SettingsContextType {
  settings: SettingsState;
  updateSetting: <K extends keyof SettingsState>(key: K, value: SettingsState[K]) => void;
  resetSettings: (settings: SettingsState) => void
}
