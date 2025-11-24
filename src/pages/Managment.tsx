import { Filters } from "../components/Filters";
import { ProductsTableMagment } from "../components/ProductsTableMagment";
import { SearchBar } from "../components/SearchBar";
import { useState, useEffect } from "react";
import { useFilters } from "../hooks/useFilters";
import debounce from "just-debounce-it";

import { AddProduct } from "../components/AddProduct";
import { CartAdd } from "../components/Cards/CardAdd";
import { useProduct } from "../hooks/useProduct";


export function Managment() {
  const {productos} = useProduct()
  const [searchValue, setSearchValue] = useState('')
  const [addProduct, setAddProduct] = useState<boolean>(false)
  const {filteredProducts } = useFilters(productos)
  const [focusedPanel, setFocusedPanel] = useState<"productsControl">("productsControl");


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
  }

  const handleAddProduct = () => {
    setAddProduct(true)
  }

  const productosFiltrados = searchValue === ''
    ? filteredProducts
    : filteredProducts.filter(job => {
      return job.name.toLowerCase().includes(searchValue.toLowerCase())
    })

  return (
    <div className=' mt-6 font-display bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark'>
      <div className="flex flex-col h-full w-full">
        {addProduct && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <CartAdd productos={productos} setAddProduct={setAddProduct} />
          </div>
        )}
        <main className="grid grid-rows-[100px, 1fr] grid-cols-[200px_minmax(700px,1fr)] gap-4 px-4 w-full place-content-center">
          <div className="flex row-start-1 row-end-1 col-start-2 col-end-3 justify-center">
            <SearchBar onChange={handleChange}></SearchBar>
          </div>
          <div className='row-start-1 row-end-1 col-start-1 col-end-1 place-items-center justify-center'>
            <AddProduct onClick={handleAddProduct} />
          </div>
          <div className="row-start-2 row-end-2">
            <Filters ></Filters>
          </div>
          <div className="row-start-2 row-end-2">
            <ProductsTableMagment productos={productosFiltrados} focusedPanel={focusedPanel} setFocusedPanel={setFocusedPanel} addProduct={addProduct} />
          </div>
        </main>
      </div>
    </div>

  )

}