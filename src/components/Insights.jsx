import { useEffect, useRef } from 'react'

function useReveal(ref) {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('in'); observer.unobserve(entry.target) }
      })
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref])
}

export default function Insights() {
  const headRef = useRef(null)
  const gridRef = useRef(null)
  useReveal(headRef)
  useReveal(gridRef)

  return (
    <section className="section" id="insights" style={{paddingTop:0}}>
      <div className="wrap">
        <div className="section-head reveal" ref={headRef}>
          <div className="eyebrow">RESEARCH &amp; INSIGHTS</div>
          <h2>Practical thinking on the economics of AI.</h2>
        </div>
        <div className="insights-grid reveal-stagger" ref={gridRef}>
          <article className="insight-card">
            <div className="insight-visual">
              <svg viewBox="0 0 300 140" preserveAspectRatio="none">
                <line x1="0" y1="20" x2="300" y2="20" stroke="var(--line)" strokeWidth="1"/>
                <line x1="0" y1="60" x2="300" y2="60" stroke="var(--line)" strokeWidth="1"/>
                <line x1="0" y1="100" x2="300" y2="100" stroke="var(--line)" strokeWidth="1"/>
                <polyline points="10,110 60,90 110,95 160,55 210,65 260,30 290,40" fill="none" stroke="var(--accent)" strokeWidth="2.5"/>
                <circle cx="290" cy="40" r="4" fill="var(--accent)"/>
              </svg>
            </div>
            <div className="insight-body">
              <div className="insight-tag">AI Cost Modeling</div>
              <h4>Why cost per API call fails for agent workflows</h4>
              <div className="insight-read">Read article <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg></div>
            </div>
          </article>
          <article className="insight-card">
            <div className="insight-visual">
              <svg viewBox="0 0 300 140" preserveAspectRatio="none">
                <rect x="20" y="70" width="28" height="50" fill="var(--accent-soft-2)"/>
                <rect x="60" y="50" width="28" height="70" fill="var(--accent-soft-2)"/>
                <rect x="100" y="30" width="28" height="90" fill="var(--accent)"/>
                <rect x="140" y="60" width="28" height="60" fill="var(--accent-soft-2)"/>
                <rect x="180" y="40" width="28" height="80" fill="var(--accent-soft-2)"/>
                <rect x="220" y="20" width="28" height="100" fill="var(--accent)"/>
              </svg>
            </div>
            <div className="insight-body">
              <div className="insight-tag">Billing &amp; Pricing</div>
              <h4>Usage is not yet revenue: designing the AI billing pipeline</h4>
              <div className="insight-read">Read article <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg></div>
            </div>
          </article>
          <article className="insight-card">
            <div className="insight-visual">
              <svg viewBox="0 0 300 140" preserveAspectRatio="none">
                <circle cx="70" cy="70" r="34" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeDasharray="180" strokeDashoffset="60"/>
                <circle cx="180" cy="45" r="18" fill="none" stroke="var(--line-strong)" strokeWidth="2"/>
                <circle cx="230" cy="95" r="24" fill="none" stroke="var(--line-strong)" strokeWidth="2"/>
              </svg>
            </div>
            <div className="insight-body">
              <div className="insight-tag">Governance</div>
              <h4>The four metrics every enterprise AI programme should measure</h4>
              <div className="insight-read">Read article <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M13 6l6 6-6 6"/></svg></div>
            </div>
          </article>
        </div>
        <div style={{marginTop:'40px'}}>
          <button className="btn btn-ghost">Read Blaiselogic Insights →</button>
        </div>
      </div>
    </section>
  )
}
