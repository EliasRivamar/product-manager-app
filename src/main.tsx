import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CartProvider } from './context/cart.tsx'
import { FiltersProvider } from './context/filters.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ToastProvider } from './context/toast.tsx'
import { SalesProvider } from './context/sales.tsx'
import { SettingsProvider } from './context/settings.tsx'
import { ProductsProvider } from './context/products.tsx'

createRoot(document.getElementById('root')!).render(
  <SettingsProvider>
    <ProductsProvider>
      <SalesProvider>
        <FiltersProvider>
          <CartProvider>
            <ToastProvider>
              <BrowserRouter>
                <StrictMode>
                  <App />
                </StrictMode>
              </BrowserRouter>
            </ToastProvider>
          </CartProvider>
        </FiltersProvider>
      </SalesProvider>
    </ProductsProvider>
  </SettingsProvider>
)
