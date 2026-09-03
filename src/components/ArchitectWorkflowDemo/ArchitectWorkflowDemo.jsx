import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'

const DEMO_STEPS = [
  {
    id: 'provision',
    label: 'Provision',
    status: 'Provisioning isolated agent instance…',
    messages: [],
    panel: 'system',
  },
  {
    id: 'research',
    label: 'Research',
    status: 'Reading public website…',
    messages: [
      { role: 'agent', text: 'Based on meridian-industrial.com, you appear to manufacture B2B industrial equipment with a field-service parts workflow.' },
      { role: 'agent', text: 'Assumption: invoice reconciliation between supplier PDFs and your ERP is manual today. Correct?' },
      { role: 'user', text: 'Yes, 3 analysts reconcile ~400 invoices/week in NetSuite.' },
    ],
    panel: 'chat',
  },
  {
    id: 'interview',
    label: 'Interview',
    status: 'Workflow interview: question 2 of 6',
    messages: [
      { role: 'agent', text: 'What triggers reconciliation, invoice receipt, PO match, or month-end close?' },
      { role: 'user', text: 'When a supplier PDF lands in shared email. PO match happens manually in NetSuite.' },
      { role: 'agent', text: 'Got it. Success = matched line items with no human rework under ₹500 variance?' },
      { role: 'user', text: 'Exactly. Escalate only when totals diverge or line items are missing.' },
    ],
    panel: 'chat',
  },
  {
    id: 'opportunities',
    label: 'Opportunities',
    status: 'Scoring 3 agent opportunities…',
    messages: [],
    panel: 'opportunities',
    opportunities: [
      { name: 'Invoice extraction agent', score: 92, recommended: true },
      { name: 'PO match orchestrator', score: 78, recommended: false },
      { name: 'Variance escalation router', score: 71, recommended: false },
    ],
  },
  {
    id: 'blueprint',
    label: 'Blueprint',
    status: 'Designing production blueprint…',
    messages: [],
    panel: 'blueprint',
    blueprint: [
      { k: 'Trigger', v: 'Supplier PDF in shared inbox' },
      { k: 'Tools', v: 'OCR extract → NetSuite lookup → variance check' },
      { k: 'Human handoff', v: 'Analyst review when confidence < 85%' },
      { k: 'Cost / run', v: '₹12–18 per invoice' },
      { k: 'Pilot', v: '4 weeks · 200 invoices · 2 analysts' },
    ],
  },
  {
    id: 'proof',
    label: 'Proof-of-work',
    status: 'Running on sample documents…',
    messages: [],
    panel: 'proof',
    docs: ['Supplier_Inv_8842.pdf', 'PO_Match_8842.xlsx'],
    extractions: [
      { field: 'Invoice total', value: '₹4,82,500', conf: 98 },
      { field: 'PO reference', value: 'PO-2024-1187', conf: 96 },
      { field: 'Line item count', value: '14 / 14 matched', conf: 91 },
      { field: 'Variance', value: '₹0, auto-approved', conf: 99 },
    ],
  },
  {
    id: 'complete',
    label: 'Complete',
    status: 'Assessment complete',
    messages: [
      { role: 'agent', text: 'Blueprint ready. Proof-of-work passed on 2 sample documents. Report available for download.' },
    ],
    panel: 'chat',
  },
]

function useTyping(text, active, speed = 22) {
  const [display, setDisplay] = useState('')
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!active || !text) {
      setDisplay('')
      setDone(false)
      return
    }
    setDisplay('')
    setDone(false)
    let i = 0
    const id = setInterval(() => {
      i++
      setDisplay(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(id)
        setDone(true)
      }
    }, speed)
    return () => clearInterval(id)
  }, [text, active, speed])

  return { display, done }
}

function TypingMessage({ msg, show, onDone }) {
  const { display, done } = useTyping(msg.text, show)
  useEffect(() => {
    if (done && onDone) onDone()
  }, [done, onDone])

  return (
    <div className={`arch-demo-msg arch-demo-msg-${msg.role}${show ? ' visible' : ''}`}>
      <span className="arch-demo-msg-who">{msg.role === 'agent' ? 'Architect' : 'You'}</span>
      <p>{display}{show && !done && <span className="arch-demo-cursor">|</span>}</p>
    </div>
  )
}

export default function ArchitectWorkflowDemo({ compact = false }) {
  const [stepIndex, setStepIndex] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [msgIndex, setMsgIndex] = useState(0)
  const [panelReady, setPanelReady] = useState(false)
  const [visibleOpps, setVisibleOpps] = useState(0)
  const [visibleBlueprint, setVisibleBlueprint] = useState(0)
  const [visibleExtractions, setVisibleExtractions] = useState(0)
  const [docPhase, setDocPhase] = useState(0)
  const timersRef = useRef([])

  const step = DEMO_STEPS[stepIndex]
  const messages = step.messages || []

  const clearTimers = () => {
    timersRef.current.forEach(clearTimeout)
    timersRef.current = []
  }

  const addTimer = (fn, ms) => {
    const id = setTimeout(fn, ms)
    timersRef.current.push(id)
  }

  const resetPanelState = () => {
    setMsgIndex(0)
    setPanelReady(false)
    setVisibleOpps(0)
    setVisibleBlueprint(0)
    setVisibleExtractions(0)
    setDocPhase(0)
  }

  const goToStep = useCallback((i) => {
    clearTimers()
    resetPanelState()
    setStepIndex(i)
  }, [])

  const nextStep = useCallback(() => {
    setStepIndex(prev => (prev + 1) % DEMO_STEPS.length)
    resetPanelState()
  }, [])

  // Panel-specific animations per step
  useEffect(() => {
    clearTimers()
    resetPanelState()

    if (step.panel === 'system') {
      addTimer(() => setPanelReady(true), 400)
      if (playing) addTimer(nextStep, 2200)
    }

    if (step.panel === 'chat' && messages.length === 0) {
      if (playing) addTimer(nextStep, 2800)
    }

    if (step.panel === 'opportunities') {
      addTimer(() => setPanelReady(true), 300)
      step.opportunities?.forEach((_, i) => {
        addTimer(() => setVisibleOpps(i + 1), 600 + i * 450)
      })
      if (playing) addTimer(nextStep, 3200)
    }

    if (step.panel === 'blueprint') {
      addTimer(() => setPanelReady(true), 300)
      step.blueprint?.forEach((_, i) => {
        addTimer(() => setVisibleBlueprint(i + 1), 500 + i * 350)
      })
      if (playing) addTimer(nextStep, 3400)
    }

    if (step.panel === 'proof') {
      addTimer(() => setPanelReady(true), 300)
      addTimer(() => setDocPhase(1), 800)
      addTimer(() => setDocPhase(2), 1600)
      step.extractions?.forEach((_, i) => {
        addTimer(() => setVisibleExtractions(i + 1), 2000 + i * 400)
      })
      if (playing) addTimer(nextStep, 4800)
    }

    return clearTimers
  }, [stepIndex, playing]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleMsgDone = () => {
    if (msgIndex < messages.length - 1) {
      addTimer(() => setMsgIndex(m => m + 1), 500)
    } else if (playing) {
      addTimer(nextStep, 1200)
    }
  }

  const restart = () => {
    clearTimers()
    resetPanelState()
    setStepIndex(0)
    setPlaying(true)
  }

  return (
    <div className={`arch-demo${compact ? ' arch-demo-compact' : ''}`}>
      <div className="arch-demo-chrome">
        <div className="arch-demo-dots"><span /><span /><span /></div>
        <span className="arch-demo-url">architect.blaiselogic.app / session-demo</span>
        <div className="arch-demo-controls">
          <button
            type="button"
            className="arch-demo-ctrl"
            onClick={() => setPlaying(p => !p)}
            aria-label={playing ? 'Pause demo' : 'Play demo'}
          >
            {playing ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/></svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            )}
          </button>
          <button type="button" className="arch-demo-ctrl" onClick={restart} aria-label="Restart demo">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M3 12a9 9 0 1 0 9-9"/><path d="M3 3v5h5"/></svg>
          </button>
        </div>
      </div>

      <div className="arch-demo-body">
        <div className="arch-demo-sidebar">
          {DEMO_STEPS.map((s, i) => (
            <button
              key={s.id}
              type="button"
              className={`arch-demo-step${i === stepIndex ? ' active' : ''}${i < stepIndex ? ' done' : ''}`}
              onClick={() => { setPlaying(false); goToStep(i) }}
            >
              <span className="arch-demo-step-num">{i + 1}</span>
              <span className="arch-demo-step-label">{s.label}</span>
            </button>
          ))}
        </div>

        <div className="arch-demo-main">
          <div className="arch-demo-status">
            <span className="arch-demo-status-pulse" />
            {step.status}
          </div>

          {step.panel === 'system' && (
            <div className={`arch-demo-system${panelReady ? ' ready' : ''}`}>
              <div className="arch-demo-system-ring" />
              <div className="arch-demo-system-text">Agent instance ready</div>
              <div className="arch-demo-system-meta">Tenant isolated · Budget capped · Session ID #A-4821</div>
            </div>
          )}

          {step.panel === 'chat' && (
            <div className="arch-demo-chat">
              {messages.map((msg, i) => (
                <TypingMessage
                  key={`${step.id}-${i}`}
                  msg={msg}
                  show={i <= msgIndex}
                  onDone={i === msgIndex ? handleMsgDone : undefined}
                />
              ))}
            </div>
          )}

          {step.panel === 'opportunities' && (
            <div className={`arch-demo-opps${panelReady ? ' ready' : ''}`}>
              {step.opportunities?.map((opp, i) => (
                <div
                  key={opp.name}
                  className={`arch-demo-opp${opp.recommended ? ' recommended' : ''}${i < visibleOpps ? ' visible' : ''}`}
                >
                  <div className="arch-demo-opp-top">
                    <span>{opp.name}</span>
                    {opp.recommended && <span className="arch-demo-opp-tag">Recommended</span>}
                  </div>
                  <div className="arch-demo-opp-bar">
                    <div className="arch-demo-opp-fill" style={{ width: `${opp.score}%` }} />
                  </div>
                  <div className="arch-demo-opp-score">{opp.score}/100</div>
                </div>
              ))}
            </div>
          )}

          {step.panel === 'blueprint' && (
            <div className={`arch-demo-blueprint${panelReady ? ' ready' : ''}`}>
              {step.blueprint?.map((row, i) => (
                <div key={row.k} className={`arch-demo-bp-row${i < visibleBlueprint ? ' visible' : ''}`}>
                  <span className="arch-demo-bp-k">{row.k}</span>
                  <span className="arch-demo-bp-v">{row.v}</span>
                </div>
              ))}
            </div>
          )}

          {step.panel === 'proof' && (
            <div className={`arch-demo-proof${panelReady ? ' ready' : ''}`}>
              <div className="arch-demo-docs">
                {step.docs?.map((doc, i) => (
                  <div key={doc} className={`arch-demo-doc${docPhase > i ? ' loaded' : ''}`}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>
                    {doc}
                    {docPhase > i && <span className="arch-demo-doc-ok">✓</span>}
                  </div>
                ))}
              </div>
              <div className="arch-demo-table">
                {step.extractions?.map((row, i) => (
                  <div key={row.field} className={`arch-demo-row${i < visibleExtractions ? ' visible' : ''}`}>
                    <span>{row.field}</span>
                    <span className="arch-demo-val">{row.value}</span>
                    <span className={`arch-demo-conf${row.conf >= 95 ? ' high' : ''}`}>{row.conf}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="arch-demo-footer">
        <span className="arch-demo-footer-note">Simulated session · Meridian Industrial · Invoice reconciliation</span>
        <Link to="/assess" className="arch-demo-footer-cta">
          Run on your workflow
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </Link>
      </div>
    </div>
  )
}
