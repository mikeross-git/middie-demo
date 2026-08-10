import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { PrimaryButton, SecondaryButton } from './Buttons'
import { MiddieLogo } from './MiddieLogo'
import { AppIcon } from './AppIcon'

type SettingsPage = 'main' | 'signin' | 'matching' | 'video' | 'membership' | 'help'
type SimulatedAction = 'upgrade' | 'cancel' | 'delete' | 'signout' | null

function SettingsHeader({ onBack }: { onBack: () => void }) {
  return <header className="settings-header"><button className="nav-icon nav-icon--back" onClick={onBack} aria-label="Go back" /><MiddieLogo compact /><span /></header>
}

function SettingsTitle({ title, copy }: { title: string; copy: string }) {
  return <div className="settings-title"><h1>{title}</h1><span className="red-rule" /><p>{copy}</p></div>
}

function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (value: boolean) => void; label: string }) {
  return <button className={checked ? 'settings-toggle is-on' : 'settings-toggle'} role="switch" aria-checked={checked} aria-label={label} onClick={() => onChange(!checked)}><span /></button>
}

function SettingsRow({ icon, title, detail, onClick, trailing }: { icon: ReactNode; title: string; detail?: string; onClick?: () => void; trailing?: React.ReactNode }) {
  const content = <><span className="settings-row__icon">{icon}</span><span className="settings-row__copy"><strong>{title}</strong>{detail && <small>{detail}</small>}</span>{trailing ?? (onClick ? <span className="settings-row__chevron">›</span> : <span />)}</>
  return onClick ? <button className="settings-row" onClick={onClick}>{content}</button> : <div className="settings-row">{content}</div>
}

function SettingsMain({ open, close }: { open: (page: SettingsPage) => void; close: () => void }) {
  const items: { section: string; icon: ReactNode; title: string; detail: string; page: SettingsPage }[] = [
    { section: 'ACCOUNT', icon: <AppIcon name="key" />, title: 'Sign-in Preferences', detail: 'Email, phone, and connected accounts', page: 'signin' },
    { section: 'MATCHING', icon: <AppIcon name="heart" />, title: 'Match Settings', detail: 'Distance, gender preferences, and location', page: 'matching' },
    { section: 'PROFILE', icon: <AppIcon name="video" />, title: 'Record a New Video', detail: 'Update your 30-second introduction', page: 'video' },
    { section: 'MEMBERSHIP', icon: <AppIcon name="crown" />, title: 'Membership Status', detail: 'Standard plan', page: 'membership' },
    { section: '', icon: <span className="settings-question">?</span>, title: 'Help & Support', detail: 'FAQs, contact us, and resources', page: 'help' },
  ]
  return <div className="settings-screen"><SettingsHeader onBack={close} /><SettingsTitle title="Settings" copy="Manage your profile, preferences, and membership." /><div className="settings-directory">{items.map((item) => <div key={item.title}>{item.section && <p>{item.section}</p>}<SettingsRow icon={item.icon} title={item.title} detail={item.detail} onClick={() => open(item.page)} /></div>)}</div><p className="settings-signoff">BE REAL. BE YOU.<span />VERSION 1.2.0</p></div>
}

function SignInSettings({ back, act }: { back: () => void; act: (action: SimulatedAction) => void }) {
  const [twoFactor, setTwoFactor] = useState(false)
  return <div className="settings-screen"><SettingsHeader onBack={back} /><SettingsTitle title="Sign-in Preferences" copy="Manage how you sign in and secure your account." /><div className="settings-groups"><div><SettingsRow icon={<AppIcon name="mail" />} title="Email" detail="alex.demo@example.com" /><SettingsRow icon={<AppIcon name="phone" />} title="Phone Number" detail="(305) 555-0148" /></div><p>CONNECTED ACCOUNTS</p><div><SettingsRow icon={<AppIcon name="google" />} title="Google" detail="Connected" /><SettingsRow icon={<AppIcon name="facebook" />} title="Facebook" detail="Not connected" /><SettingsRow icon={<AppIcon name="password" />} title="Password" detail="Last updated 3 months ago" /><SettingsRow icon={<AppIcon name="shield" />} title="Two-Factor Authentication" detail={twoFactor ? 'Enabled' : 'Not enabled'} trailing={<Toggle checked={twoFactor} onChange={setTwoFactor} label="Two-factor authentication" />} /></div><div><SettingsRow icon={<AppIcon name="lock" />} title="Sign Out of All Devices" detail="This will sign you out everywhere" onClick={() => act('signout')} /></div></div><p className="settings-privacy">♢<span>Your sign-in details are kept<br />private and secure.</span></p></div>
}

function Segments<T extends string>({ options, value, onChange }: { options: readonly T[]; value: T; onChange: (value: T) => void }) {
  return <div className="settings-segments">{options.map((option) => <button className={option === value ? 'is-active' : ''} key={option} onClick={() => onChange(option)}>{option}</button>)}</div>
}

function MatchSettings({ back }: { back: () => void }) {
  const [zip, setZip] = useState('33139')
  const [distance, setDistance] = useState('25 mi')
  const [identity, setIdentity] = useState('Male')
  const [preference, setPreference] = useState('Female')
  const [minimumAge, setMinimumAge] = useState(27)
  const [maximumAge, setMaximumAge] = useState(35)
  const [paused, setPaused] = useState(false)
  const [saved, setSaved] = useState(false)
  const rangeStyle = {
    '--range-start': `${((minimumAge - 18) / 52) * 100}%`,
    '--range-end': `${((maximumAge - 18) / 52) * 100}%`,
  } as CSSProperties
  return <div className="settings-screen"><SettingsHeader onBack={back} /><SettingsTitle title="Match Settings" copy="Update who you see and where we look." /><div className="match-settings-form"><p>LOCATION</p><label className="settings-value-row"><span>ZIP Code</span><input value={zip} inputMode="numeric" maxLength={5} onChange={(event) => setZip(event.target.value.replace(/\D/g, ''))} /></label><div className="settings-control-card"><strong>Match Distance</strong><Segments options={['10 mi', '25 mi', '50 mi', '100 mi', 'No preference']} value={distance} onChange={setDistance} /></div><p>PROFILE</p><div className="settings-control-card settings-control-card--inline"><strong>I Am</strong><Segments options={['Male', 'Female']} value={identity} onChange={setIdentity} /></div><div className="settings-control-card settings-control-card--inline"><strong>Match Me With</strong><Segments options={['Male', 'Female', 'Male & Female']} value={preference} onChange={setPreference} /></div><div className="settings-control-card age-range-control"><div className="age-range-control__heading"><strong>Age Range</strong><span>{minimumAge} – {maximumAge === 70 ? '70+' : maximumAge}</span></div><div className="dual-range" style={rangeStyle}><span className="dual-range__track" /><input aria-label="Minimum match age" type="range" min="18" max="70" value={minimumAge} onChange={(event) => setMinimumAge(Math.min(Number(event.target.value), maximumAge - 1))} /><input aria-label="Maximum match age" type="range" min="18" max="70" value={maximumAge} onChange={(event) => setMaximumAge(Math.max(Number(event.target.value), minimumAge + 1))} /></div><div className="age-range-control__limits"><span>18</span><span>70+</span></div></div><p>DISCOVERY</p><SettingsRow icon="●" title="Profile Status" detail={paused ? 'Paused' : 'Active'} /><SettingsRow icon="Ⅱ" title="Pause Matching" trailing={<Toggle checked={paused} onChange={setPaused} label="Pause matching" />} /><PrimaryButton onClick={() => { setSaved(true); window.setTimeout(() => setSaved(false), 2200) }}>Save Changes</PrimaryButton></div>{saved && <div className="prototype-toast" role="status">Your match settings were updated for this demo.</div>}</div>
}

function NewVideoSettings({ back }: { back: () => void }) {
  const [state, setState] = useState<'current' | 'recording' | 'ready'>('current')
  const [seconds, setSeconds] = useState(3)
  useEffect(() => { if (state !== 'recording') return; const interval = window.setInterval(() => setSeconds((value) => Math.max(0, value - 1)), 1000); const done = window.setTimeout(() => setState('ready'), 3000); return () => { clearInterval(interval); clearTimeout(done) } }, [state])
  const record = () => { setSeconds(3); setState('recording') }
  return <div className="settings-screen"><SettingsHeader onBack={back} /><SettingsTitle title="Record a New Video" copy="Watch your current intro, then choose whether to replace it." /><div className="current-video"><span>{state === 'recording' ? `REC · 00:0${seconds}` : state === 'ready' ? 'New intro ready' : 'Current Intro · 0:27'}</span><div className="current-video__portrait"><i /><b /><em>{state === 'recording' ? '●' : state === 'ready' ? '✓' : '▶'}</em></div></div><p className="replace-note">Recording a new video will overwrite<br />your current intro.</p><div className="video-settings-actions"><div className="settings-info">ⓘ<span>You can record up to 30 seconds.</span></div>{state === 'ready' ? <><PrimaryButton onClick={() => setState('current')}>Use New Video</PrimaryButton><SecondaryButton onClick={record}>Record Again</SecondaryButton></> : <><SecondaryButton onClick={back}>Keep Current Video</SecondaryButton><PrimaryButton disabled={state === 'recording'} onClick={record}>{state === 'recording' ? 'Recording…' : 'Record New Video'}</PrimaryButton></>}</div></div>
}

function MembershipSettings({ back, act }: { back: () => void; act: (action: SimulatedAction) => void }) {
  return <div className="settings-screen"><SettingsHeader onBack={back} /><SettingsTitle title="Membership Status" copy="Manage your plan, billing, and profile." /><div className="membership-stack"><SettingsRow icon={<AppIcon name="crown" />} title="Standard Plan" detail="●  Active" /><button className="membership-card membership-card--upgrade" onClick={() => act('upgrade')}><span>↑</span><span><small>UPGRADE</small><strong>Upgrade to Paid Plan</strong><em>Unlock priority review and more visibility.</em></span><b>›</b></button><button className="membership-card" onClick={() => act('cancel')}><span>×</span><span><small>MANAGE</small><strong>Cancel Membership</strong><em>End your paid plan at the end of the billing period.</em></span><b>›</b></button><button className="membership-card membership-card--danger" onClick={() => act('delete')}><span>♲</span><span><small>DANGER ZONE</small><strong>Delete Profile</strong><em>Permanently remove your profile and data.</em></span><b>›</b></button></div><p className="settings-privacy">♢<span>You can manage your plan anytime.</span></p></div>
}

function HelpSettings({ back }: { back: () => void }) {
  const [notice, setNotice] = useState('')
  const notify = (label: string) => { setNotice(`${label} is simulated in this prototype.`); window.setTimeout(() => setNotice(''), 2200) }
  const helpItems: Array<[ReactNode, string, string]> = [[<span className="settings-question">?</span>, 'Help Center', 'Find answers to common questions.'], [<AppIcon name="mail" />, 'Email Support', 'No email will be sent.'], [<AppIcon name="shield" />, 'Safety & Reporting', 'Review prototype safety resources.'], [<AppIcon name="feedback" />, 'Feedback', 'No form will be submitted.']]
  return <div className="settings-screen help-screen"><SettingsHeader onBack={back} /><SettingsTitle title="We’re here for you." copy="Get fast answers, anytime." /><section className="support-assistant"><h2>Support Assistant <small>DEMO</small></h2><p>Explore common Middie help topics.</p><div className="support-search">Ask me anything… <button onClick={() => notify('Support chat')}>➤</button></div><div className="support-chips">{['How matches work', 'Billing questions', 'Privacy', 'Troubleshooting'].map((item) => <button onClick={() => notify(item)} key={item}>{item}</button>)}</div></section><p className="support-divider">OTHER WAYS TO GET HELP</p><div className="support-list">{helpItems.map(([icon, title, detail]) => <SettingsRow key={title} icon={icon} title={title} detail={detail} onClick={() => notify(title)} />)}</div>{notice && <div className="prototype-toast" role="status">{notice}</div>}</div>
}

function ConfirmationModal({ action, close }: { action: Exclude<SimulatedAction, null>; close: () => void }) {
  const copy = { upgrade: ['Upgrade preview', 'No purchase will be made.'], cancel: ['Cancel preview', 'Your membership will not be changed.'], delete: ['Delete preview', 'No profile or data will be deleted.'], signout: ['Sign-out preview', 'No session or device will be affected.'] }[action]
  return <div className="settings-modal-backdrop" onMouseDown={close}><div className="settings-modal" role="dialog" aria-modal="true" onMouseDown={(event) => event.stopPropagation()}><span>DEMO ONLY</span><h2>{copy[0]}</h2><p>{copy[1]} This action is simulated and remains entirely in your browser.</p><PrimaryButton onClick={close}>UNDERSTOOD</PrimaryButton></div></div>
}

export function SettingsExperience({ onClose, initialPage = 'main' }: { onClose: () => void; initialPage?: SettingsPage }) {
  const [page, setPage] = useState<SettingsPage>(initialPage)
  const [action, setAction] = useState<SimulatedAction>(null)
  const back = () => setPage('main')
  return <>{page === 'main' && <SettingsMain open={setPage} close={onClose} />}{page === 'signin' && <SignInSettings back={back} act={setAction} />}{page === 'matching' && <MatchSettings back={back} />}{page === 'video' && <NewVideoSettings back={back} />}{page === 'membership' && <MembershipSettings back={back} act={setAction} />}{page === 'help' && <HelpSettings back={back} />}{action && <ConfirmationModal action={action} close={() => setAction(null)} />}</>
}
