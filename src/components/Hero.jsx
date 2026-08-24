export default function Hero({ openModal }) {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="eyebrow"><span className="eyebrow-dot"></span> AI infrastructure & solutions</div>

        <h1>
          AI infrastructure for<br />
          <span>real-world intelligence.</span>
        </h1>

        <p className="hero-copy">
          Measure AI performance. Generate real outcomes. Build systems that solve real problems. Blaiselogic provides the foundational grid for the next generation of AI.
        </p>

        <div className="hero-actions">
          <button className="btn btn-primary" onClick={() => window.location.href='#products'}>Explore Products</button>
          <button className="btn btn-secondary" onClick={openModal}>Talk to Blaiselogic</button>
        </div>

        <div className="hero-system">
          <div className="system-node node-one">
            <strong>Infrastructure</strong>
            <span>Reliable foundations for AI workloads</span>
          </div>

          <div className="system-node node-two">
            <strong>AI Products</strong>
            <span>Products such as MetricAI and AIAdeFactory</span>
          </div>

          <div className="system-node node-three">
            <strong>Custom Solutions</strong>
            <span>Systems designed around specific business needs</span>
          </div>

          <div className="system-line line-one"></div>
          <div className="system-line line-two"></div>
          <div className="system-label">One technology partner across the stack</div>
        </div>
      </div>
    </section>
  )
}
