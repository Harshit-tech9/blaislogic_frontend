import { useEffect, useRef } from 'react'

function useReveal(ref) {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [ref])
}

export default function PointOfView() {
  const headRef = useRef(null)
  const cardsRef = useRef(null)
  useReveal(headRef)
  useReveal(cardsRef)

  return (
    <section className="pov section" id="company">
      <div className="wrap">
        <div className="section-head reveal" ref={headRef}>
          <div className="eyebrow">THE BLAISELOGIC POINT OF VIEW</div>
          <h2>AI is not a feature. It is an operating system for work.</h2>
          <p className="lede">The hard part of AI is not generating an answer. It is designing the system around it: the workflow, the economics, the controls, the data, the human handoffs and the metrics that define success.</p>
        </div>
        <div className="pov-cards reveal-stagger" ref={cardsRef}>
          <div className="pov-card">
            <span className="idx">01</span>
            <h4>Measure the economics</h4>
            <p>Understand cost, revenue, margin and return at the level of each customer, workflow and outcome.</p>
          </div>
          <div className="pov-card">
            <span className="idx">02</span>
            <h4>Design for the real workflow</h4>
            <p>Build AI around the decisions, systems and people that already make the business work.</p>
          </div>
          <div className="pov-card">
            <span className="idx">03</span>
            <h4>Operate with control</h4>
            <p>Make performance, quality, reliability and spending visible before they become a problem.</p>
          </div>
          <div className="pov-card">
            <span className="idx">04</span>
            <h4>Scale what proves value</h4>
            <p>Move from isolated pilots to repeatable systems with a clear operating model.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
