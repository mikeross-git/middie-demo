import { useEffect, useState } from 'react'
import { AppIcon, DemoNotice, DemoShell, MiddieLogo, PhoneViewport, PrimaryButton, PrimaryExperience, type DemoDashboardState } from './components'

type Step = 'welcome' | 'age' | 'identity' | 'location' | 'video' | 'success' | 'dashboard'
type Gender = 'Male' | 'Female'
type MatchPreference = Gender | 'Male & Female'
type Distance = '10 miles' | '25 miles' | '50 miles' | '100 miles' | 'No preference'
type RecordingState = 'ready' | 'recording' | 'recorded'

const flow: Step[] = ['welcome', 'age', 'identity', 'location', 'video', 'success', 'dashboard']
const distanceOptions: Distance[] = ['10 miles', '25 miles', '50 miles', '100 miles', 'No preference']

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

function WelcomeScreen({ next }: { next: () => void }) {
  return (
    <div className="onboarding-screen welcome-screen">
      <div className="welcome-screen__hero">
        <MiddieLogo />
        <ScreenTitle support={<>Real people. Real intros.<br />No endless swiping.</>}>
          Welcome to<br />the middle.
        </ScreenTitle>
      </div>
      <div className="auth-buttons">
        <PrimaryButton onClick={next}><span><AppIcon name="mail" /></span>Continue with Email</PrimaryButton>
        <button className="auth-button" onClick={next}><span><AppIcon name="google" /></span>Continue with Google</button>
        <button className="auth-button" onClick={next}><span><AppIcon name="phone" /></span>Continue with Phone</button>
      </div>
      <p className="inline-prompt">Already have an account? <span>Sign in</span></p>
      <p className="legal-copy">By continuing, you agree to our<br /><span>Terms</span> and <span>Privacy Policy</span>.</p>
    </div>
  )
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
  return (
    <div className="onboarding-screen success-screen">
      <MiddieLogo compact />
      <ScreenTitle support="Your intro has been submitted. Now give us a little time — we’re finding people who are a strong fit for you.">You’re all set.</ScreenTitle>
      <div className="success-envelope"><div><span><AppIcon name="check" size={34} /></span></div></div>
      <div className="review-note"><span><AppIcon name="clock" /></span><p>Be patient — we’re reviewing videos<br />and making thoughtful introductions.</p></div>
      <p className="match-schedule"><span><AppIcon name="calendar" /></span>New matches every Sunday.</p>
      <PrimaryButton onClick={done}>Done</PrimaryButton>
    </div>
  )
}

function App() {
  const [step, setStep] = useState<Step>('welcome')
  const [dashboardState, setDashboardState] = useState<DemoDashboardState>('new-intros')
  const [mobileIntroVisible, setMobileIntroVisible] = useState(true)
  const goNext = () => setStep(flow[Math.min(flow.indexOf(step) + 1, flow.length - 1)])
  const goBack = () => setStep(flow[Math.max(flow.indexOf(step) - 1, 0)])
  const restart = () => {
    setDashboardState('new-intros')
    setStep('welcome')
  }
  const startDashboard = () => {
    setDashboardState('new-intros')
    setStep('dashboard')
    setMobileIntroVisible(false)
  }
  const startOnboarding = () => {
    restart()
    setMobileIntroVisible(false)
  }

  return (
    <DemoShell notice={<DemoNotice />}>
      <div className="public-demo-layout">
        <aside className={mobileIntroVisible ? 'public-demo-intro is-mobile-visible' : 'public-demo-intro'}>
          <a className="public-demo-intro__exit" href="https://middie.app" aria-label="Return to the Middie website">← Middie.app</a>
          <p className="public-demo-intro__eyebrow">INTERACTIVE PROTOTYPE</p>
          <h1>Try Middie.</h1>
          <span className="public-demo-intro__rule" />
          <p className="public-demo-intro__body">This is a clickable preview of the Middie experience. No signup is required and nothing you enter is saved.</p>
          <p className="public-demo-intro__instructions">Start with the weekly introductions, watch a sample video, share a mock Instagram, and switch perspectives to see what happens next.</p>
          <div className="public-demo-intro__actions">
            <PrimaryButton onClick={startDashboard}>Start the demo</PrimaryButton>
            <button onClick={startOnboarding}>Begin with onboarding</button>
          </div>
          <p className="public-demo-intro__note">Prototype only. Profiles and interactions shown here are fictional.</p>
        </aside>
        <div className="phone-column">
          <a className="mobile-exit-link" href="https://middie.app">Exit demo</a>
          <div className="demo-tools" aria-label="Prototype controls">
            <span>Demo state</span>
            <button className={dashboardState === 'new-intros' ? 'is-active' : ''} onClick={() => { setDashboardState('new-intros'); setStep('dashboard') }}>New intros available</button>
            <button className={dashboardState === 'selected-me' ? 'is-active' : ''} onClick={() => { setDashboardState('selected-me'); setStep('dashboard') }}>A match has selected me</button>
            <button className={dashboardState === 'empty' ? 'is-active' : ''} onClick={() => { setDashboardState('empty'); setStep('dashboard') }}>No matches this week</button>
            <button className={dashboardState === 'swipe-king' ? 'is-active' : ''} onClick={() => { setDashboardState('swipe-king'); setStep('dashboard') }}>Man is a Swipe King</button>
            <button onClick={() => setStep('dashboard')}>Skip onboarding</button>
            <button onClick={restart}>Restart demo</button>
          </div>
          <PhoneViewport>
            <div className="screen-transition" key={step}>
              {step === 'welcome' && <WelcomeScreen next={goNext} />}
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
    </DemoShell>
  )
}

export default App
