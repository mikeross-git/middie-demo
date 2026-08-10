type AppIconName = 'calendar' | 'check' | 'clock' | 'crown' | 'dashboard' | 'facebook' | 'feedback' | 'google' | 'heart' | 'instagram' | 'key' | 'lock' | 'mail' | 'password' | 'phone' | 'pin' | 'play' | 'school' | 'shield' | 'user' | 'video'

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
    school: <><path d="m3 9 9-5 9 5-9 5-9-5Z"/><path d="M7 12v4c3 2 7 2 10 0v-4M21 9v6"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21c.7-4.2 3.4-6.3 8-6.3s7.3 2.1 8 6.3"/></>,
    key: <><circle cx="8" cy="15" r="4"/><path d="m11 12 8-8M16 7l2 2M14 9l2 2"/></>,
    password: <><rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="8" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="16" cy="12" r="1" fill="currentColor"/></>,
    shield: <><path d="M12 3 20 6v5c0 5-3.4 8.3-8 10-4.6-1.7-8-5-8-10V6l8-3Z"/><path d="m9 12 2 2 4-5"/></>,
    facebook: <path d="M14 21v-8h3l.5-3H14V8.5c0-1 .3-1.5 1.7-1.5H18V4.3c-.7-.1-1.6-.3-2.8-.3-2.8 0-4.7 1.7-4.7 4.8V10H8v3h2.5v8"/>,
    crown: <><path d="m3 7 4 4 5-7 5 7 4-4-2 11H5L3 7Z"/><path d="M6 21h12"/></>,
    feedback: <><path d="M4 4h16v13H9l-5 4V4Z"/><path d="M8 9h8M8 13h5"/></>,
    video: <><rect x="3" y="5" width="14" height="14" rx="2"/><path d="m17 10 4-3v10l-4-3"/></>,
    heart: <path d="M20.8 5.7a5.2 5.2 0 0 0-7.4 0L12 7.1l-1.4-1.4a5.2 5.2 0 1 0-7.4 7.4L12 21l8.8-7.9a5.2 5.2 0 0 0 0-7.4Z"/>,
    play: <><circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4V8Z"/></>,
    dashboard: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
  }
  return <svg className="app-icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}
