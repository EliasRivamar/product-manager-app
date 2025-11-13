import { Header } from "../components/Header";
import { ProductsTable } from "../components/ProductsTable";

export function Home () {
  return (
    <div className='font-display bg-background-light dark:bg-background-dark text-text-primary-light dark:text-text-primary-dark'>
      <div className="flex flex-col h-screen w-full">
        <Header/>
        <main className="flex w-full place-content-center">
          <ProductsTable/>
          

        </main>
      </div>
    </div>

  )

}