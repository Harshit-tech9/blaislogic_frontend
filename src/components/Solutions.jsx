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

export default function Solutions() {
  const headRef = useRef(null)
  const engRef = useRef(null)
  const noteRef = useRef(null)
  useReveal(headRef)
  useReveal(engRef)
  useReveal(noteRef)

  return (
    <section className="section" style={{paddingTop:0}}>
      <div className="wrap">
        <div className="section-head reveal" ref={headRef}>
          <div className="eyebrow">ENGAGEMENT MODELS</div>
          <h2>Structured engagements. Clear commercial outcomes.</h2>
        </div>

        <div className="engagements reveal" ref={engRef}>
          <div className="eng-row">
            <div><div className="tag">Strategic</div><h4>AI Economics Assessment</h4><div className="dur">2–3 week engagement</div></div>
            <div></div>
            <p className="desc">Understand your highest-value AI opportunities, operating assumptions, measurement framework and economics before committing major build budgets.</p>
          </div>
          <div className="eng-row">
            <div><div className="tag">Validation</div><h4>AI Workflow Pilot</h4><div className="dur">4–6 week engagement</div></div>
            <div></div>
            <p className="desc">Design and validate one high-value AI workflow with a working prototype, success metrics and production roadmap.</p>
          </div>
          <div className="eng-row">
            <div><div className="tag">Implementation</div><h4>Production AI System</h4><div className="dur">End-to-end partnership</div></div>
            <div></div>
            <p className="desc">Build, integrate, launch and operate a reliable AI system with observability, controls and a clear path to scale.</p>
          </div>
        </div>
        <p className="eng-note reveal" ref={noteRef}>Every engagement starts with a clear definition of the business outcome, measurement method and operating owner.</p>
      </div>
    </section>
  )
}
