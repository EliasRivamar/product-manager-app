import { useCart } from "../hooks/useCart"
import { Button } from "./Button"
import { QuantityInput } from "./QuantityInput"


export function Cart() {
  const { cart, clearCart, addToCart, removeFromCart, restQuantity } = useCart()
  const total = cart.reduce(
    (acc, item) => acc + item.producto.price * item.quantity,
    0
  )
  return (
    <div className='min-w-[22%] rounded-xl border border-bor-light dark:border-bor-dark bg-surface-light dark:bg-surface-dark min-h-[200px] max-h-[540px] p-4 overflow-y-auto'>
      <header className="flex justify-center items-center gap-7">
        <h2 className='text-xl font-bold'>Ticket</h2>
        <button className="flex items-center gap-3 px-3 py-2 rounded bg-danger/10 text-danger   hover:bg-danger/50 hover:text-danger hover:scale-105 text-sm duration-300" onClick={() => clearCart()}>Eliminar Ticket</button>
      </header>
      <hr className="border-bor-light dark:border-bor-dark my-4" />
      <ul className="gap-2">
        {
          cart.map((item) => {
            return <li key={item.producto.id} className='flex flex-col list-items gap-2'>
              <div className='flex gap-4'>
                <strong>{item.producto.name}</strong>
                <p>${item.producto.price}</p>
              </div>
              <footer className="flex gap-4 justify-center items-center">
                <button className={`flex h-7 w-7 items-center justify-center rounded-full border border-bor-light dark:border-bor-dark bg-surface-light dark:bg-surface-dark hover:bg-background-light dark:hover:bg-background-dark`} onClick={() => restQuantity(item.producto)}>-</button>
                <QuantityInput product={item.producto} quantity={item.quantity}></QuantityInput>
                <button className='flex h-7 w-7 items-center justify-center rounded-full border border-bor-light dark:border-bor-dark bg-surface-light dark:bg-surface-dark hover:bg-background-light dark:hover:bg-background-dark' onClick={() => addToCart(item.producto)}>+</button>
              </footer>
              <div className='flex justify-center items-center'>
                <button className="bg-danger rounded-lg text-text-primary-dark hover:bg-[#c2251d] text-sm hover:scale-105 duration-300
    py-2 px-3 cursor-pointer" onClick={() => removeFromCart(item.producto)}>Eliminar</button>
              </div>
              <hr className="border-bor-light dark:border-bor-dark my-4" />

            </li>

          })
        }
      </ul>
      <div className='border-t border-bor-light dark:border-bor-dark bg-surface-light dark:bg-surface-dark sticky -bottom-4 p-3'>
        <div className="text-center text-lg font-semibold mb-4">
          <p>Total: ${total.toFixed(2)}</p>
        </div>
        <footer className='flex justify-center items-center'>
          <Button>Generar Ticket</Button>
        </footer>
      </div>

    </div>
  )
}