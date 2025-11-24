import Dark from '../assets/dark.svg?react'


export function DarkIcon({theme}:{theme: 'dark' | 'light'}) {
  return (
    <Dark className={`${theme==='dark' ? 'stroke-primary' : 'stroke-text-secondary-light dark:stroke-text-secondary-dark'} `}/>
  )
}
