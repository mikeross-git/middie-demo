export function MiddieLogo({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? 'middie-logo middie-logo--compact' : 'middie-logo'}>
      MIDDIE
    </div>
  )
}
