import Home from '../assets/home.svg?react'


export function HomeIcon({isActive}: {isActive: boolean}) {
  return (
    <Home  className={`${isActive ? 'stroke-primary' : 'stroke-text-secondary-light dark:stroke-text-secondary-dark group-hover:stroke-primary'}`}/>
  )
}
