import { useState } from "react";
import { CleanIcon } from "../../icons/Clean";
import { ButtonRightIcon } from "../../icons/ButtonRight";
import { resetTotal } from "../../settingsActions/deleteAll";
import { deleteOnlySales } from "../../settingsActions/deleteSales";
import { optimizeDatabase } from "../../settingsActions/optimize";
import { useToast } from "../../hooks/useToast";
import { useSettings } from "../../hooks/useSettings";
import { useSale } from "../../hooks/useSale";
import { useProduct } from "../../hooks/useProduct";

export function Clean() {
  const [deleteAll, setDeleteAll] = useState(false)
  const [optimize, setOptimize] = useState(false)
  const [deleteSales, setDeleteSales] = useState(false)
  const { showToast } = useToast()
  const { sales, setSales } = useSale()
  const { productos, setProductos } = useProduct()
  const { resetSettings } = useSettings()
  return (
    <div className='flex flex-col gap-6 p-6 bg-surface-light dark:bg-surface-dark rounded-xl border border-bor-light dark:border-bor-dark'>
      <header className='flex gap-3 place-items-center'>
        <div className="flex justify-center place-items-center bg-text-secondary-light/20 p-2 rounded">
          <CleanIcon />
        </div>
        <p className="text-text-primary-light dark:text-text-primary-dark text-lg font-bold leading-tight">Respaldos / Backup</p>
      </header>
      <button className=" flex justify-between text-text-light dark:text-text-dark text-base font-medium hover:bg-background-light hover:dark:bg-background-dark p-2 rounded cursor-pointer"
        onClick={() => setOptimize(true)}>
        Optimizar base datos <span><ButtonRightIcon /></span>
      </button>


      {(optimize) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={` p-6 min-w-[10%] rounded-xl border border-bor-light dark:border-bor-dark bg-surface-light dark:bg-surface-dark min-h-[100px] overflow-y-auto justify-center place-items-center `}>
            <h1 className="text-text-primary-light dark:text-text-primary-dark text-4xl font-bold tracking-tighter text-center mb-6">Optimizacion</h1>
            <p className="text-text-primary-light dark:text-text-primary-dark text-sm font-normal leading-normal mb-5">Se borraran productos con stock negativo, compras sin productos, etc.</p>

            <p className="text-text-primary-light dark:text-text-primary-dark text-sm font-normal leading-normal mb-5">¿Desea continuar?</p>
            <div className='flex mt-5 gap-10 place-items-center justify-center'>
              <button className='min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-gray-200/80 dark:bg-white/10 text-text-primary-light dark:text-text-primary-dark text-base font-semibold leading-normal tracking-[-0.01em] hover:bg-gray-300/80 dark:hover:bg-white/20 active:bg-gray-400/80 dark:active:bg-white/30 hover:scale-105 duration-300 transition-all' onClick={() => { setOptimize(false); }}>Cancelar</button>
              <button type='submit' className="min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-semibold leading-normal tracking-[-0.01em] hover:bg-[#0165d1] active:bg-primary/80 hover:scale-105 duration-300 transition-all" onClick={() => { setOptimize(false); optimizeDatabase(productos, setProductos, sales, setSales); showToast(`Base de datos optimizada.`, 'success') }}>Aceptar</button>
            </div>
          </div>
        </div>
      )}

      <button className=" flex justify-between text-danger text-base font-medium hover:bg-danger/20 p-2 rounded cursor-pointer" onClick={() => setDeleteSales(true)}>
        Borrar solo ventas <span><ButtonRightIcon /></span>
      </button>

      {(deleteSales) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={` p-6 min-w-[10%] rounded-xl border border-bor-light dark:border-bor-dark bg-surface-light dark:bg-surface-dark min-h-[100px] overflow-y-auto justify-center place-items-center `}>
            <h1 className="text-danger text-4xl font-bold tracking-tighter text-center mb-6">Precaución</h1>
            <p className="text-danger text-sm font-normal leading-normal mb-5">Se borrarán TODAS las ventas registradas. Esta acción es irreversible.</p>

            <p className="text-text-primary-light dark:text-text-primary-dark text-sm font-normal leading-normal mb-5">¿Desea continuar?</p>
            <div className='flex mt-5 gap-10 place-items-center justify-center'>
              <button className='min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-gray-200/80 dark:bg-white/10 text-text-primary-light dark:text-text-primary-dark text-base font-semibold leading-normal tracking-[-0.01em] hover:bg-gray-300/80 dark:hover:bg-white/20 active:bg-gray-400/80 dark:active:bg-white/30 hover:scale-105 duration-300 transition-all' onClick={() => { setDeleteSales(false); }}>Cancelar</button>
              <button type='submit' className="min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-semibold leading-normal tracking-[-0.01em] hover:bg-[#0165d1] active:bg-primary/80 hover:scale-105 duration-300 transition-all" onClick={() => { setDeleteSales(false); deleteOnlySales(setSales); showToast(`Se borraron todas las ventas correctamente.`, 'success') }}>Aceptar</button>
            </div>
          </div>
        </div>
      )}


      <button className=" flex justify-between text-danger text-base font-medium hover:bg-danger/20 p-2 rounded cursor-pointer" onClick={() => setDeleteAll(true)}>
        Reset total <span><ButtonRightIcon /></span>
      </button>

      {(deleteAll) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={` p-6 min-w-[10%] rounded-xl border border-bor-light dark:border-bor-dark bg-surface-light dark:bg-surface-dark min-h-[100px] overflow-y-auto justify-center place-items-center `}>
            <h1 className="text-danger text-4xl font-bold tracking-tighter text-center mb-6">Precaución</h1>
            <p className="text-danger text-sm font-normal leading-normal mb-5">Se borrarán productos, ventas y configuraciones. Esta acción NO se puede deshacer.</p>

            <p className="text-text-primary-light dark:text-text-primary-dark text-sm font-normal leading-normal mb-5">¿Desea continuar?</p>
            <div className='flex mt-5 gap-10 place-items-center justify-center'>
              <button className='min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-gray-200/80 dark:bg-white/10 text-text-primary-light dark:text-text-primary-dark text-base font-semibold leading-normal tracking-[-0.01em] hover:bg-gray-300/80 dark:hover:bg-white/20 active:bg-gray-400/80 dark:active:bg-white/30 hover:scale-105 duration-300 transition-all' onClick={() => { setDeleteAll(false); }}>Cancelar</button>
              <button type='submit' className="min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-semibold leading-normal tracking-[-0.01em] hover:bg-[#0165d1] active:bg-primary/80 hover:scale-105 duration-300 transition-all" onClick={() => { setDeleteAll(false); resetTotal(setSales, resetSettings, setProductos); showToast(`El sistema se a restablecido`, 'success') }}>Aceptar</button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}