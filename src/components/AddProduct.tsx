import { AddToCartIcon } from "../icons/AddCart";

export function AddProduct({onClick}:{onClick: () => void}) {
  return (
    <button className="flex w-full bg-primary rounded-lg text-text-primary-dark hover:bg-[#0165d1] text-sm hover:scale-105 duration-300
    py-3 px-3 cursor-pointer"
    onClick={onClick}
    >
      <span className='flex place-items-center justify-center gap-3'><AddToCartIcon className={"stroke-white"}/> Añadir Producto</span>
    </button>
  )
}