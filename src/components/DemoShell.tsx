import type { ReactNode } from 'react'

type DemoShellProps = {
  children: ReactNode
  notice?: ReactNode
}

export function DemoShell({ children, notice }: DemoShellProps) {
  return (
    <div className="demo-shell">
      <div className="demo-shell__atmosphere" aria-hidden="true" />
      <div className="demo-shell__stage">{children}</div>
      {notice}
    </div>
  )
}
