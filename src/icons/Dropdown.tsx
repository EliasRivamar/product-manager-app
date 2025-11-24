import DropDown from '../assets/dropdown.svg?react'


export function DropDownIcon({isActive}:{isActive:boolean}) {
  return (
    <DropDown className={`stroke-text-primary-light dark:stroke-text-primary-dark
      ${isActive ?'rotate-180' : '' }`}/>
  )
}
