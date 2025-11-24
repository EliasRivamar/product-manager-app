import { useToast } from "../../hooks/useToast";
import type { Producto } from "../../types/types";
import { useProduct } from "../../hooks/useProduct";

export function CartDelete({ producto, setProductToDelete }: { producto: Producto, setProductToDelete: (p: Producto | null) => void }) {
  const {setProductos, deleteProduct, getAll} = useProduct()
  const { showToast } = useToast();

  async function handleDelete(producto: Producto, setProductos: (p: Producto[]) => void) {
    await deleteProduct(producto.id)
    const nuevos = await getAll()
    // ACTUALIZAR LISTA
    setProductToDelete(null)
    setProductos(nuevos)
      showToast(`Producto "${producto.name}" eliminado correctamente`, "success");
  }

  return (
    <>
      <div className={` p-6 max-w-[30%] rounded-xl border border-bor-light dark:border-bor-dark bg-surface-light dark:bg-surface-dark min-h-[300px] overflow-y-auto `}>
        <h1 className="text-text-primary-light dark:text-text-primary-dark text-4xl font-bold tracking-tighter text-center mb-6">Eliminar Producto</h1>
        <p className="text-text-secondary-light dark:text-text-secondary-dark text-md font-normal leading-normal w-full text-center"> Esta acción no se puede deshacer. El producto será eliminado permanentemente.</p>
        <div className="w-full mt-6 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 p-4 text-left">
          <div className="flex justify-between gap-x-6 py-2">
            <p className="text-[#8a6060] dark:text-gray-500 text-sm font-normal leading-normal">Nombre</p>
            <p className="text-[#181111] dark:text-gray-200 text-sm font-medium leading-normal text-right">{producto.name}</p>
          </div>
          <div className="flex justify-between gap-x-6 py-2 border-t border-gray-200 dark:border-gray-700">
            <p className="text-[#8a6060] dark:text-gray-500 text-sm font-normal leading-normal">Precio</p>
            <p className="text-[#181111] dark:text-gray-200 text-sm font-medium leading-normal text-right">${producto.price}</p>
          </div>
          <div className="flex justify-between gap-x-6 py-2 border-t border-gray-200 dark:border-gray-700">
            <p className="text-[#8a6060] dark:text-gray-500 text-sm font-normal leading-normal">Stock</p>
            <p className="text-[#181111] dark:text-gray-200 text-sm font-medium leading-normal text-right">{producto.stock} unidades</p>
          </div>
        </div>
        <div>
            <div className='flex gap-10 place-items-center mt-5 justify-center'>
              <button className='min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-gray-200/80 dark:bg-white/10 text-text-primary-light dark:text-text-primary-dark text-base font-semibold leading-normal tracking-[-0.01em] hover:bg-gray-300/80 dark:hover:bg-white/20 active:bg-gray-400/80 dark:active:bg-white/30 hover:scale-105 duration-300 transition-all'
                onClick={() => setProductToDelete(null)}>Cancelar</button>
              <button className="min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 text-danger bg-danger/10 hover:bg-danger/20 dark:bg-danger/20 dark:hover:bg-danger/30 text-base font-semibold leading-normal tracking-[-0.01em] hover:scale-105 duration-300" onClick={() => handleDelete(producto, setProductos)}>Eliminar</button>
            </div>
          </div>
      </div>

    </>
  )
}