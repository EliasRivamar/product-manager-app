import Panel from '../assets/panel.svg?react'


export function PanelIcon({isActive}: {isActive?: boolean}) {
  return (
    <Panel className={`${isActive ? 'stroke-primary' : 'stroke-text-secondary-light dark:stroke-text-secondary-dark group-hover:stroke-primary'}`} />
  )
}
