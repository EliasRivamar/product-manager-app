import { productRepository } from "../db/productRepository";
import type { Producto } from "../types/types";

export function CartDelete({producto, setProductos, setProductToDelete}: {producto: Producto, setProductos: (p: Producto[]) => void, setProductToDelete: (p: Producto | null) => void}) {

  async function handleDelete (producto: Producto, setProductos: (p: Producto[])=> void) {
    await productRepository.delete(producto.id)
        const nuevos = await productRepository.getAll()
        // ACTUALIZAR LISTA
        setProductos(nuevos)
  }

  return (
    <>
    <div className={` p-8 min-w-[30%] rounded-xl border border-bor-light dark:border-bor-dark bg-surface-light dark:bg-surface-dark min-h-[300px] overflow-y-auto `}>
      <h1 className="text-text-primary-light dark:text-text-primary-dark text-4xl font-bold tracking-tighter text-center mb-6">Eliminar Producto</h1>
      <div className="flex place-items-start flex-col gap-2">
      <h2 className="text-text-primary-light dark:text-text-primary-dark text-2xl font-bold tracking-tighter text-center">{producto.name}</h2>
      <p className="text-text-primary-light dark:text-text-primary-dark">Codigo: ${producto.id}</p>
      <p className='text-text-primary-light dark:text-text-primary-dark'>Precio: ${producto.price}</p>
      </div>
      <hr className="border-bor-light dark:border-bor-dark my-4" />
      <p className='text-center '>¿Desea Eliminarlo?</p>
      <div>
        <div className='flex gap-10 place-items-center mt-5 justify-center'>
          <button className="px-3 py-2 rounded text-xl text-success bg-danger/10 hover:bg-success/20 dark:bg-success/20 dark:hover:bg-success/30 hover:scale-105 duration-300 cursor-pointer" onClick={() => handleDelete(producto, setProductos)}>Si</button>
          <button className=" px-3 py-2 rounded text-xl text-danger bg-danger/10 hover:bg-danger/20 dark:bg-danger/20 dark:hover:bg-danger/30 hover:scale-105 duration-300 cursor-pointer"
          onClick={ () => setProductToDelete(null)}>No</button>

        </div>
      </div>
    </div>
    </>
  )
}