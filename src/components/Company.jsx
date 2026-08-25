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

export default function UseCases() {
  const headRef = useRef(null)
  const gridRef = useRef(null)
  useReveal(headRef)
  useReveal(gridRef)

  return (
    <section className="section" style={{background:'var(--bg-alt)', borderTop:'1px solid var(--line)', borderBottom:'1px solid var(--line)'}}>
      <div className="wrap">
        <div className="section-head reveal" ref={headRef}>
          <div className="eyebrow">WHO WE HELP</div>
          <h2>Different AI contexts. One need for measurable value.</h2>
        </div>
        <div className="usecases reveal-stagger" ref={gridRef}>
          <div className="usecase">
            <h4>AI-native SaaS and agent companies</h4>
            <p>You are selling AI capability but cannot clearly see customer-level cost, cost per outcome, pricing or gross margin.</p>
            <span className="path-tag">Recommended: MetricAI</span>
          </div>
          <div className="usecase">
            <h4>Enterprise AI teams</h4>
            <p>You have pilots across teams but need a disciplined way to choose use cases, govern investment and measure ROI.</p>
            <span className="path-tag">Recommended: AI Economics Advisory</span>
          </div>
          <div className="usecase">
            <h4>Operational businesses</h4>
            <p>You have a repetitive, high-value workflow that can be improved with AI, but need a system that works in production — not a demo.</p>
            <span className="path-tag">Recommended: AI Systems Studio</span>
          </div>
        </div>
      </div>
    </section>
  )
}
