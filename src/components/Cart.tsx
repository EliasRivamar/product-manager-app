import { useCart } from "../hooks/useCart"
import { EliminateIcon } from "../icons/Eliminate"
import { Button } from "./Button"
import { QuantityInput } from "./QuantityInput"


export function Cart() {
  const { cart, clearCart, addToCart, removeFromCart, restQuantity } = useCart()
  const total = cart.reduce(
    (acc, item) => acc + item.producto.price * item.quantity,
    0
  )

  const handleSubmitCart = () => {
    
  }
  return (
    <div className='min-w-[22%] rounded-xl border border-bor-light dark:border-bor-dark bg-surface-light dark:bg-surface-dark min-h-[200px] max-h-[540px] p-4 overflow-y-auto'>
      <header className="flex justify-center items-center gap-7">
        <h2 className='text-xl font-bold'>Ticket</h2>
        <button className="flex items-center gap-3 px-3 py-2 rounded text-danger bg-danger/10 hover:bg-danger/20 dark:bg-danger/20 dark:hover:bg-danger/30 hover:scale-105 text-sm duration-300" onClick={() => clearCart()}>Eliminar Ticket</button>
      </header>
      <hr className="border-bor-light dark:border-bor-dark my-4" />
      <ul className="gap-2">
        {
          cart.map((item) => {
            return <li key={item.producto.id} className='flex flex-col list-items gap-2'>
              <div className='flex items-center gap-4'>
                <div className='flex-1'>
                  <p className='font-semibold text-sm'>{item.producto.name}</p>
                  <p className='text-sm text-text-secondary-light dark:text-text-secondary-light'>${item.price}</p>
                </div>
                <div className="flex gap-3 items-center">
                  <button className={`flex h-7 w-7 items-center justify-center rounded-full border border-bor-light dark:border-bor-dark bg-surface-light dark:bg-surface-dark hover:bg-background-light dark:hover:bg-background-dark`} onClick={() => restQuantity(item.producto)}>-</button>
                  <QuantityInput product={item.producto} quantity={item.quantity}></QuantityInput>
                  <button className='flex h-7 w-7 items-center justify-center rounded-full border border-bor-light dark:border-bor-dark bg-surface-light dark:bg-surface-dark hover:bg-background-light dark:hover:bg-background-dark' onClick={() => addToCart(item.producto)}>+</button>
                </div>
                <div className=''>
                  <button className="bg-danger/10 hover:bg-danger/20 dark:bg-danger/20 dark:hover:bg-danger/30 rounded-lg  text-sm hover:scale-105 duration-300 py-1 px-1 cursor-pointer" onClick={() => removeFromCart(item.producto)}>
                    <span><EliminateIcon /></span>
                  </button>
                </div>
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
          {/* TODO: Cuando se haga click mandar el total a las analiticas, borrar el carrito y actualizar la planilla de productos con el nuevo stock */}
          <Button onClick={handleSubmitCart}>Generar Ticket</Button>
        </footer>
      </div>

    </div>
  )
}