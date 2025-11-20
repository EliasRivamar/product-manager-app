import Setting from '../assets/settings.svg?react'


export function SettingIcon({isActive}: {isActive: boolean}) {
  return (
    <Setting  className={`${isActive ? 'stroke-primary' : 'stroke-text-secondary-light dark:stroke-text-secondary-dark group-hover:stroke-primary'}`} />
  )
}
