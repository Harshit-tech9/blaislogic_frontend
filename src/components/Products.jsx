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

export default function Products({ openModal }) {
  const headRef = useRef(null)
  const gridRef = useRef(null)
  useReveal(headRef)
  useReveal(gridRef)

  return (
    <section className="section">
      <div className="wrap">
        <div className="section-head reveal" ref={headRef}>
          <div className="eyebrow">HOW WE WORK</div>
          <h2>Choose the right path for your AI ambition.</h2>
        </div>

        <div className="paths-grid reveal-stagger" ref={gridRef}>
          {/* MetricAI */}
          <div className="path-card path-featured" id="metricai">
            <div className="label">01 / SOFTWARE</div>
            <h3>MetricAI</h3>
            <div className="sub">The Financial Operating System for AI.</div>
            <p className="copy">For AI-native SaaS companies and agent platforms that need to understand what AI costs, what customers should be charged and where margins are at risk.</p>
            <div className="mini-dash">
              <div className="row1">
                <div className="mini-stat"><div className="k">Cost / outcome</div><div className="v">$0.042</div></div>
                <div className="mini-stat"><div className="k">Gross margin</div><div className="v">71.3%</div></div>
                <div className="mini-stat"><div className="k">Budget used</div><div className="v">64%</div></div>
              </div>
              <svg viewBox="0 0 300 56" preserveAspectRatio="none">
                <polyline points="0,44 30,40 60,42 90,30 120,32 150,20 180,24 210,14 240,18 270,8 300,10" fill="none" stroke="#8DA3FF" strokeWidth="2"/>
                <polyline points="0,50 30,48 60,49 90,46 120,45 150,42 180,41 210,38 240,37 270,34 300,32" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"/>
              </svg>
            </div>
            <ul className="caps">
              <li>Cost by customer, agent, workflow, model and provider</li>
              <li>Cost per successful business outcome</li>
              <li>AI gross margin, forecasting and budget controls</li>
              <li>Usage metering, pricing, billing and reconciliation</li>
            </ul>
            <button className="btn btn-accent" style={{alignSelf:'flex-start'}} onClick={openModal}>
              Explore MetricAI
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </button>
          </div>

          {/* Advisory */}
          <div className="path-card" id="advisory">
            <div className="label">02 / ADVISORY</div>
            <h3 style={{fontSize:'26px'}}>Make AI investment decisions with an operating model.</h3>
            <p className="copy" style={{marginTop:'16px'}}>For leadership teams that need a credible answer to where AI creates value, what it will cost at scale and how success should be measured.</p>
            <ul className="caps">
              <li>AI use-case and ROI prioritisation</li>
              <li>AI cost, pricing and margin design</li>
              <li>AI governance and measurement framework</li>
              <li>Model, vendor and architecture strategy</li>
              <li>Executive AI economics dashboard</li>
            </ul>
            <button className="btn btn-ghost" style={{alignSelf:'flex-start'}} onClick={openModal}>
              Book an AI Economics Assessment
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </button>
          </div>

          {/* Systems Studio */}
          <div className="path-card" id="systems">
            <div className="label">03 / ENGINEERING</div>
            <h3 style={{fontSize:'26px'}}>From high-value workflow to production AI system.</h3>
            <p className="copy" style={{marginTop:'16px'}}>For companies that have a real business workflow to improve and need an experienced partner to design, build and operationalise it.</p>
            <ul className="caps">
              <li>AI agents and workflow automation</li>
              <li>Internal AI applications</li>
              <li>Data, API and enterprise-system integrations</li>
              <li>AI observability, governance and controls</li>
              <li>Production deployment and iteration</li>
            </ul>
            <button className="btn btn-ghost" style={{alignSelf:'flex-start'}} onClick={openModal}>
              Discuss your AI workflow
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
