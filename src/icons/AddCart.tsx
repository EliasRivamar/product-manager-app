import CirclePlus from '../assets/plus.svg?react'

export function AddToCartIcon ({className = 'stroke-primary'}:{className: string}) {
  return (
    <CirclePlus className={className}/>
  )
}