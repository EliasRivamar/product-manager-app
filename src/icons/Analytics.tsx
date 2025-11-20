import Analytics from '../assets/analytics.svg?react'


export function AnalyticsIcon({isActive}:{isActive?: boolean}) {
  return (
    <Analytics  className={`${isActive ? 'stroke-primary' : 'stroke-text-secondary-light dark:stroke-text-secondary-dark group-hover:stroke-primary'}`} />
  )
}
