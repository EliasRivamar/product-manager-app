import { useState } from "react";
import type { Producto } from "../../types/types";
import { useToast } from "../../hooks/useToast";
import { CustomSelect } from "../CustomSelect";
import { useProduct } from "../../hooks/useProduct";

export function CartEdit({ producto, setProductToEdit }: { producto: Producto, setProductToEdit: (p: Producto | null) => void }) {
  const {productos, setProductos, updateProduct, getAll} = useProduct()
  const { showToast } = useToast()
  const [formValues, setFormValues] = useState({
    id: producto.id,
    name: producto.name,
    price: String(producto.price),
    stock: String(producto.stock),
    category: producto.category
  })

  async function handleEdit() {
    const productoEditado: Producto = { id: formValues.id, name: formValues.name, price: Number(formValues.price), stock: Number(formValues.stock), category: formValues.category };
    const othersProducts = productos.filter(item => item !== producto)
    console.log(othersProducts.find(item => item.name.toLocaleLowerCase() === productoEditado.name.toLocaleLowerCase()))
    if (othersProducts.find(item => item.id.toLocaleLowerCase() === productoEditado.id.toLocaleLowerCase()) !== undefined) {
      showToast(`No se puede agregar el producto, porque ya existe un producto con este codigo.`, "error");
      return
    }
    if (othersProducts.find(item => item.name.toLocaleLowerCase() === productoEditado.name.toLocaleLowerCase()) !== undefined) {
      showToast(`No se puede agregar el producto, porque ya existe un producto con este nombre.`, "error");
      return
    }

    await updateProduct(formValues.id, {
      name: formValues.name,
      price: Number(formValues.price),
      stock: Number(formValues.stock),
      category: formValues.category
    });

    const nuevos = await getAll();
    setProductos(nuevos);
    setProductToEdit(null);
    showToast(`Producto "${producto.name}" editado correctamente`, "success");

  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await handleEdit();
  };

  return (
    <>
      <div className={` p-6 min-w-[50%] rounded-xl border border-bor-light dark:border-bor-dark bg-surface-light dark:bg-surface-dark min-h-[300px] overflow-y-auto `}>
        <h1 className="text-text-primary-light dark:text-text-primary-dark text-4xl font-bold tracking-tighter text-center mb-6">Editar Producto</h1>
        <p className="text-text-secondary-light dark:text-text-secondary-dark text-md font-normal leading-normal w-full text-center">Modifica los datos del produto y guarda los cambios.</p>
        <form className='flex flex-col gap-6 p-6 sm:p-8' onSubmit={handleSubmit}>
          <div className='flex flex-col gap-2'>
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
              className=" grid-cols-[100px_1fr] form-input max-w-[600px] min-w-0 flex-1 resize-none overflow-hidden border  border-bor-light dark:border-bor-dark rounded-lg text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-0 bg-background-light dark:bg-background-dark h-full placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark px-2 py-3 text-sm font-normal"></input>
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
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden border  border-bor-light dark:border-bor-dark rounded-lg text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-0 bg-background-light dark:bg-background-dark h-full placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark px-2 py-3 text-sm font-normal"></input>
            <label className='flex items-center text-text-secondary-light dark:text-text-secondary-dark text-base font-medium' htmlFor="product-category">
              Categoría
            </label>
            <CustomSelect
              value={formValues.category}
              onChange={(value) =>
                setFormValues({ ...formValues, category: value })
              }
              options={Array.from(new Set(productos.map(p => p.category)))}
            />
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label className='flex items-center text-text-secondary-light dark:text-text-secondary-dark text-base font-medium' htmlFor="product-price">
                Precio
              </label>
              <input
                name="product-price"
                type='number' required
                min={0}
                value={formValues.price}
                onChange={(e) =>
                  setFormValues({ ...formValues, price: e.target.value })
                }
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden border  border-bor-light dark:border-bor-dark rounded-lg text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-0 bg-background-light dark:bg-background-dark h-full placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark px-2 py-3 text-sm font-normal"></input>
            </div>
            <div className="flex flex-col gap-2">
              <label className='flex items-center text-text-secondary-light dark:text-text-secondary-dark text-base font-medium' htmlFor="product-stock">
                Cantidad de Stock
              </label>
              <input
                name="product-stock"
                min={0}
                type='number' required
                value={formValues.stock}
                onChange={(e) =>
                  setFormValues({ ...formValues, stock: e.target.value })
                }
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden border  border-bor-light dark:border-bor-dark rounded-lg text-text-primary-light dark:text-text-primary-dark focus:outline-0 focus:ring-0 bg-background-light dark:bg-background-dark h-full placeholder:text-text-secondary-light dark:placeholder:text-text-secondary-dark px-2 py-3 text-sm font-normal"></input>
            </div>
          </div>
          <hr className="col-span-2 border-bor-light dark:border-bor-dark my-2" />
          <div className="col-span-2">
            <div className='flex flex-col place-items-center justify-center'>
            </div>
            <div className='flex gap-10 place-items-center justify-center'>
              <button type='button' className='min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-gray-200/80 dark:bg-white/10 text-text-primary-light dark:text-text-primary-dark text-base font-semibold leading-normal tracking-[-0.01em] hover:bg-gray-300/80 dark:hover:bg-white/20 active:bg-gray-400/80 dark:active:bg-white/30 hover:scale-105 duration-300 transition-all'
                onClick={() => setProductToEdit(null)}>Cancelar</button>
              <button type='submit' className="min-w-[84px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-white text-base font-semibold leading-normal tracking-[-0.01em] hover:bg-[#0165d1] active:bg-primary/80 hover:scale-105 duration-300 transition-all">Guardar</button>
            </div>
          </div>
        </form >
      </div >
    </>
  )
}