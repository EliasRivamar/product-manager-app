import { Header } from "../components/Header";
import { Filters } from "../components/Filters";
import { ProductsTable } from "../components/ProductsTable";
import { Cart } from "../components/Cart";
import { SearchBar } from "../components/SearchBar";
import { useState, useEffect, useMemo } from "react";
import Papa from 'papaparse'
import type { Producto } from "../types/types";
import { useFilters } from "../hooks/useFilters";
import debounce from "just-debounce-it";


export function Home() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [searchValue, setSearchValue] = useState('')
  const { filteredProducts } = useFilters(productos)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
  }

  // TODO: DEBOUNCE AL BUSCAR

  useEffect(() => {
    Papa.parse("/productos.csv", {
      download: true,
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (result) => {
        setProductos(result.data as Producto[])

      },
    })
  }, [])

  const productosFiltrados = searchValue === ''
    ? filteredProducts
    : filteredProducts.filter(job => {
      return job.name.toLowerCase().includes(searchValue.toLowerCase())
    })

  return (
    <div className='font-display bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark'>
      <div className="flex flex-col h-screen w-full">
        <Header />
        <main className="grid grid-rows-[100px, 1fr ] grid-cols-[200px_minmax(700px,1fr)_320px] gap-4 px-4 w-full place-content-center">
          <div className="flex row-start-1 row-end-1 col-start-2 col-end-3 justify-center">
            <SearchBar onChange={handleChange}></SearchBar>
          </div>
          <div className="row-start-2 row-end-2">
            <Filters></Filters>
          </div>
          <div className="row-start-2 row-end-2">
            <ProductsTable productos={productosFiltrados} />
          </div>
          <div className="row-start-2 row-end-2">
            <Cart></Cart>
          </div>


        </main>
      </div>
    </div>

  )

}