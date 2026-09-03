import { useEffect, useState, useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'

const NUDGES = [
  {
    id: 'hero',
    scrollThreshold: 0.08,
    title: 'One workflow in, one blueprint out.',
    body: 'Try the Agentic AI Architect, a 10-minute assessment that researches your company and designs a production-ready agent.',
    cta: 'Start free assessment',
  },
  {
    id: 'paths',
    scrollThreshold: 0.35,
    title: 'See it run on your documents.',
    body: 'Stage 6 runs a live proof-of-work on your own PDFs and spreadsheets, not a generic recommendation.',
    cta: 'Analyse my workflow',
  },
  {
    id: 'deep',
    scrollThreshold: 0.65,
    title: 'Leave with a ranked agent blueprint.',
    body: 'Three opportunities scored, one recommended, with economics and a 4–6 week pilot plan, before you book a call.',
    cta: 'Get my blueprint',
  },
]

const DISMISS_KEY = 'architect-nudge-dismissed'

export default function ArchitectFloatingCTA() {
  const location = useLocation()
  const [visible, setVisible] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [currentNudge, setCurrentNudge] = useState(null)
  const [dismissed, setDismissed] = useState(() => {
    try {
      return JSON.parse(sessionStorage.getItem(DISMISS_KEY) || '[]')
    } catch {
      return []
    }
  })

  const handleScroll = useCallback(() => {
    if (location.pathname.startsWith('/assess') || location.pathname.startsWith('/insights/')) return

    const scrollPct = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)

    if (scrollPct > 0.88) {
      setExpanded(false)
      setVisible(false)
      return
    }

    setVisible(scrollPct > 0.04)

    const next = [...NUDGES].reverse().find(
      n => scrollPct >= n.scrollThreshold && !dismissed.includes(n.id)
    )
    if (next && next.id !== currentNudge?.id) {
      setCurrentNudge(next)
      setExpanded(true)
    }
  }, [location.pathname, dismissed, currentNudge?.id])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const dismiss = () => {
    if (!currentNudge) return
    const updated = [...dismissed, currentNudge.id]
    setDismissed(updated)
    sessionStorage.setItem(DISMISS_KEY, JSON.stringify(updated))
    setExpanded(false)
  }

  if (location.pathname.startsWith('/assess') || location.pathname.startsWith('/insights/')) return null

  return (
    <div className={`arch-float${visible ? ' visible' : ''}${expanded ? ' expanded' : ''}`}>
      {expanded && currentNudge && (
        <div className="arch-float-card">
          <button className="arch-float-dismiss" onClick={dismiss} aria-label="Dismiss">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
          <div className="arch-float-card-tag">
            <span className="arch-float-pulse" />
            Agentic AI Architect
          </div>
          <h4>{currentNudge.title}</h4>
          <p>{currentNudge.body}</p>
          <Link to="/assess" className="btn btn-accent arch-float-card-btn" onClick={() => setExpanded(false)}>
            {currentNudge.cta}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M5 12h14M13 6l6 6-6 6"/>
            </svg>
          </Link>
        </div>
      )}

      <Link
        to="/assess"
        className="arch-float-fab"
        aria-label="Start Agentic AI Architect assessment"
        onClick={() => setExpanded(false)}
      >
        <span className="arch-float-ring" aria-hidden="true" />
        <span className="arch-float-ring arch-float-ring-2" aria-hidden="true" />
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M12 2a4 4 0 0 1 4 4v1h2a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h2V6a4 4 0 0 1 4-4z"/>
          <circle cx="9" cy="13" r="1" fill="currentColor" stroke="none"/>
          <circle cx="15" cy="13" r="1" fill="currentColor" stroke="none"/>
          <path d="M9 17h6"/>
        </svg>
        <span className="arch-float-fab-label">Try Architect</span>
      </Link>
    </div>
  )
}
