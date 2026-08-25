import { useEffect, useRef } from 'react'

export default function CTA({ openModal }) {
  const ref = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('in'); observer.unobserve(entry.target) }
      })
    }, { threshold: 0.15 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  const scrollTo = (hash) => {
    const el = document.querySelector(hash)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.pageYOffset - 78
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <section className="wrap" style={{paddingBottom:'120px'}}>
      <div className="final-cta reveal" ref={ref}>
        <div className="grid-bg"></div>
        <h2>What is stopping your AI initiative from scaling?</h2>
        <p>Whether you are building an AI product, evaluating enterprise use cases or struggling to control AI cost and performance, Blaiselogic will help identify the most valuable next step.</p>
        <div className="ctas">
          <button className="btn btn-accent" onClick={openModal}>Book a 30-minute strategy call →</button>
          <button className="btn btn-ghost" onClick={() => scrollTo('#metricai')}>Explore MetricAI →</button>
        </div>
        <div className="pills">
          <span className="pill">Measure AI cost and margin</span>
          <span className="pill">Build an AI workflow</span>
          <span className="pill">Evaluate AI ROI</span>
          <span className="pill">Improve an existing AI system</span>
        </div>
      </div>
    </section>
  )
}
