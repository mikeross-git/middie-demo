import type { ReactNode } from 'react'

export function PhoneViewport({ children }: { children: ReactNode }) {
  return (
    <section className="phone-viewport" aria-label="Middie mobile app prototype">
      <div className="phone-viewport__sensor" aria-hidden="true" />
      <div className="phone-viewport__content">{children}</div>
    </section>
  )
}
