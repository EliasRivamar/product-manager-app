import { useContext, useMemo } from 'react'
import { type Producto } from '../types/types'
import { FiltersContext } from '../context/filters'

export const useFilters = (products: Producto[] = []) => {
  const context = useContext(FiltersContext)
  if (!context) {
    throw new Error("useFilters must be used within a FiltersProvider");
  }

  const { filters, setFilters } = context

  const filteredProducts = useMemo(() => {
    console.log("Filtrando productos...")

    return products.filter((product) => {
      if (filters.stock === 'all') return true
      if (filters.stock === 'yes-stock') return product.stock > 0
      if (filters.stock === 'no-stock') return product.stock === 0
    })

  }, [products, filters])

  return { filters, filteredProducts, setFilters }
}
