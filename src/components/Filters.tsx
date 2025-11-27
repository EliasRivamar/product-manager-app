import { useFilters } from "../hooks/useFilters";
import type { Producto } from "../types/types";
import { Checkbox } from "./CheckBox";



export function Filters() {
  const { filters, setFilters } = useFilters()

  const handleFilters = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as "all" | "yes-stock" | "no-stock"
    console.log("Valor de los check", value)
    setFilters(prev => ({ ...prev, stock: value }))
  }

  return (
    <div className='min-w-[15%] flex flex-col gap-6 p-6 bg-surface-light dark:bg-surface-dark rounded-xl border border-bor-light dark:border-bor-dark max-h-[530px]'>
      <h2 className="text-lg font-bold">Filtros</h2>
      <div>
        <h3 className='font-semibold text-sm mb-3'>Estado</h3>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <Checkbox checked={filters.stock === "all"} onChange={handleFilters} value={'all'}></Checkbox>
            <span className="text-sm">Todos</span>
          </label>
          <label className="flex items-center gap-2">
            <Checkbox checked={filters.stock === "yes-stock"} onChange={handleFilters} value={'yes-stock'}></Checkbox>
            <span className="text-sm">En Stock</span>
          </label>
          <label className="flex items-center gap-2">
            <Checkbox checked={filters.stock === "no-stock"} onChange={handleFilters} value={'no-stock'}></Checkbox>
            <span className="text-sm">Sin Stock</span>
          </label>
        </div>
      </div>
      <hr className="border-bor-light dark:border-bor-dark" />
      <div>
        <div className="flex flex-col gap-2">
          <h3 className='font-semibold text-sm mb-3'>Categorias</h3>
          
        </div>
        {/* 
          
          <label className="flex items-center gap-2">
            <Checkbox onChange={handleFilters} value={'categoria-2'}></Checkbox>
            <span className="text-sm">Categoria 2</span>
          </label>
        </div> */}
      </div>
    </div>
  )
}