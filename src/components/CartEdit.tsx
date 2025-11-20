import { useState } from "react";
import { productRepository } from "../db/productRepository";
import type { Producto } from "../types/types";

export function CartEdit({ producto, setProductos, setProductToEdit }: { producto: Producto, setProductos: (p: Producto[]) => void, setProductToEdit: (p: Producto | null) => void }) {
  const [formValues, setFormValues] = useState({
    id: producto.id,
    name: producto.name,
    price: Number(producto.price),
    stock: Number(producto.stock),
    category: producto.category
  })

  async function handleEdit() {

    await productRepository.update(formValues.id, {
      name: formValues.name,
      price: Number(formValues.price),
      stock: Number(formValues.stock),
      category: formValues.category
    });

    const nuevos = await productRepository.getAll();
    setProductos(nuevos);
    setProductToEdit(null);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleEdit();
  };

  return (
    <>
      <div className={` p-8 min-w-[50%] rounded-xl border border-bor-light dark:border-bor-dark bg-surface-light dark:bg-surface-dark min-h-[300px] overflow-y-auto `}>
        <h1 className="text-text-primary-light dark:text-text-primary-dark text-4xl font-bold tracking-tighter text-center mb-6">Editar Producto</h1>
        <h2 className='text-text-primary-light dark:text-text-primary-dark text-4xl font-bold tracking-tighter mb-6'>{producto.name}</h2>
        <form className='grid grid-cols-[60px_2fr] gap-4' onSubmit={handleSubmit}>
          <label className='flex items-center text-text-secondary-light dark:text-text-secondary-dark text-base font-medium' htmlFor="product-codigo">
            Codigo
          </label>
          <input
            name="product-codigo"
            type='text' required
            value={formValues.id}
            onChange={(e) =>
              setFormValues({ ...formValues, id: e.target.value })
            }
            className=" grid-cols-[100px_1fr] form-input max-w-[600px] min-w-0 flex-1 resize-none overflow-hidden border  border-bor-light dark:border-bor-dark rounded-lg text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-0 bg-surface-light dark:bg-surface-dark h-full placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark px-2 py-3 text-sm font-normal"></input>
          <label className='flex items-center text-text-secondary-light dark:text-text-secondary-dark text-base font-medium' htmlFor="product-name">
            Nombre
          </label>
          <input
            name="product-name"
            type='text' required
            value={formValues.name}
            onChange={(e) =>
              setFormValues({ ...formValues, name: e.target.value })
            }
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden border  border-bor-light dark:border-bor-dark rounded-lg text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-0 bg-surface-light dark:bg-surface-dark h-full placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark px-2 py-3 text-sm font-normal"></input>
          <label className='flex items-center text-text-secondary-light dark:text-text-secondary-dark text-base font-medium' htmlFor="product-category">
            Nombre
          </label>
          <input
            name="product-category"
            type='text' required
            value={formValues.category}
            placeholder={producto.category}
            onChange={(e) =>
              setFormValues({ ...formValues, category: e.target.value })
            }
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden border  border-bor-light dark:border-bor-dark rounded-lg text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-0 bg-surface-light dark:bg-surface-dark h-full placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark px-2 py-3 text-sm font-normal"></input>
          <label className='flex items-center text-text-secondary-light dark:text-text-secondary-dark text-base font-medium' htmlFor="product-price">
            Precio
          </label>
          <input
            name="product-price"
            type='number' required
            value={formValues.price}
            onChange={(e) =>
              setFormValues({ ...formValues, price: Number(e.target.value) })
            }
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden border  border-bor-light dark:border-bor-dark rounded-lg text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-0 bg-surface-light dark:bg-surface-dark h-full placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark px-2 py-3 text-sm font-normal"></input>
          <label className='flex items-center text-text-secondary-light dark:text-text-secondary-dark text-base font-medium' htmlFor="product-stock">
            Stock
          </label>
          <input
            name="product-stock"
            type='number' required
            value={formValues.stock}
            onChange={(e) =>
              setFormValues({ ...formValues, stock: Number(e.target.value) })
            }
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden border  border-bor-light dark:border-bor-dark rounded-lg text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-0 bg-surface-light dark:bg-surface-dark h-full placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark px-2 py-3 text-sm font-normal"></input>
              <hr className="col-span-2 border-bor-light dark:border-bor-dark my-4" />
          <div className="col-span-2">
            <div className='flex flex-col place-items-center justify-center'>
              <p className='text-center text-text-primary-light dark:text-text-primary-dark text-xl font-bold tracking-tighter'>¿Confirmar?</p>
            </div>
            <div className='flex gap-10 place-items-center mt-5 justify-center'>
              <button type='submit' className="px-3 py-2 rounded text-xl text-success bg-danger/10 hover:bg-success/20 dark:bg-success/20 dark:hover:bg-success/30 hover:scale-105 duration-300 cursor-pointer">Si</button>
              <button type='button' className=" px-3 py-2 rounded text-xl text-danger bg-danger/10 hover:bg-danger/20 dark:bg-danger/20 dark:hover:bg-danger/30 hover:scale-105 duration-300 cursor-pointer"
                onClick={() => setProductToEdit(null)}>No</button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}