import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'

const STAGES = [
  ['start', 'Start', 'Your requirements'],
  ['research', 'Company research', 'Public sources'],
  ['interview', 'Workflow interview', 'Max 6 questions'],
  ['opportunities', 'Opportunity map', '3 ranked options'],
  ['blueprint', 'Agent blueprint', 'Full architecture'],
  ['proof', 'Live proof-of-work', '3 sample documents'],
  ['results', 'Results', 'Assessment outcome'],
]

const TITLES = Object.fromEntries(STAGES.map(([id, title]) => [id, title]))

export function AssessmentShell({ snapshot, viewedStage, onViewStage, connection, onCancel, children }) {
  const stepsRef = useRef(null)
  const activeStepRef = useRef(null)
  const currentIndex = STAGES.findIndex(([id]) => id === (snapshot?.current_stage || 'start'))
  const viewedIndex = Math.max(0, STAGES.findIndex(([id]) => id === viewedStage))
  const cost = snapshot?.usage?.known_cost_usd || 0
  const cap = (snapshot?.budget_credit_micros || 1000000) / 1_000_000
  const terminal = ['completed', 'failed', 'cancelled'].includes(snapshot?.status)

  useEffect(() => {
    const steps = stepsRef.current
    const activeStep = activeStepRef.current
    if (!steps || !activeStep || steps.scrollWidth <= steps.clientWidth) return
    const reducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
    steps.scrollTo({
      left: activeStep.offsetLeft - (steps.clientWidth - activeStep.clientWidth) / 2,
      behavior: reducedMotion ? 'auto' : 'smooth',
    })
  }, [viewedStage])

  return (
    <div className="architect-app">
      <aside className="architect-side">
        <Link className="architect-brand" to="/" aria-label="Back to BlaiseLogic home">
          <span className="architect-brand-dot" />
          <span><strong>Agentic AI Architect</strong><small>BlaiseLogic AI Systems Studio</small></span>
        </Link>
        <ul ref={stepsRef} className="architect-steps" aria-label="Assessment stages">
          {STAGES.map(([id, title, subtitle], index) => {
            const available = index <= currentIndex
            const state = id === viewedStage ? 'current' : index < currentIndex ? 'complete' : ''
            return (
              <li key={id} ref={id === viewedStage ? activeStepRef : null} className={state}>
                <button type="button" disabled={!available} onClick={() => onViewStage(id)} aria-current={id === viewedStage ? 'step' : undefined}>
                  <span className="architect-step-num">{index < currentIndex ? '✓' : index + 1}</span>
                  <span><strong>{title}</strong><small>{subtitle}</small></span>
                </button>
              </li>
            )
          })}
        </ul>
        <div className="architect-side-foot">
          <div><span>Known spend</span><strong>${cost.toFixed(3)} / ${cap.toFixed(2)}</strong></div>
          <div className="architect-meter"><i style={{ width: `${Math.min(100, cap ? cost / cap * 100 : 0)}%` }} /></div>
          <div><span>Connection</span><strong className={`connection-${connection}`}>{connection}</strong></div>
          <div><span>Data</span><strong>Local storage</strong></div>
          {!terminal && snapshot?.assessment_id && <button className="architect-button ghost full" onClick={onCancel}>Cancel assessment</button>}
        </div>
      </aside>
      <main className="architect-main">
        <header className="architect-topbar">
          <div><small>Stage {viewedIndex + 1} of 7</small><strong>{TITLES[viewedStage]}</strong></div>
          <div className="architect-top-meta">
            {snapshot?.assessment_id && <code>{snapshot.assessment_id.slice(0, 12).toUpperCase()}</code>}
            <span className={`architect-status status-${snapshot?.status || 'ready'}`}><i />{(snapshot?.status || 'ready').replaceAll('_', ' ')}</span>
          </div>
          <div className="architect-stage-progress" aria-hidden="true"><i style={{ width: `${((viewedIndex + 1) / STAGES.length) * 100}%` }} /></div>
        </header>
        <div className="architect-content" aria-live="polite">{children}</div>
      </main>
    </div>
  )
}

export { STAGES }
