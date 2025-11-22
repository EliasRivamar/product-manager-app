import { Filters } from "../components/Filters";
import { ProductsTable } from "../components/Home/ProductsTable";
import { Cart } from "../components/Home/Cart";
import { SearchBar } from "../components/SearchBar";
import { useState, useEffect } from "react";
import type { Producto } from "../types/types";
import { useFilters } from "../hooks/useFilters";
import debounce from "just-debounce-it";
import { productRepository } from "../db/productRepository";
import { initDatabase } from "../db/init";




export function Home() {
  const [productos, setProductos] = useState<Producto[]>([])
  const [searchValue, setSearchValue] = useState('')
  const { filteredProducts } = useFilters(productos)
  const [focusedPanel, setFocusedPanel] = useState<"products" | "cart">("products");


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
  }

  // TODO: DEBOUNCE AL BUSCAR
  useEffect(() => {
    initDatabase().then(() => {
      console.log("DB lista");
      productRepository.getAll().then(setProductos);
    });
  }, []);

  const productosFiltrados = searchValue === ''
    ? filteredProducts
    : filteredProducts.filter(job => {
      return job.name.toLowerCase().includes(searchValue.toLowerCase())
    })

  return (
    <div className='font-display bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark'>
      <div className="flex flex-col h-full w-full">
        <main className="grid grid-rows-[100px, 1fr ] grid-cols-[200px_minmax(700px,1fr)_320px] gap-4 px-4 w-full place-content-center">
          <div className="flex row-start-1 row-end-1 col-start-2 col-end-3 justify-center">
            <SearchBar onChange={handleChange}></SearchBar>
          </div>
          <div className="row-start-2 row-end-2">
            <Filters ></Filters>
          </div>
          <div className="row-start-2 row-end-2">
            <ProductsTable productos={productosFiltrados} focusedPanel={focusedPanel} setFocusedPanel={setFocusedPanel} />
          </div>
          <div className="row-start-2 row-end-2">
            <Cart focusedPanel={focusedPanel} setFocusedPanel={setFocusedPanel} setProductos={setProductos}></Cart>
          </div>
        </main>
      </div>
    </div>

  )

}