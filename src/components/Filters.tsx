export function Filters() {
  return (
    <div className='min-w-[20%] flex flex-col gap-6 p-6 bg-surface-light dark:bg-surface-dark rounded-xl border border-bor-light dark:border-bor-dark max-h-[540px]'>
      <h2 className="text-lg font-bold">Filtros</h2>
      <div>
        <h3 className='font-semibold text-sm mb-3'>Estado</h3>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              className="appearance-none h-4 w-4 rounded-full border border-bor-light dark:border-bor-dark bg-transparent checked:bg-primary focus:outline-none"
              type="checkbox" />
            <span className="text-sm">En Stock</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              className="appearance-none h-4 w-4 rounded-full border border-bor-light dark:border-bor-dark bg-transparent checked:bg-primary focus:outline-none"
              type="checkbox" />
            <span className="text-sm">Sin Stock</span>
          </label>
        </div>
      </div>
      <hr className="border-bor-light dark:border-bor-dark"/>
      <div>
      <h3 className='font-semibold text-sm mb-3'>Categorias</h3>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              className="appearance-none h-4 w-4 rounded-full border border-bor-light dark:border-bor-dark bg-transparent checked:bg-primary focus:outline-none"
              type="checkbox" />
            <span className="text-sm">Categoria 1</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              className="appearance-none h-4 w-4 rounded-full border border-bor-light dark:border-bor-dark bg-transparent checked:bg-primary focus:outline-none"
              type="checkbox" />
            <span className="text-sm">Categoria 2</span>
          </label>
        </div>

      </div>
    </div>
  )
}