import { useEffect, useRef } from 'react'

export default function Hero({ openModal }) {
  const mapRef = useRef(null)

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

  const scrollTo = (hash) => {
    const el = document.querySelector(hash)
    if (!el) return
    const top = el.getBoundingClientRect().top + window.pageYOffset - 78
    window.scrollTo({ top, behavior: 'smooth' })
  }

  return (
    <section className="hero">
      <div className="grid-bg"></div>
      <div className="wrap hero-inner">
        <div className="eyebrow" style={{justifyContent:'center'}}>AI ECONOMICS, SYSTEMS &amp; ENGINEERING</div>
        <h1>Turn AI initiatives into <span className="accent">profitable systems.</span></h1>
        <p className="lede">Blaiselogic helps AI-native companies and enterprises measure AI economics, build reliable AI workflows, and move from experimentation to scalable business outcomes.</p>
        <div className="hero-ctas">
          <button className="btn btn-accent" onClick={() => scrollTo('#metricai')}>
            Explore MetricAI
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </button>
          <button className="btn btn-ghost" onClick={openModal}>
            Book an AI Economics Assessment
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
          </button>
        </div>
      </div>

      <div className="wrap system-map reveal-stagger" ref={mapRef}>
        <div className="map-row">
          <div className="map-connector" aria-hidden="true">
            <svg viewBox="0 0 800 60" preserveAspectRatio="none">
              <path d="M 133 30 L 400 30 L 667 30" stroke="var(--line-strong)" strokeWidth="1.5" strokeDasharray="4 5" fill="none"/>
              <circle cx="400" cy="30" r="3" fill="var(--accent)"/>
            </svg>
          </div>
          <div className="pillar">
            <span className="num">01</span>
            <div className="pillar-node"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18M7 15l4-6 4 3 5-8"/></svg></div>
            <h3>MetricAI</h3>
            <p>Measure AI cost, pricing and margin.</p>
          </div>
          <div className="pillar">
            <span className="num">02</span>
            <div className="pillar-node"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg></div>
            <h3>Advisory</h3>
            <p>Define AI value, ROI and operating models.</p>
          </div>
          <div className="pillar">
            <span className="num">03</span>
            <div className="pillar-node"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/></svg></div>
            <h3>Systems Studio</h3>
            <p>Build and operate production-ready AI workflows.</p>
          </div>
        </div>
        <div className="map-caption">One partner from AI strategy to AI operations</div>
      </div>
    </section>
  )
}
