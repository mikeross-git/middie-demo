import { useEffect, useState } from 'react'
import { AppIcon, DemoNotice, DemoShell, MiddieLogo, PhoneViewport, PrimaryButton, PrimaryExperience, type DemoDashboardState } from './components'

type Step = 'welcome' | 'email-signup' | 'google-signup' | 'phone-signup' | 'age' | 'identity' | 'location' | 'video' | 'success' | 'dashboard'
type AuthMethod = 'email' | 'google' | 'phone'
type Gender = 'Male' | 'Female'
type MatchPreference = Gender | 'Male & Female'
type Distance = '10 miles' | '25 miles' | '50 miles' | '100 miles' | 'No preference'
type RecordingState = 'ready' | 'recording' | 'recorded'
type ResourceModal = 'faq' | 'founder' | null

const flow: Step[] = ['welcome', 'age', 'identity', 'location', 'video', 'success', 'dashboard']
const distanceOptions: Distance[] = ['10 miles', '25 miles', '50 miles', '100 miles', 'No preference']
const faqs = [
  ['How do you decide who is "too hot for Middie?"', 'We leverage AI to analyze a user’s video. We will publish the methodology when the app launches for full transparency, and you will see in the demo that there will be a manual appeal process available to the user.'],
  ['Will women be banned based on looks or just men?', 'Just men. Men make up the vast majority of dating app users and contribute to the 80/20 swipe bias.'],
  ['Won’t women just choose the hottest of the remaining subset of men, creating the 80/20 problem all over again?', 'Yes! And that would be an amazing outcome. Remember, this “middle” group of men, between 60%–80% (or even up to 90% in some markets) on the curve, are getting virtually zero dates now on other apps. We’re likely not going to be able to solve the problem for the bottom 50%, and that’s ok.'],
  ['When will you be launching?', 'The planned launch is in the fall of 2026.'],
  ['Where will you initially be launching?', 'Middie will roll out in stages. The initial plan is to launch in South Florida, then Southern California, and then New York City.'],
] as const

function ResourceDialog({ resource, close }: { resource: Exclude<ResourceModal, null>; close: () => void }) {
  return <div className="resource-modal-backdrop" role="presentation" onMouseDown={close}><section className={`resource-modal resource-modal--${resource}`} role="dialog" aria-modal="true" aria-labelledby="resource-title" onMouseDown={(event) => event.stopPropagation()}><button className="resource-modal__close" onClick={close} aria-label="Close">×</button>{resource === 'faq' ? <><p className="resource-modal__eyebrow">RESOURCES</p><h2 id="resource-title">Frequently Asked Questions</h2><div className="resource-faqs">{faqs.map(([question, answer], index) => <details key={question} open={index === 0}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></> : <><p className="resource-modal__eyebrow">MEET OUR FOUNDER</p><h2 id="resource-title">Why Middie?</h2><p className="resource-modal__intro">A short introduction to the creator of Middie.</p><video className="resource-founder-video" controls playsInline preload="metadata"><source src={`${import.meta.env.BASE_URL}assets/middie-founder-video.mp4`} type="video/mp4" />Your browser does not support embedded video.</video></>}</section></div>
}

function BackButton({ onClick }: { onClick: () => void }) {
  return <button className="nav-icon nav-icon--back" onClick={onClick} aria-label="Go back" />
}

function ScreenHeader({ onBack }: { onBack?: () => void }) {
  return (
    <header className="onboarding-header">
      <div>{onBack && <BackButton onClick={onBack} />}</div>
      <MiddieLogo compact />
      <div />
    </header>
  )
}

function ScreenTitle({ children, support }: { children: React.ReactNode; support?: React.ReactNode }) {
  return (
    <div className="onboarding-title">
      <span className="red-rule" aria-hidden="true" />
      <h1>{children}</h1>
      {support && <p>{support}</p>}
    </div>
  )
}

function WelcomeScreen({ choose }: { choose: (method: AuthMethod) => void }) {
  return (
    <div className="onboarding-screen welcome-screen">
      <div className="welcome-screen__hero">
        <MiddieLogo />
        <ScreenTitle support={<>Real people. Real intros.<br />No endless swiping.</>}>
          Welcome to<br />the middle.
        </ScreenTitle>
      </div>
      <div className="auth-buttons">
        <PrimaryButton onClick={() => choose('email')}><span><AppIcon name="mail" /></span>Continue with Email</PrimaryButton>
        <button className="auth-button" onClick={() => choose('google')}><span><AppIcon name="google" /></span>Continue with Google</button>
        <button className="auth-button" onClick={() => choose('phone')}><span><AppIcon name="phone" /></span>Continue with Phone</button>
      </div>
      <p className="inline-prompt">Already have an account? <span>Sign in</span></p>
      <p className="legal-copy">By continuing, you agree to our<br /><span>Terms</span> and <span>Privacy Policy</span>.</p>
    </div>
  )
}

function EmailSignupScreen({ next, back }: { next: () => void; back: () => void }) {
  const [email, setEmail] = useState('alex.demo@example.com')
  const [sent, setSent] = useState(false)
  return <div className="onboarding-screen auth-step"><ScreenHeader onBack={back} /><ScreenTitle support="We’ll send a secure sign-in link to this address.">Continue with email</ScreenTitle><div className="auth-step__card"><label className="prototype-field"><span>EMAIL ADDRESS</span><span className="prototype-field__control"><i><AppIcon name="mail" /></i><input type="email" value={email} onChange={(event) => setEmail(event.target.value)} aria-label="Email address" /></span></label>{sent ? <div className="auth-confirmation"><span><AppIcon name="check" /></span><strong>Check your inbox.</strong><p>A mock confirmation link was sent to<br />{email}. Nothing left this browser.</p><PrimaryButton onClick={next}>Continue</PrimaryButton></div> : <PrimaryButton disabled={!email.includes('@')} onClick={() => setSent(true)}>Send sign-in link</PrimaryButton>}</div><p className="privacy-note"><span><AppIcon name="lock" /></span>Prototype only. No email will be sent.</p></div>
}

function GoogleSignupScreen({ next, back }: { next: () => void; back: () => void }) {
  const [selected, setSelected] = useState(false)
  return <div className="onboarding-screen auth-step"><ScreenHeader onBack={back} /><ScreenTitle support="Choose a fictional Google account to continue.">Continue with Google</ScreenTitle><div className="google-dialog"><div className="google-dialog__brand"><AppIcon name="google" size={25} /><span>Sign in with Google</span></div><p>Choose an account</p><button className={selected ? 'is-selected' : ''} onClick={() => setSelected(true)}><span className="google-avatar">A</span><span><strong>Alex Demo</strong><small>alex.demo@gmail.com</small></span>{selected && <AppIcon name="check" />}</button><small>Mock SSO · no Google connection is made</small></div><div className="auth-step__continue"><PrimaryButton disabled={!selected} onClick={next}>Continue</PrimaryButton></div></div>
}

function PhoneSignupScreen({ next, back }: { next: () => void; back: () => void }) {
  const [code, setCode] = useState('482931')
  return <div className="onboarding-screen auth-step"><ScreenHeader onBack={back} /><ScreenTitle support={<>Enter the six-digit code sent to<br />(305) 555-0148.</>}>Verify your phone</ScreenTitle><div className="auth-step__card"><label className="prototype-field"><span>VERIFICATION CODE</span><span className="prototype-field__control prototype-field__control--code"><i><AppIcon name="phone" /></i><input value={code} inputMode="numeric" maxLength={6} onChange={(event) => setCode(event.target.value.replace(/\D/g, ''))} aria-label="Six digit verification code" /></span></label><p className="auth-step__hint">For the prototype, the code is already filled in.</p><PrimaryButton disabled={code.length !== 6} onClick={next}>Next</PrimaryButton></div><p className="privacy-note"><span><AppIcon name="lock" /></span>No SMS will be sent.</p></div>
}

function AgeScreen({ next, back }: { next: () => void; back: () => void }) {
  const [birthDate, setBirthDate] = useState('05/14/1992')
  const [confirmed, setConfirmed] = useState(false)
  const updateBirthDate = (value: string) => {
    const digits = value.replace(/\D/g, '').slice(0, 8)
    setBirthDate([digits.slice(0, 2), digits.slice(2, 4), digits.slice(4, 8)].filter(Boolean).join('/'))
  }
  return (
    <div className="onboarding-screen form-screen">
      <ScreenHeader onBack={back} />
      <ScreenTitle support={<>We use your date of birth to confirm you’re 18+ and to personalize your experience.</>}>
        When were<br />you born?
      </ScreenTitle>
      <div className="form-stack">
        <label className="prototype-field">
          <span>DATE OF BIRTH</span>
          <span className="prototype-field__control"><i><AppIcon name="calendar" /></i><input value={birthDate} inputMode="numeric" maxLength={10} placeholder="MM/DD/YYYY" onChange={(e) => updateBirthDate(e.target.value)} aria-label="Date of birth in month day year format" /></span>
        </label>
        <label className="check-row">
          <input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} />
          <span className="check-row__box" aria-hidden="true">{confirmed ? '✓' : ''}</span>
          <span>I confirm that I am 18 or older.</span>
        </label>
        <PrimaryButton disabled={!confirmed} onClick={next}>Continue</PrimaryButton>
      </div>
      <p className="privacy-note"><span><AppIcon name="lock" /></span>Your age is kept private.<br />We’ll never share it or show it on your profile.</p>
    </div>
  )
}

function ChoiceGroup<T extends string>({ label, options, value, onChange }: { label: string; options: readonly T[]; value: T; onChange: (value: T) => void }) {
  return (
    <fieldset className="choice-group">
      <legend>{label}</legend>
      <div className="choice-group__options">
        {options.map((option) => <button type="button" key={option} className={value === option ? 'is-selected' : ''} onClick={() => onChange(option)}>{option}</button>)}
      </div>
    </fieldset>
  )
}

function IdentityScreen({ next, back }: { next: () => void; back: () => void }) {
  const [identity, setIdentity] = useState<Gender>('Male')
  const [preference, setPreference] = useState<MatchPreference>('Female')
  return (
    <div className="onboarding-screen form-screen identity-screen">
      <ScreenHeader onBack={back} />
      <ScreenTitle support="We use this to set up your profile and send you the right introductions.">Tell us who<br />you are</ScreenTitle>
      <div className="form-stack">
        <ChoiceGroup label="I AM" options={['Male', 'Female']} value={identity} onChange={setIdentity} />
        <ChoiceGroup label="MATCH ME WITH" options={['Male', 'Female', 'Male & Female']} value={preference} onChange={setPreference} />
        <p className="field-note">You can update these preferences<br />later in settings.</p>
        <PrimaryButton onClick={next}>Continue</PrimaryButton>
      </div>
      <p className="privacy-note"><span><AppIcon name="lock" /></span>Your preferences are used<br />only for matching.</p>
    </div>
  )
}

function LocationScreen({ next, back }: { next: () => void; back: () => void }) {
  const [zip, setZip] = useState('90028')
  const [distance, setDistance] = useState<Distance>('25 miles')
  return (
    <div className="onboarding-screen form-screen location-screen">
      <ScreenHeader onBack={back} />
      <ScreenTitle support="We use your ZIP code and distance preference to find better introductions near you.">Where should<br />we match you?</ScreenTitle>
      <div className="form-stack">
        <label className="prototype-field">
          <span>ZIP CODE</span>
          <span className="prototype-field__control"><i><AppIcon name="pin" /></i><input value={zip} inputMode="numeric" maxLength={5} onChange={(e) => setZip(e.target.value.replace(/\D/g, ''))} aria-label="ZIP code" /></span>
        </label>
        <ChoiceGroup label="MATCH DISTANCE" options={distanceOptions} value={distance} onChange={setDistance} />
        <p className="radius-note"><span aria-hidden="true">✧</span>The wider your radius,<br />the better your matches.</p>
        <PrimaryButton onClick={next}>Continue</PrimaryButton>
      </div>
      <p className="privacy-note"><span><AppIcon name="lock" /></span>Your location is used only for matching<br />and is never shown publicly.</p>
    </div>
  )
}

function VideoScreen({ next, back }: { next: () => void; back: () => void }) {
  const [recordingState, setRecordingState] = useState<RecordingState>('ready')
  const [remaining, setRemaining] = useState(3)

  useEffect(() => {
    if (recordingState !== 'recording') return
    const interval = window.setInterval(() => setRemaining((value) => Math.max(0, value - 1)), 1000)
    const finish = window.setTimeout(() => setRecordingState('recorded'), 3000)
    return () => { window.clearInterval(interval); window.clearTimeout(finish) }
  }, [recordingState])

  const startRecording = () => {
    if (recordingState !== 'ready') return
    setRemaining(3)
    setRecordingState('recording')
  }

  return (
    <div className={`onboarding-screen camera-screen camera-screen--${recordingState}`}>
      <header className="camera-header">
        <button onClick={back} aria-label="Close camera">×</button><MiddieLogo compact /><span />
      </header>
      <div className="camera-copy">
        <ScreenTitle support={<>A short, candid video goes<br />a long way.</>}>Introduce yourself.</ScreenTitle>
        <p>BE REAL. BE YOU.</p>
      </div>
      <div className="camera-controls">
        {recordingState === 'recorded' ? (
          <div className="recorded-preview">
            <span className="recorded-preview__check">✓</span>
            <strong>Looking good.</strong>
            <small>Your simulated intro is ready.</small>
            <PrimaryButton onClick={next}>Use this video</PrimaryButton>
            <button className="text-button" onClick={() => setRecordingState('ready')}>Record again</button>
          </div>
        ) : (
          <>
            <span className="video-mode">{recordingState === 'recording' ? `REC · 00:0${remaining}` : 'VIDEO'}</span>
            <div className="record-row"><span className="camera-tool" aria-hidden="true">ϟ</span><button className={`record-button ${recordingState === 'recording' ? 'is-recording' : ''}`} onClick={startRecording} aria-label="Start simulated recording"><span /></button><span className="camera-tool" aria-hidden="true">↻</span></div>
            <span className="record-limit">{recordingState === 'recording' ? 'SIMULATED RECORDING' : '30 SECONDS MAX'}</span>
          </>
        )}
      </div>
    </div>
  )
}

function SuccessScreen({ done }: { done: () => void }) {
  const [videoNotice, setVideoNotice] = useState(false)
  return (
    <div className="onboarding-screen success-screen">
      <MiddieLogo compact />
      <ScreenTitle support={<>Your 30-second intro has been submitted.<br />We’ll send your 5 introductions on Sunday.</>}>You’re all set.</ScreenTitle>
      <div className="success-hero" role="img" aria-label="A black invitation envelope with a glowing gold check mark" />
      <div className="review-note"><span><AppIcon name="clock" /></span><p>Until then, we’re reviewing videos<br />and preparing thoughtful matches.</p></div>
      <p className="match-schedule"><span><AppIcon name="calendar" /></span>New introductions every Sunday.</p>
      <PrimaryButton onClick={done}>View Mock Matches</PrimaryButton>
      <button className="success-watch" onClick={() => { setVideoNotice(true); window.setTimeout(() => setVideoNotice(false), 2200) }}>Watch My Video</button>
      {videoNotice && <div className="prototype-toast" role="status">This would replay your simulated introduction video.</div>}
    </div>
  )
}

function App() {
  const [step, setStep] = useState<Step>('welcome')
  const [dashboardState, setDashboardState] = useState<DemoDashboardState>('new-intros')
  const [mobileIntroVisible, setMobileIntroVisible] = useState(true)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [resourceModal, setResourceModal] = useState<ResourceModal>(null)
  const [demoSession, setDemoSession] = useState(0)
  const goNext = () => setStep(flow[Math.min(flow.indexOf(step) + 1, flow.length - 1)])
  const goBack = () => setStep(flow[Math.max(flow.indexOf(step) - 1, 0)])
  const restart = () => {
    setDemoSession((value) => value + 1)
    setDashboardState('new-intros')
    setStep('welcome')
  }
  const startDashboard = () => {
    setDemoSession((value) => value + 1)
    setDashboardState('new-intros')
    setStep('dashboard')
    setMobileIntroVisible(false)
  }
  const startOnboarding = () => {
    restart()
    setMobileIntroVisible(false)
  }
  const chooseAuth = (method: AuthMethod) => setStep(`${method}-signup`)
  const jumpToDashboard = (state: DemoDashboardState) => {
    setDemoSession((value) => value + 1)
    setDashboardState(state)
    setStep('dashboard')
    setMobileMenuOpen(false)
  }
  const jumpToVideo = () => {
    setDemoSession((value) => value + 1)
    setStep('video')
    setMobileMenuOpen(false)
  }

  return (
    <div className="demo-site-page">
      <header className="demo-site-header">
        <a className="demo-site-header__brand" href="/" aria-label="Middie home"><MiddieLogo compact /></a>
        <a className="demo-site-header__back" href="/">Back to main site</a>
      </header>
      <DemoShell notice={<DemoNotice />}>
      <div className="public-demo-layout">
        <aside className={mobileIntroVisible ? 'public-demo-intro is-mobile-visible' : 'public-demo-intro'}>
          <p className="public-demo-intro__eyebrow">INTERACTIVE PROTOTYPE</p>
          <h1>Try Middie.</h1>
          <span className="public-demo-intro__rule" />
          <p className="public-demo-intro__body">This is a clickable preview of the Middie experience. No signup is required and nothing you enter is saved.</p>
          <p className="public-demo-intro__instructions">Start from the beginning and go through a mock onboarding, or skip right to the user dashboard and match experience.</p>
          <div className="public-demo-intro__actions">
            <PrimaryButton onClick={startOnboarding}><AppIcon name="play" /><span>Start demo from beginning</span></PrimaryButton>
            <button onClick={startDashboard}><AppIcon name="dashboard" /><span>Skip to the dashboard</span></button>
          </div>
          <p className="public-demo-intro__note">Prototype only. Profiles and interactions shown here are fictional.</p>
        </aside>
        <div className="phone-column">
          <a className="mobile-exit-link" href="/" target="_top">Exit demo</a>
          <button className="mobile-persona-trigger" aria-expanded={mobileMenuOpen} onClick={() => setMobileMenuOpen((open) => !open)}>Skip to a Screen</button>
          {mobileMenuOpen && <div className="mobile-persona-menu"><span>Skip to a screen</span><button className={dashboardState === 'new-intros' && step === 'dashboard' ? 'is-active' : ''} onClick={() => jumpToDashboard('new-intros')}><AppIcon name="heart" /><span>Weekly matches for a woman</span></button><button className={dashboardState === 'selected-me' && step === 'dashboard' ? 'is-active' : ''} onClick={() => jumpToDashboard('selected-me')}><AppIcon name="user" /><span>Weekly intros for a man</span></button><button className={dashboardState === 'woman-profile' && step === 'dashboard' ? 'is-active' : ''} onClick={() => jumpToDashboard('woman-profile')}><AppIcon name="instagram" /><span>Woman shares her Instagram</span></button><button className={step === 'video' ? 'is-active' : ''} onClick={jumpToVideo}><AppIcon name="video" /><span>Upload a 30-second video</span></button><button className={dashboardState === 'empty' && step === 'dashboard' ? 'is-active' : ''} onClick={() => jumpToDashboard('empty')}><AppIcon name="calendar" /><span>No intros this week</span></button><button className={dashboardState === 'swipe-king' && step === 'dashboard' ? 'is-active' : ''} onClick={() => jumpToDashboard('swipe-king')}><AppIcon name="crown" /><span>Man is too hot for Middie</span></button><span className="mobile-persona-menu__resources-label">Resources</span><button className="mobile-persona-menu__resource mobile-persona-menu__resource--faq" onClick={() => { setMobileMenuOpen(false); setResourceModal('faq') }}><span className="demo-tools__resource-icon">?</span><span>FAQ</span></button><button className="mobile-persona-menu__resource mobile-persona-menu__resource--founder" onClick={() => { setMobileMenuOpen(false); setResourceModal('founder') }}><AppIcon name="video" /><span>Meet our Founder</span></button></div>}
          <div className="demo-tools" aria-label="Prototype controls">
            <span>Skip to a screen</span>
            <button className={dashboardState === 'new-intros' && step === 'dashboard' ? 'is-active' : ''} onClick={() => jumpToDashboard('new-intros')}><AppIcon name="heart" /><span>Weekly matches for a woman</span></button>
            <button className={dashboardState === 'selected-me' && step === 'dashboard' ? 'is-active' : ''} onClick={() => jumpToDashboard('selected-me')}><AppIcon name="user" /><span>Weekly intros for a man</span></button>
            <button className={dashboardState === 'empty' && step === 'dashboard' ? 'is-active' : ''} onClick={() => jumpToDashboard('empty')}><AppIcon name="calendar" /><span>No intros this week</span></button>
            <button className={dashboardState === 'swipe-king' && step === 'dashboard' ? 'is-active' : ''} onClick={() => jumpToDashboard('swipe-king')}><AppIcon name="crown" /><span>Man is too hot for Middie</span></button>
            <button className={dashboardState === 'woman-profile' && step === 'dashboard' ? 'is-active' : ''} onClick={() => jumpToDashboard('woman-profile')}><AppIcon name="instagram" /><span>Woman shares her Instagram</span></button>
            <button className={step === 'video' ? 'is-active' : ''} onClick={jumpToVideo}><AppIcon name="video" /><span>Upload a 30-second video</span></button>
            <span className="demo-tools__resources-label">Resources</span>
            <button className="demo-tools__resource demo-tools__resource--faq" onClick={() => setResourceModal('faq')}><span className="demo-tools__resource-icon">?</span><span>FAQ</span></button>
            <button className="demo-tools__resource demo-tools__resource--founder" onClick={() => setResourceModal('founder')}><AppIcon name="video" /><span>Meet our Founder</span></button>
          </div>
          <PhoneViewport>
            <div className="screen-transition" key={`${step}-${demoSession}`}>
              {step === 'welcome' && <WelcomeScreen choose={chooseAuth} />}
              {step === 'email-signup' && <EmailSignupScreen next={() => setStep('age')} back={() => setStep('welcome')} />}
              {step === 'google-signup' && <GoogleSignupScreen next={() => setStep('age')} back={() => setStep('welcome')} />}
              {step === 'phone-signup' && <PhoneSignupScreen next={() => setStep('age')} back={() => setStep('welcome')} />}
              {step === 'age' && <AgeScreen next={goNext} back={goBack} />}
              {step === 'identity' && <IdentityScreen next={goNext} back={goBack} />}
              {step === 'location' && <LocationScreen next={goNext} back={goBack} />}
              {step === 'video' && <VideoScreen next={goNext} back={goBack} />}
              {step === 'success' && <SuccessScreen done={goNext} />}
              {step === 'dashboard' && <PrimaryExperience demoState={dashboardState} onDemoStateChange={setDashboardState} />}
            </div>
          </PhoneViewport>
        </div>
      </div>
      {resourceModal && <ResourceDialog resource={resourceModal} close={() => setResourceModal(null)} />}
      </DemoShell>
      <footer className="demo-site-footer">
        <a href="/">Middie</a>
        <span>Interactive prototype</span>
        <a href="/">Return to main site</a>
      </footer>
    </div>
  )
}

export default App
