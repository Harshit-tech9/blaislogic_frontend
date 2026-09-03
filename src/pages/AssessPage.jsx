import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import AgenticArchitectApp from '../components/architect/AgenticArchitectApp'
import './AssessPage.css'

const JOURNEY = [
  { num: 1, tag: 'Start', title: 'Lead and workflow intake. Name, company, role and the workflow costing you time.' },
  { num: 2, tag: 'Company research', title: 'The Architect reads your public website and states assumptions for you to confirm.' },
  { num: 3, tag: 'Workflow interview', title: 'Up to six adaptive questions. Never re-asks what is already known.' },
  { num: 4, tag: 'Opportunity map', title: 'Exactly three agent opportunities, scored and ranked with one recommended.' },
  { num: 5, tag: 'Agent blueprint', title: 'Business, agent, technical, economic and pilot definitions in one view.' },
  { num: 6, tag: 'Live proof-of-work', title: 'Upload sample documents. Extract, compare, flag and recommend.' },
  { num: 7, tag: 'Results', title: 'Downloadable PDF report and a strategy call with full context attached.' },
]

export default function AssessPage() {
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return undefined
    const id = window.setInterval(() => {
      setActiveStep(current => (current + 1) % JOURNEY.length)
    }, 2200)
    return () => window.clearInterval(id)
  }, [])

  return (
    <>
      <Header />
      <main className="assess-page" id="top">
        <section className="assess-hero">
          <div className="wrap assess-hero-intro">
            <div className="assess-eyebrow-row">
              <div className="eyebrow" style={{ marginBottom: 0, justifyContent: 'center' }}>Agent Architect</div>
              <span className="assess-live-badge">Live</span>
            </div>
            <h1>
              Bring us one workflow.<br />
              Leave with an <span className="accent">agent blueprint.</span>
            </h1>
            <p className="assess-lede">
              A 10–15 minute, self-serve assessment. The Architect researches your company,
              interviews you on one workflow, ranks three agent opportunities, designs a
              production blueprint, and runs a live proof-of-work on your sample documents.
              No account. No password. Capped at ₹100 per session.
            </p>
            <div className="assess-meta assess-meta-inline">
              <div>
                <div className="assess-meta-num">10–15<span>min</span></div>
                <div className="assess-meta-lbl">Full assessment</div>
              </div>
              <div>
                <div className="assess-meta-num">3</div>
                <div className="assess-meta-lbl">Opportunities ranked</div>
              </div>
              <div>
                <div className="assess-meta-num">₹100</div>
                <div className="assess-meta-lbl">Session spend cap</div>
              </div>
            </div>
          </div>
        </section>

        <section className="assess-session-section" id="session">
          <div className="wrap">
            <AgenticArchitectApp />
          </div>
        </section>

        <section className="assess-journey" id="journey">
          <div className="wrap assess-journey-inner">
            <div className="assess-journey-head">
              <div className="assess-journey-kicker">What happens in the session</div>
              <h2>Seven stages, one continuous flow, zero passwords.</h2>
              <p className="assess-journey-desc">
                Watch the flow move through each stage. Start the live assessment above when you are ready.
              </p>
            </div>
            <div
              className="assess-timeline"
              style={{ '--active-step': activeStep, '--step-count': JOURNEY.length }}
            >
              <div className="assess-timeline-progress" aria-hidden="true" />
              {JOURNEY.map((s, i) => {
                const state = i < activeStep ? 'done' : i === activeStep ? 'active' : ''
                return (
                  <div
                    className={`assess-tstep${state ? ` ${state}` : ''}`}
                    key={s.num}
                    onMouseEnter={() => setActiveStep(i)}
                  >
                    <div className="assess-tnum">
                      {i < activeStep ? '✓' : s.num}
                    </div>
                    <div className="assess-tbody">
                      <div className="assess-stage-tag">{s.tag}</div>
                      <h3>{s.title}</h3>
                    </div>
                  </div>
                )
              })}
            </div>
            <div className="assess-journey-cta">
              <Link to="/" className="btn btn-ghost">Back to site</Link>
              <a className="btn btn-accent" href="#session">
                Explore the session
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
