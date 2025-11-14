import { Header } from "../components/Header";
import { Filters } from "../components/Filters";
import { ProductsTable } from "../components/ProductsTable";
import { Cart } from "../components/Cart";
import { SearchBar } from "../components/SearchBar";

export function Home () {
  return (
    <div className='font-display bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark'>
      <div className="flex flex-col h-screen w-full">
        <Header/>
        <main className="grid grid-rows-[100px, 1fr ] grid-cols-[240px_minmax(700px,1fr)_240px] gap-4 px-4 w-full place-content-center">
          <div className="flex row-start-1 row-end-1 col-start-2 col-end-3 justify-center">
            <SearchBar></SearchBar>
          </div>
          <div className="row-start-2 row-end-2">
          <Filters></Filters>
          </div>
          <div className="row-start-2 row-end-2">
          <ProductsTable/>
          </div>
          <div className="row-start-2 row-end-2">
          <Cart></Cart>
          </div>
          

        </main>
      </div>
    </div>

  )

}