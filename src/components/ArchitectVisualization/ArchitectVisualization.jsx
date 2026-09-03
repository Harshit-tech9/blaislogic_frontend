import { useEffect, useRef, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'

const STAGES = [
  { num: 1, tag: 'Landing', title: 'Describe one workflow', desc: 'Set expectations, structured assessment, not a chatbot.' },
  { num: 2, tag: 'Qualification', title: 'Name, email, company', desc: 'No password. Disposable emails rejected upfront.' },
  { num: 3, tag: 'Agent instance', title: 'Isolated environment', desc: 'Budget-capped, tenant-isolated, provisioned silently.' },
  { num: 4, tag: 'Research', title: 'Company context', desc: 'Reads your public website, states assumptions aloud.' },
  { num: 5, tag: 'Interview', title: 'Up to 6 questions', desc: 'Trigger, owner, systems, success, never re-asks.' },
  { num: 6, tag: 'Opportunities', title: '3 ranked agents', desc: 'Scored on value, feasibility, risk and time-to-pilot.' },
  { num: 7, tag: 'Blueprint', title: 'Production design', desc: 'Business, technical, economic and pilot definitions.' },
  { num: 8, tag: 'Proof-of-work', title: 'Live on your docs', desc: 'Upload samples, extract, compare, flag contradictions.' },
  { num: 9, tag: 'Results', title: 'Blueprint + PDF', desc: 'Downloadable report, meeting link with full context.' },
]

export default function ArchitectVisualization() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [hovered, setHovered] = useState(null)
  const intervalRef = useRef(null)

  const advance = useCallback(() => {
    setActive(prev => (prev + 1) % STAGES.length)
  }, [])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion || paused) return

    intervalRef.current = setInterval(advance, 3200)
    return () => clearInterval(intervalRef.current)
  }, [paused, advance])

  const current = STAGES[active]

  return (
    <div
      className="arch-viz"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => { setPaused(false); setHovered(null) }}
    >
      <div className="arch-viz-glow" aria-hidden="true" />

      <div className="arch-viz-header">
        <span className="arch-viz-live">
          <span className="arch-viz-pulse" />
          Live agentic assessment
        </span>
        <span className="arch-viz-meta">{active + 1} / {STAGES.length}</span>
      </div>

      <div className="arch-viz-stage">
        <div className="arch-viz-num" key={current.num}>{current.num}</div>
        <div className="arch-viz-content" key={`content-${current.num}`}>
          <div className="arch-viz-tag">{current.tag}</div>
          <div className="arch-viz-title">{current.title}</div>
          <div className="arch-viz-desc">{current.desc}</div>
        </div>
      </div>

      <div className="arch-viz-track">
        {STAGES.map((s, i) => (
          <button
            key={s.num}
            className={`arch-viz-dot${i === active ? ' active' : ''}${i < active ? ' done' : ''}`}
            onClick={() => setActive(i)}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            aria-label={`Stage ${s.num}: ${s.title}`}
          />
        ))}
      </div>

      {hovered !== null && hovered !== active && (
        <div className="arch-viz-tooltip">
          <span className="arch-viz-tooltip-num">{STAGES[hovered].num}</span>
          {STAGES[hovered].title}
        </div>
      )}

      <div className="arch-viz-progress">
        <div
          className="arch-viz-progress-bar"
          style={{ width: `${((active + 1) / STAGES.length) * 100}%` }}
        />
      </div>

      <Link to="/assess" className="arch-viz-cta">
        <span>Analyse my workflow</span>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
          <path d="M5 12h14M13 6l6 6-6 6"/>
        </svg>
      </Link>

      <div className="arch-viz-stats">
        <div><span className="arch-viz-stat-val">10–15</span><span className="arch-viz-stat-lbl">min assessment</span></div>
        <div><span className="arch-viz-stat-val">3</span><span className="arch-viz-stat-lbl">opportunities ranked</span></div>
        <div><span className="arch-viz-stat-val">0</span><span className="arch-viz-stat-lbl">passwords needed</span></div>
      </div>
    </div>
  )
}
