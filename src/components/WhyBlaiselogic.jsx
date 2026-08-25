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

export default function WhyBlaiselogic() {
  const headRef = useRef(null)
  const gridRef = useRef(null)
  useReveal(headRef)
  useReveal(gridRef)

  return (
    <section className="section">
      <div className="wrap">
        <div className="section-head reveal" ref={headRef}>
          <div className="eyebrow">WHY BLAISELOGIC</div>
          <h2>Technology depth with commercial discipline.</h2>
          <p className="lede">Blaiselogic is built at the intersection of AI systems, product engineering and economics. We do not separate the AI build from the question of whether it creates durable business value.</p>
        </div>
        <div className="why-grid reveal-stagger" ref={gridRef}>
          <div className="why-card">
            <div className="n">01</div>
            <h4>Product + engineering</h4>
            <p>We understand reusable products as well as the implementation work required when a problem does not fit a template.</p>
          </div>
          <div className="why-card">
            <div className="n">02</div>
            <h4>Built for production</h4>
            <p>Architecture decisions account for reliability, integrations, observability, security and long-term operation.</p>
          </div>
          <div className="why-card">
            <div className="n">03</div>
            <h4>Economics by design</h4>
            <p>Cost, quality, human effort, revenue and margin are considered from the first workflow design — not after launch.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
