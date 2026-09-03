import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import ParticleField from './ParticleField/ParticleField'

export default function Hero({ openModal }) {
  const mapRef = useRef(null)
  const innerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' })

    if (mapRef.current) observer.observe(mapRef.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      if (innerRef.current) innerRef.current.classList.add('in')
    }, 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="hero">
      <ParticleField />
      <div className="wrap hero-inner reveal-stagger" ref={innerRef}>
        <div className="eyebrow" style={{justifyContent:'center'}}>AI ECONOMICS, SYSTEMS &amp; ENGINEERING</div>
        <h1>Turn AI initiatives into <span className="accent">profitable systems.</span></h1>
        <p className="lede">Blaiselogic helps AI-native companies and enterprises measure AI economics, build reliable AI workflows, and move from experimentation to scalable business outcomes.</p>

        <Link to="/assess" className="hero-architect-banner">
          <span className="hero-architect-pulse" aria-hidden="true" />
          <span className="hero-architect-copy">
            <strong>Agentic AI Architect</strong>
            <span>One workflow in → ranked agent blueprint out. Free, 10 min, no password.</span>
          </span>
          <span className="hero-architect-action">
            Try it now
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </span>
        </Link>

        <div className="hero-ctas">
          <Link to="/assess" className="btn btn-primary hero-architect-btn">
            Analyse my workflow
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </Link>
          <button className="btn btn-ghost" onClick={openModal}>
            Book an assessment
          </button>
        </div>
      </div>

      <div className="wrap system-map reveal-stagger" ref={mapRef}>
        <div className="map-row">
          <div className="pillar">
            <span className="num">01</span>
            <div className="pillar-node"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18M7 15l4-6 4 3 5-8"/></svg></div>
            <h3>MetricAI</h3>
            <p>Measure AI cost, pricing and margin.</p>
          </div>
          <div className="pillar">
            <span className="num">02</span>
            <div className="pillar-node"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg></div>
            <h3>Advisory</h3>
            <p>Define AI value, ROI and operating models.</p>
          </div>
          <Link to="/assess" className="pillar pillar-architect">
            <span className="num">03</span>
            <div className="pillar-node"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/></svg></div>
            <h3>Agent Architect <span className="pillar-badge">Try live</span></h3>
            <p>Describe one workflow, get a ranked agent blueprint in 10 minutes.</p>
          </Link>
        </div>
        <div className="map-caption">One partner from AI strategy to AI operations</div>
      </div>
    </section>
  )
}
