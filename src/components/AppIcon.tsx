type AppIconName = 'calendar' | 'check' | 'clock' | 'google' | 'instagram' | 'lock' | 'mail' | 'phone' | 'pin'

export function AppIcon({ name, size = 22 }: { name: AppIconName; size?: number }) {
  if (name === 'google') return <svg className="app-icon" width={size} height={size} viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285f4" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.9h5.4a4.6 4.6 0 0 1-2 3v2.5h3.3c1.9-1.8 2.9-4.4 2.9-7.4Z"/><path fill="#34a853" d="M12 22c2.7 0 5-.9 6.7-2.4l-3.3-2.5c-.9.6-2.1 1-3.4 1a5.9 5.9 0 0 1-5.6-4.1H3v2.6A10 10 0 0 0 12 22Z"/><path fill="#fbbc05" d="M6.4 14a6 6 0 0 1 0-3.9V7.5H3a10 10 0 0 0 0 9.1L6.4 14Z"/><path fill="#ea4335" d="M12 6c1.5 0 2.8.5 3.9 1.5l2.9-2.8A9.7 9.7 0 0 0 3 7.5l3.4 2.6A5.9 5.9 0 0 1 12 6Z"/></svg>
  const paths: Record<Exclude<AppIconName, 'google'>, React.ReactNode> = {
    mail: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></>,
    phone: <path d="M7.2 3.5 10 7.2 8.3 9.3c1.1 2.3 3 4.2 5.4 5.4l2.1-1.7 3.7 2.8-.8 3.8c-.2.8-1 1.4-1.8 1.4C9.2 20.4 3.6 14.8 3 7.1c0-.8.6-1.6 1.4-1.8l2.8-.8Z"/>,
    calendar: <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4M17 3v4M3 10h18M7 14h2M12 14h2M17 14h.1M7 18h2M12 18h2"/></>,
    pin: <><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/></>,
    lock: <><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/></>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v6l4 2"/></>,
    check: <path d="m5 12 4 4L19 6"/>,
  }
  return <svg className="app-icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}
