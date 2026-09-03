import { useEffect, useRef } from 'react'
import MetricAIVisualization from './MetricAIVisualization/MetricAIVisualization'
import AdvisoryVisualization from './AdvisoryVisualization/AdvisoryVisualization'
import EngineeringVisualization from './EngineeringVisualization/EngineeringVisualization'
import { ARCHITECT_APP_URL } from '../lib/architectAppUrl'
const CALENDAR_URL = 'https://calendar.app.google/LsSjs7YWcX5VCKRVA'

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
          <div className="path-card" id="metricai">
            <div className="path-content">
              <div className="label">01 / SOFTWARE</div>
              <h3>MetricAI</h3>
              <div className="sub">The Financial Operating System for AI.</div>
              <p className="copy">For AI-native SaaS companies and agent platforms that need to understand what AI costs, what customers should be charged and where margins are at risk.</p>
              <ul className="caps">
                <li>Cost by customer, agent, workflow, model and provider</li>
                <li>Cost per successful business outcome</li>
                <li>AI gross margin, forecasting and budget controls</li>
                <li>Usage metering, pricing, billing and reconciliation</li>
              </ul>
              <a className="btn btn-accent" style={{alignSelf:'flex-start', marginTop: '16px'}} href="https://metricai.co.in/" target="_blank" rel="noreferrer">
                Explore MetricAI
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </a>
            </div>
            <div className="path-visual" style={{ minHeight: '400px', background: 'transparent', border: 'none', overflow: 'visible' }}>
              <MetricAIVisualization />
            </div>
          </div>

          {/* Advisory */}
          <div className="path-card reverse" id="advisory">
            <div className="path-content">
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
              <button className="btn btn-ghost" style={{alignSelf:'flex-start', marginTop: '16px'}} onClick={openModal}>
                Book an AI Economics Assessment
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              </button>
            </div>
            <div className="path-visual" style={{ minHeight: '400px', background: 'transparent', border: 'none', overflow: 'visible' }}>
              <AdvisoryVisualization />
            </div>
          </div>

          {/* Systems Studio */}
          <div className="path-card" id="systems">
            <div className="path-content">
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
              <div className="path-actions">
                <a className="btn btn-accent" href={ARCHITECT_APP_URL} target="_blank" rel="noreferrer">
                  Launch AI Architect
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                </a>
                <button className="btn btn-ghost" onClick={openModal}>Discuss your AI workflow</button>
              </div>
            </div>
            <div className="path-visual" style={{ minHeight: '400px', background: 'transparent', border: 'none', overflow: 'visible' }}>
              <EngineeringVisualization />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
