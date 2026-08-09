import type { ReactNode } from 'react'

type AppHeaderProps = {
  leading?: ReactNode
  title: ReactNode
  trailing?: ReactNode
}

export function AppHeader({ leading, title, trailing }: AppHeaderProps) {
  return (
    <header className="app-header">
      <div className="app-header__side">{leading}</div>
      <div className="app-header__title">{title}</div>
      <div className="app-header__side app-header__side--end">{trailing}</div>
    </header>
  )
}
