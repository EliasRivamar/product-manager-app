import { CategoryEditIcon } from "../../icons/CategoryEdit";

export function Category() {
  return (
    <div className='flex flex-col gap-6 p-6 bg-surface-light dark:bg-surface-dark rounded-xl border border-bor-light dark:border-bor-dark'>
      <header className='flex gap-3 place-items-center'>
        <div className="flex justify-center place-items-center bg-orange-600/20 p-2 rounded">
          <CategoryEditIcon />
        </div>
        <p className="text-text-primary-light dark:text-text-primary-dark text-lg font-bold leading-tight">Gestión de Categorías</p>
      </header>
      <div className='flex justify-center flex-col'>
        <p className='text-text-secondary-light dark:text-text-secondary-dark mb-4 text-sm'>Crea, renombra y organiza las categorías de tus productos para una mejor gestión.</p>
        <button className="px-5 py-2.5 bg-primary text-text-primary-dark text-base font-semibold rounded-lg hover:bg-primary/90 transition-colors cursor-pointer">Administrar Categorías</button>
      </div>
    </div>
  )
}