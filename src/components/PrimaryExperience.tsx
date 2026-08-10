import { useEffect, useState } from 'react'
import { incomingMatches, weeklyIntros, type IntroProfile, type MatchProfile } from '../data/demoData'
import { PrimaryButton, SecondaryButton } from './Buttons'
import { MiddieLogo } from './MiddieLogo'
import { SettingsExperience } from './SettingsExperience'
import { AppIcon } from './AppIcon'

export type DemoDashboardState = 'new-intros' | 'selected-me' | 'empty' | 'swipe-king' | 'woman-profile'

type PrimaryExperienceProps = {
  demoState: DemoDashboardState
  onDemoStateChange: (state: DemoDashboardState) => void
}

function Portrait({ profile, className = '' }: { profile: IntroProfile; className?: string }) {
  return (
    <div className={`mock-portrait mock-portrait--${profile.portrait} ${className}`} role="img" aria-label={`Portrait of ${profile.name}`}>
      <span className="mock-portrait__light" />
      <span className="mock-portrait__head" />
      <span className="mock-portrait__body" />
    </div>
  )
}

function ExperienceHeader() {
  return (
    <header className="experience-header">
      <span aria-hidden="true" className="nav-icon nav-icon--back" />
      <MiddieLogo compact />
      <span className="experience-header__gear" aria-hidden="true">⚙</span>
    </header>
  )
}

function ExperienceTitle({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="experience-title"><h1>{title}</h1><span className="red-rule" />{children}</div>
}

function FooterCopy({ onHowItWorks }: { onHowItWorks: () => void }) {
  return <footer className="experience-footer"><p>New matches every Sunday.</p><button onClick={onHowItWorks}>HOW IT WORKS</button></footer>
}

function HowItWorksSheet({ onClose }: { onClose: () => void }) {
  const steps = [
    'Record a short introduction.',
    'Middie sends a limited set of curated introductions each week.',
    'Interest is revealed intentionally instead of through endless swiping.',
  ]
  return <div className="how-sheet-backdrop" role="presentation" onMouseDown={onClose}><section className="how-sheet" role="dialog" aria-modal="true" aria-labelledby="how-title" onMouseDown={(event) => event.stopPropagation()}><button className="how-sheet__close" onClick={onClose} aria-label="Close">×</button><p className="how-sheet__eyebrow">A considered introduction</p><h2 id="how-title">How Middie works</h2><span className="red-rule" /><ol>{steps.map((step, index) => <li key={step}><span>0{index + 1}</span><p>{step}</p></li>)}</ol><PrimaryButton onClick={onClose}>GOT IT</PrimaryButton></section></div>
}

function VideoSheet({ profile, onClose }: { profile: IntroProfile; onClose: () => void }) {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const timer = window.setInterval(() => setProgress((value) => value >= 100 ? 0 : value + 1), 70)
    return () => window.clearInterval(timer)
  }, [])
  return (
    <div className="video-sheet-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="video-sheet" role="dialog" aria-modal="true" aria-label={`${profile.name}'s intro video`} onMouseDown={(event) => event.stopPropagation()}>
        <button className="video-sheet__close" onClick={onClose} aria-label="Close video">×</button>
        <Portrait profile={profile} className="video-sheet__poster" />
        <div className="video-sheet__shade"><span className="video-sheet__play">▶</span><p>INTRODUCING</p><h2>{profile.name}, {profile.age}</h2><small>Simulated intro video</small></div>
        <div className="video-sheet__progress"><span style={{ width: `${progress}%` }} /></div>
      </section>
    </div>
  )
}

function WomanIntros({ onHowItWorks }: { onHowItWorks: () => void }) {
  const [video, setVideo] = useState<IntroProfile | null>(null)
  const [shared, setShared] = useState<string[]>([])
  const [notice, setNotice] = useState('')

  const share = (profile: IntroProfile) => {
    if (!shared.includes(profile.id)) setShared((items) => [...items, profile.id])
    setNotice(`Your Instagram has been shared with ${profile.name}.`)
    window.setTimeout(() => setNotice(''), 2400)
  }

  return (
    <div className="primary-experience">
      <ExperienceHeader />
      <ExperienceTitle title="Your New Matches"><p>You have 5 new matches this week.<br />Choose someone to share your Instagram with.</p></ExperienceTitle>
      <div className="intro-list">
        {weeklyIntros.map((profile) => {
          const isShared = shared.includes(profile.id)
          return <article className="intro-card" key={profile.id}>
            <Portrait profile={profile} />
            <div className="intro-card__copy"><h2>{profile.name}, {profile.age}<i /></h2><p>{profile.bio}</p><button onClick={() => setVideo(profile)}>VIEW VIDEO <span>▶</span></button></div>
            <button className={isShared ? 'share-button is-shared' : 'share-button'} onClick={() => share(profile)}><span>{isShared ? <AppIcon name="check" /> : <AppIcon name="instagram" />}</span>{isShared ? 'SHARED' : 'SHARE IG'}</button>
          </article>
        })}
      </div>
      <FooterCopy onHowItWorks={onHowItWorks} />
      {video && <VideoSheet profile={video} onClose={() => setVideo(null)} />}
      {notice && <div className="prototype-toast" role="status">{notice}</div>}
    </div>
  )
}

function MatchList({ onSelect, onHowItWorks }: { onSelect: (profile: MatchProfile) => void; onHowItWorks: () => void }) {
  return <div className="primary-experience"><ExperienceHeader /><ExperienceTitle title="Your Intros"><p>Congratulations! These women have asked for an introduction.<br />Tap an intro to view her profile and Instagram.</p></ExperienceTitle><div className="match-list">{incomingMatches.map((profile) => <button className="match-card" key={profile.id} onClick={() => onSelect(profile)}><Portrait profile={profile} /><span className="match-card__copy"><strong>{profile.name}, {profile.age}<i /></strong><span>{profile.bio}</span><em>VIEW PROFILE</em></span></button>)}</div><FooterCopy onHowItWorks={onHowItWorks} /></div>
}

function ProfileDetail({ profile, onBack }: { profile: MatchProfile; onBack: () => void }) {
  const [message, setMessage] = useState(false)
  return <div className="primary-experience profile-detail"><ExperienceHeader /><div className="profile-detail__intro"><p>● NEW</p><h1>{profile.name} wants<br />to meet you.</h1><span className="red-rule" /><div>{profile.name} liked your video and wants to meet up. Check out her IG to get to know her better.</div></div><section className={`profile-panel profile-panel--${profile.portrait}`}><Portrait profile={profile} className="profile-panel__portrait" /><h2>{profile.name}, {profile.age}</h2><p className="profile-panel__location">{profile.location}</p><div className="profile-facts"><span><AppIcon name="user" /><small>{profile.occupation}</small></span><span><AppIcon name="school" /><small>{profile.school}</small></span><span><AppIcon name="pin" /><small>{profile.location}</small></span></div><div className="instagram-block"><span>Her Instagram <i>✓</i></span><strong>{profile.instagram}</strong></div><div className="lifestyle-gallery">{profile.gallery.map((item, index) => <div className={`lifestyle-tile lifestyle-tile--${item}`} key={`${item}-${index}`} role="img" aria-label={`${profile.name} lifestyle photo ${index + 1}`} />)}</div><PrimaryButton onClick={() => setMessage(true)}><AppIcon name="instagram" />Ask her out on IG</PrimaryButton><SecondaryButton onClick={onBack}>KEEP BROWSING</SecondaryButton></section>{message && <div className="prototype-toast prototype-toast--message" role="dialog"><button onClick={() => setMessage(false)} aria-label="Close">×</button><strong>Message Preview</strong><p>In the live app, this would open to the woman’s Instagram account.</p></div>}</div>
}

function ManMatches({ onHowItWorks }: { onHowItWorks: () => void }) {
  const [selected, setSelected] = useState<MatchProfile | null>(null)
  return selected ? <ProfileDetail profile={selected} onBack={() => setSelected(null)} /> : <MatchList onSelect={setSelected} onHowItWorks={onHowItWorks} />
}

function EmptyMatches({ onHowItWorks, onUpgrade }: { onHowItWorks: () => void; onUpgrade: () => void }) {
  return <div className="primary-experience empty-matches"><ExperienceHeader /><ExperienceTitle title="Your Intros"><h2>No new intros this week.</h2><p>Good things take a minute. We’re sharing your profile with thoughtful women who want something real.</p><p>Check back next Sunday for new intros.</p></ExperienceTitle><div className="empty-matches__scene" role="img" aria-label="A warm library lounge with a chair, lamp, and glowing invitation envelope" /><div className="empty-matches__actions"><PrimaryButton onClick={onUpgrade}>UPGRADE FOR MORE INTROS</PrimaryButton><button onClick={onHowItWorks}>HOW IT WORKS</button></div><div className="empty-matches__sunday"><span className="empty-matches__sunday-mark"><i />♡<i /></span><span>New intros every Sunday.</span></div></div>
}

function SwipeKing() {
  const [notice, setNotice] = useState('')
  const explain = (message: string) => {
    setNotice(message)
    window.setTimeout(() => setNotice(''), 2600)
  }
  return <div className="primary-experience swipe-king"><ExperienceHeader /><div className="swipe-king__copy"><h1>You’re Too<br />Hot For Middie</h1><span className="swipe-king__rule" /><p>Your video is giving Swipe App King vibes.<br />Be a team player, and leave some dates<br />for the rest of us mere mortals.</p></div><img className="swipe-king__art" src={`${import.meta.env.BASE_URL}assets/middie-swipe-king.png`} alt="A gold crown emerging from a black invitation envelope" /><div className="swipe-king__note"><strong>Don’t worry — this is a compliment.</strong><span>We’re saving Middie for the overlooked,<br />the thoughtful, and the almost-picked.</span></div><div className="swipe-king__actions"><PrimaryButton onClick={() => explain('Prototype only — no external dating app will open.')}>Try Hinge or Bumble →</PrimaryButton><SecondaryButton onClick={() => explain('Your simulated appeal has been noted. Nothing was submitted.')}>I think I’m Middie. Please review!</SecondaryButton></div><p className="swipe-king__fineprint">In the real product, a member of the team would review an appeal.</p>{notice && <div className="prototype-toast" role="status">{notice}</div>}</div>
}

export function PrimaryExperience({ demoState, onDemoStateChange }: PrimaryExperienceProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [showHow, setShowHow] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [settingsPage, setSettingsPage] = useState<'main' | 'membership'>('main')
  const choose = (value: DemoDashboardState) => { onDemoStateChange(value); setMenuOpen(false) }
  if (showSettings) return <SettingsExperience initialPage={settingsPage} onClose={() => { setShowSettings(false); setSettingsPage('main') }} />
  return <div className="experience-with-settings"><button className="settings-entry" onClick={() => setShowSettings(true)} aria-label="Open Settings">⚙</button><button className="mobile-persona-trigger" onClick={() => setMenuOpen(!menuOpen)}>Demo</button>{menuOpen && <div className="mobile-persona-menu"><span>Skip to a screen</span><button className={demoState === 'new-intros' ? 'is-active' : ''} onClick={() => choose('new-intros')}>Weekly matches for a woman</button><button className={demoState === 'selected-me' ? 'is-active' : ''} onClick={() => choose('selected-me')}>Weekly intros for a man</button><button className={demoState === 'woman-profile' ? 'is-active' : ''} onClick={() => choose('woman-profile')}>Woman shares her Instagram</button><button className={demoState === 'empty' ? 'is-active' : ''} onClick={() => choose('empty')}>No intros this week</button><button className={demoState === 'swipe-king' ? 'is-active' : ''} onClick={() => choose('swipe-king')}>Man is too hot for Middie</button></div>}{demoState === 'new-intros' && <WomanIntros onHowItWorks={() => setShowHow(true)} />}{demoState === 'selected-me' && <ManMatches onHowItWorks={() => setShowHow(true)} />}{demoState === 'woman-profile' && <ProfileDetail profile={incomingMatches[0]} onBack={() => choose('selected-me')} />}{demoState === 'empty' && <EmptyMatches onHowItWorks={() => setShowHow(true)} onUpgrade={() => { setSettingsPage('membership'); setShowSettings(true) }} />}{demoState === 'swipe-king' && <SwipeKing />}{showHow && <HowItWorksSheet onClose={() => setShowHow(false)} />}</div>
}
