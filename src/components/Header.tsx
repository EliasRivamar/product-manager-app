import { Button } from "./Button";
import { SearchBar } from "./SearchBar";

export function Header () {
  return (
    <>
      <header className="flex flex-row place-items-center px-6 w-full h-16 bg-surface-light dark:bg-surface-dark mb-10 border-b border-b-bor-light dark:border-b-bor-dark">
        <div className="flex gap-10">
          <h1 className="text-base ">Mi Kisco</h1>
            <nav className="flex gap-4">
              <a href="">Productos</a>
              <a href="">Analiticas</a>
            </nav>
        </div>
          <div className='flex ml-60'>
            <SearchBar/>

          </div>
          <div className="flex ml-auto">
            <Button>+ Añadir Producto</Button>
          </div>
      </header>
      </>
  )
}