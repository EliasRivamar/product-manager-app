import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { CartProvider } from './context/cart.tsx'
import { FiltersProvider } from './context/filters.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <FiltersProvider>
      <CartProvider>
        <BrowserRouter>
        <App />
        </BrowserRouter>
      </CartProvider>
    </FiltersProvider>
  </StrictMode>,
)
