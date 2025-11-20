import { AddToCartIcon } from "../icons/AddCart";

export function AddProduct() {
  return (
    <button className='flex bg-primary px-4 py-4'>
      <span><AddToCartIcon/> Añadir Producto</span>
    </button>
  )
}