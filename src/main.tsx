import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CartProvider } from './context/cart.tsx'
import { FiltersProvider } from './context/filters.tsx'
import { BrowserRouter } from 'react-router-dom'
import { ToastProvider } from './context/toast.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FiltersProvider>
      <CartProvider>
      <ToastProvider>
        <BrowserRouter>
        <App />
        </BrowserRouter>
        </ToastProvider>
      </CartProvider>
    </FiltersProvider>
  </StrictMode>,
)
